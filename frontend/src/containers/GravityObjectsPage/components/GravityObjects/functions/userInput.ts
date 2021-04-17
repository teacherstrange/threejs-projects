import { AppObj } from './application';
import { StackBox } from './box';

interface UserInput {
  appObj: AppObj;
  stack: StackBox[];
  BOX_HEIGHT: number;
  addLayer: (x: any, z: any, width: any, depth: any, direction: any) => void;
}

export const userInput = ({
  addLayer,
  appObj,
  stack,
  BOX_HEIGHT,
}: UserInput) => {
  const { appTime, camera } = appObj;
  let gameStarted = false;
  const ORIGINAL_BOX_SIZE = 3;

  const handleClick = () => {
    if (!gameStarted) {
      appTime.resume();
      gameStarted = true;
    } else {
      const topLayer = stack[stack.length - 1];
      let direction = 'x';
      if (topLayer) {
        direction = topLayer.direction;
      }

      //Next layer
      const nextX = direction === 'x' ? 0 : -10;
      const nextZ = direction === 'z' ? 0 : -10;
      const newWidth = ORIGINAL_BOX_SIZE;
      const newDepth = ORIGINAL_BOX_SIZE;
      const nextDirection = direction === 'x' ? 'z' : 'x';

      addLayer(nextX, nextZ, newWidth, newDepth, nextDirection);
    }
  };

  appTime.on('tick', (slowDownFactor, time) => {
    const speed = 0.1;

    const topLayer = stack[stack.length - 1];
    topLayer &&
      (topLayer.threejs.position[topLayer.direction] += speed * slowDownFactor);

    if (camera) {
      console.log(BOX_HEIGHT);
      if (camera.position.y < BOX_HEIGHT * (stack.length - 2) + 4) {
        camera.position.y += speed * slowDownFactor;
      }
    }
  });

  window.addEventListener('click', handleClick);

  const destroy = () => {
    window.removeEventListener('click', handleClick);
  };

  return {
    gameStarted,
    destroy,
  };
};
