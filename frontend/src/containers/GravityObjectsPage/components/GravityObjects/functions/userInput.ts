import TWEEN from '@tweenjs/tween.js';

import { AppObj } from './application';
import { StackBox } from './box';

interface UserInput {
  appObj: AppObj;
  stack: StackBox[];
  BOX_HEIGHT: number;
  addLayer: (
    x: number,
    z: number,
    width: number,
    depth: number,
    direction: 'x' | 'z',
  ) => void;
  ORIGINAL_BOX_SIZE: number;
}

export const userInput = ({
  ORIGINAL_BOX_SIZE,
  addLayer,
  appObj,
  stack,
  BOX_HEIGHT,
}: UserInput) => {
  const { appTime, camera } = appObj;
  let gameStarted = false;

  let tweenCamera;
  let tweenEnterBox;
  let tweenScaleUp;

  const handleClick = () => {
    if (!gameStarted) {
      gameStarted = true;
      initGame();
    } else {
      const topLayer = stack[stack.length - 1];

      const direction = topLayer.direction;

      //Next layer
      const nextX = direction === 'x' ? 0 : -10;
      const nextZ = direction === 'z' ? 0 : -10;
      const newWidth = ORIGINAL_BOX_SIZE;
      const newDepth = ORIGINAL_BOX_SIZE;
      const nextDirection = direction === 'x' ? 'z' : 'x';

      addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
      moveCamera();
      animateEnterBox(stack.length - 1);
    }
  };

  const initGame = () => {
    // Foundation
    addLayer(0, 0, ORIGINAL_BOX_SIZE, ORIGINAL_BOX_SIZE, 'z');

    // First layer
    addLayer(-10, 0, ORIGINAL_BOX_SIZE, ORIGINAL_BOX_SIZE, 'x');
    scaleUpBox(0);
    animateEnterBox(1);
  };

  const animateEnterBox = layerPosition => {
    const layerObject = stack[layerPosition];
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
    const layerObject = stack[layerPosition];

    layerObject.threejs.scale.set(0, 0, 0);

    console.log(layerObject);

    if (tweenScaleUp) {
      tweenScaleUp.stop();
    }

    tweenScaleUp = new TWEEN.Tween(layerObject.threejs.scale)
      .to({ x: 1, y: 1, z: 1 }, 1500)
      .easing(TWEEN.Easing.Exponential.Out);

    tweenScaleUp.start();
  };

  appTime.on('tick', (slowDownFactor, time) => {
    const speed = 0.2;

    const topLayer = stack[stack.length - 1];
    topLayer &&
      (topLayer.threejs.position[topLayer.direction] += speed * slowDownFactor);
  });

  const moveCamera = () => {
    tweenCamera = new TWEEN.Tween({ offsetY: camera.position.y })
      .to({ offsetY: BOX_HEIGHT * (stack.length - 2) + 8 }, 4000)
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
    gameStarted,
    destroy,
  };
};
