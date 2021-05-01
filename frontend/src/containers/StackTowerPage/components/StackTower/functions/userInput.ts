import TWEEN from '@tweenjs/tween.js';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { AppObj, CAMERA_POS, ApplicationProps } from './application';
import { GameSetup } from './world';
import { AddOverhang } from './overhangBox';
import { AnimateProgress } from './distortionPlane';
import popSoundMp3 from './assets/pop.mp3';
import malikMp3 from './assets/malik.mp3';

import { AddLayer } from './box';

interface UserInput {
  appObj: AppObj;
  appProps: ApplicationProps;
  addLayer: AddLayer;
  gameSetup: GameSetup;
  addOverhang: AddOverhang;
  cannonWorld: CANNON.World;
  destroyBoxes: () => void;
  animatePlaneProgress: AnimateProgress;
}

export const userInput = ({
  animatePlaneProgress,
  destroyBoxes,
  addOverhang,
  addLayer,
  appObj,
  gameSetup,
  appProps,
  cannonWorld,
}: UserInput) => {
  const { appTime, camera } = appObj;

  let tweenEnterBox;
  let tweenCamera;
  let tweenScaleUp;
  let tweenBackgroundColor;

  const popSound = new Audio(popSoundMp3);
  popSound.volume = 0.2;

  const malik = new Audio(malikMp3);
  malik.loop = true;

  malik.volume = 0.3;

  const handleClick = () => {
    if (malik.paused) {
      malik.play();
    }

    if (gameSetup.gameState !== 'playing') {
      return;
    }

    const topLayer = gameSetup.stack[gameSetup.stack.length - 1];
    const previousLayer = gameSetup.stack[gameSetup.stack.length - 2];

    const direction = topLayer.direction;

    const delta =
      topLayer.threejs.position[direction] -
      previousLayer.threejs.position[direction];

    const overhangSize = Math.abs(delta);

    const size = direction === 'x' ? topLayer.width : topLayer.depth;

    const overlap = size - overhangSize;

    if (overlap > 0) {
      appProps.setPoint(prev => prev + 1);
      //Cut layer
      const newWidth = direction === 'x' ? overlap : topLayer.width;
      const newDepth = direction === 'z' ? overlap : topLayer.depth;

      cutBox(topLayer, overlap, size, delta);

      // Overhang
      const overhangShift = (overlap / 2 + overhangSize / 2) * Math.sign(delta);
      const overhangX =
        direction === 'x'
          ? topLayer.threejs.position.x + overhangShift
          : topLayer.threejs.position.x;
      const overhangZ =
        direction === 'z'
          ? topLayer.threejs.position.z + overhangShift
          : topLayer.threejs.position.z;
      const overhangWidth = direction === 'x' ? overhangSize : topLayer.width;
      const overhangDepth = direction === 'z' ? overhangSize : topLayer.depth;

      addOverhang({
        x: overhangX,
        z: overhangZ,
        width: overhangWidth,
        depth: overhangDepth,
      });

      //Next layer
      const nextX = direction === 'x' ? topLayer.threejs.position.x : -10;
      const nextZ = direction === 'z' ? topLayer.threejs.position.z : -10;
      const nextDirection = direction === 'x' ? 'z' : 'x';

      addLayer({
        x: nextX,
        z: nextZ,
        width: newWidth,
        depth: newDepth,
        direction: nextDirection,
      });
      animateCamera();
      animateBackgroundColor();
      animateEnterBox(gameSetup.stack.length - 1);
    } else {
      gameSetup.gameState = 'animating';
      appProps.setGameState('animating');
      animateCameraDown();
      setTimeout(() => {
        animatePlaneProgress(0);

        setTimeout(() => {
          animateInitBackground();
          gameSetup.gameState = 'readyToStart';
          appProps.setGameState('readyToStart');
        }, 800);
      }, gameSetup.stack.length * 40);
    }
  };

  const cutBox = (topLayer, overlap, size, delta) => {
    const direction = topLayer.direction;
    const newWidth = direction === 'x' ? overlap : topLayer.width;
    const newDepth = direction === 'z' ? overlap : topLayer.depth;

    // Update metadata
    topLayer.width = newWidth;
    topLayer.depth = newDepth;

    // Update ThreeJS model
    topLayer.threejs.scale[direction] = overlap / size;
    topLayer.threejs.position[direction] -= delta / 2;

    // Update CannonJS model
    topLayer.cannonjs.position[direction] -= delta / 2;

    // Replace shape to a smaller one (in CannonJS you can't simply just scale a shape)
    const shape = new CANNON.Box(
      new CANNON.Vec3(newWidth / 2, gameSetup.BOX_HEIGHT / 2, newDepth / 2),
    );
    topLayer.cannonjs.shapes = [];
    topLayer.cannonjs.addShape(shape);
    popSound.play();
  };

  const scaleDownBox = layerObject => {
    const scaleDownBoxTween = new TWEEN.Tween(layerObject.threejs.scale)
      .to({ x: 0, y: 0, z: 0 }, 600)
      .easing(TWEEN.Easing.Cubic.In);

    scaleDownBoxTween.start();
  };

  const initGame = () => {
    if (gameSetup.gameState !== 'readyToStart') {
      return;
    }

    gameSetup.gameState = 'animating';
    appProps.setGameState('animating');

    gameSetup.stack.forEach((_element, key) => {
      scaleDownBox(gameSetup.stack[key]);
    });

    gameSetup.overhangs.forEach((_element, key) => {
      scaleDownBox(gameSetup.overhangs[key]);
    });

    setTimeout(
      () => {
        appProps.setPoint(0);
        gameSetup.gameState = 'playing';
        appProps.setGameState('playing');
        animationDirection = 1;

        destroyBoxes();

        // Foundation
        addLayer({
          x: 0,
          z: 0,
          width: gameSetup.ORIGINAL_BOX_SIZE,
          depth: gameSetup.ORIGINAL_BOX_SIZE,
          direction: 'z',
        });

        // First layer
        addLayer({
          x: -10,
          z: 0,
          width: gameSetup.ORIGINAL_BOX_SIZE,
          depth: gameSetup.ORIGINAL_BOX_SIZE,
          direction: 'x',
        });

        scaleUpBox(0);
        animateCamera();
        animateEnterBox(1);
        animatePlaneProgress(1);
      },
      gameSetup.stack.length === 0 ? 0 : 600,
    );
  };

  let animationDirection = 1;

  appTime.on('tick', (slowDownFactor, time) => {
    const speed = 0.15;

    const topLayer = gameSetup.stack[gameSetup.stack.length - 1];

    if (!topLayer) {
      return;
    }

    if (topLayer.threejs.position[topLayer.direction] >= CAMERA_POS) {
      animationDirection = -1;
    }

    if (topLayer.threejs.position[topLayer.direction] <= -CAMERA_POS) {
      animationDirection = 1;
    }

    topLayer.threejs.position[topLayer.direction] +=
      speed * slowDownFactor * animationDirection;
    topLayer.cannonjs.position[topLayer.direction] +=
      speed * slowDownFactor * animationDirection;

    // Copy coordinates from Cannon.js to Three.js
    gameSetup.overhangs.forEach(element => {
      const positionVec = new THREE.Vector3(
        element.cannonjs.position.x,
        element.cannonjs.position.y,
        element.cannonjs.position.z,
      );

      const quaternionVec = new THREE.Quaternion(
        element.cannonjs.quaternion.x,
        element.cannonjs.quaternion.y,
        element.cannonjs.quaternion.z,
      );

      element.threejs.position.copy(positionVec);
      element.threejs.quaternion.copy(quaternionVec);
    });
  });

  const animateEnterBox = layerPosition => {
    const layerObject = gameSetup.stack[layerPosition];
    layerObject.threejs.material.opacity = 0;
    layerObject.threejs.material.transparent = true;

    tweenEnterBox = new TWEEN.Tween({
      opacity: layerObject.threejs.material.opacity,
    })
      .to({ opacity: 1 }, 1200)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(object => {
        layerObject.threejs.material.opacity = object.opacity;
      })
      .start();
  };

  const scaleUpBox = layerPosition => {
    const layerObject = gameSetup.stack[layerPosition];
    layerObject.threejs.scale.set(0, 0, 0);

    if (tweenScaleUp) {
      tweenScaleUp.stop();
    }

    tweenScaleUp = new TWEEN.Tween(layerObject.threejs.scale)
      .to({ x: 1, y: 1, z: 1 }, 1500)
      .easing(TWEEN.Easing.Exponential.Out);

    tweenScaleUp.start();
  };

  const animateCamera = () => {
    if (tweenCamera) {
      tweenCamera.stop();
    }

    tweenCamera = new TWEEN.Tween({ offsetY: camera.position.y })
      .to(
        {
          offsetY:
            gameSetup.BOX_HEIGHT * (gameSetup.stack.length - 2) + CAMERA_POS,
        },
        4000,
      )
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(object => {
        camera.position.y = object.offsetY;
      })
      .start();
  };

  const animateCameraDown = () => {
    if (tweenCamera) {
      tweenCamera.stop();
    }

    tweenCamera = new TWEEN.Tween({ offsetY: camera.position.y })
      .to({ offsetY: CAMERA_POS }, gameSetup.stack.length * 70)
      .easing(TWEEN.Easing.Sinusoidal.Out)
      .onUpdate(object => {
        camera.position.y = object.offsetY;
      })
      .start();
  };

  const animateInitBackground = () => {
    if (tweenBackgroundColor) {
      tweenBackgroundColor.stop();
    }

    appObj.baseColor = Math.floor(Math.random() * 360) + 1;
    appObj.backgroundColor = appObj.baseColor;

    const color = new THREE.Color(`hsl(${appObj.backgroundColor}, 40%,80%)`);
    appObj.renderer.setClearColor(color);
  };

  const animateBackgroundColor = () => {
    if (tweenBackgroundColor) {
      tweenBackgroundColor.stop();
    }

    tweenBackgroundColor = new TWEEN.Tween({
      colorValue: appObj.backgroundColor,
    })
      .to(
        {
          colorValue:
            appObj.baseColor + gameSetup.stack.length * appObj.colorMultiplier,
        },
        400,
      )
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(object => {
        appObj.backgroundColor = object.colorValue;
        const color = new THREE.Color(`hsl(${object.colorValue}, 40%,80%)`);
        appObj.renderer.setClearColor(color);
      })
      .start();
  };

  window.addEventListener('pointerdown', handleClick);

  const destroy = () => {
    window.removeEventListener('pointerdown', handleClick);
  };

  return {
    destroy,
    initGame,
  };
};
