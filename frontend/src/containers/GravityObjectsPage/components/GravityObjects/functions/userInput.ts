import TWEEN from '@tweenjs/tween.js';
import * as CANNON from 'cannon-es';

import { AppObj } from './application';
import { CAMERA_POS } from './application';
import { GameSetup } from './world';

import { Direction } from './box';

interface UserInput {
  appObj: AppObj;
  addLayer: (
    x: number,
    z: number,
    width: number,
    depth: number,
    direction: Direction,
  ) => void;
  gameSetup: GameSetup;
  addOverhang: (x: any, z: any, width: any, depth: any) => void;
}

export const userInput = ({
  addOverhang,
  addLayer,
  appObj,
  gameSetup,
}: UserInput) => {
  const { appTime, camera } = appObj;

  let tweenCamera;
  let tweenEnterBox;
  let tweenScaleUp;

  const handleClick = () => {
    if (!gameSetup.gameStarted) {
      gameSetup.gameStarted = true;
      initGame();
    } else {
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
        //Cut layer
        const newWidth = direction === 'x' ? overlap : topLayer.width;
        const newDepth = direction === 'z' ? overlap : topLayer.depth;

        cutBox(topLayer, overlap, size, delta);

        // Overhang
        const overhangShift =
          (overlap / 2 + overhangSize / 2) * Math.sign(delta);
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

        addOverhang(overhangX, overhangZ, overhangWidth, overhangDepth);

        //Next layer
        const nextX = direction === 'x' ? topLayer.threejs.position.x : -10;
        const nextZ = direction === 'z' ? topLayer.threejs.position.z : -10;
        const nextDirection = direction === 'x' ? 'z' : 'x';

        addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
        moveCameraUp();
        animateEnterBox(gameSetup.stack.length - 1);
      } else {
        gameSetup.gameStarted = false;
      }
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
  };

  const initGame = () => {
    // Foundation
    addLayer(
      0,
      0,
      gameSetup.ORIGINAL_BOX_SIZE,
      gameSetup.ORIGINAL_BOX_SIZE,
      'z',
    );

    // First layer
    addLayer(
      -10,
      0,
      gameSetup.ORIGINAL_BOX_SIZE,
      gameSetup.ORIGINAL_BOX_SIZE,
      'x',
    );

    scaleUpBox(0);
    animateEnterBox(1);
  };

  appTime.on('tick', (slowDownFactor, time) => {
    const speed = 0.2;

    const topLayer = gameSetup.stack[gameSetup.stack.length - 1];

    if (!topLayer) {
      return;
    }
    topLayer.threejs.position[topLayer.direction] += speed * slowDownFactor;
    topLayer.cannonjs.position[topLayer.direction] += speed * slowDownFactor;

    // Copy coordinates from Cannon.js to Three.js
    gameSetup.overhangs.forEach(element => {
      element.threejs.position.copy(element.cannonjs.position);
      element.threejs.quaternion.copy(element.cannonjs.quaternion);
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

  const moveCameraUp = () => {
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

  window.addEventListener('click', handleClick);

  const destroy = () => {
    window.removeEventListener('click', handleClick);
  };

  return {
    destroy,
  };
};
