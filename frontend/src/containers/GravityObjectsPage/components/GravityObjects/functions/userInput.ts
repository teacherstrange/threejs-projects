import TWEEN from '@tweenjs/tween.js';

import { AppObj } from './application';
import { StackBox } from './box';

interface UserInput {
  appObj: AppObj;
  stack: StackBox[];
  BOX_HEIGHT: number;
  addLayer: (x: any, z: any, width: any, depth: any, direction: any) => void;
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
    addLayer(0, 0, ORIGINAL_BOX_SIZE, ORIGINAL_BOX_SIZE, 'y');

    // First layer
    addLayer(-10, 0, ORIGINAL_BOX_SIZE, ORIGINAL_BOX_SIZE, 'x');
  };

  const animateEnterBox = layerPosition => {
    const layerObject = stack[layerPosition];

    layerObject.threejs.material.opacity = 0;
    layerObject.threejs.material.transparent = true;

    tweenEnterBox = new TWEEN.Tween({
      opacity: layerObject.threejs.material.opacity,
    })
      .to({ opacity: 1 }, 1000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(object => {
        layerObject.threejs.material.opacity = object.opacity;
      })
      .start();
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
