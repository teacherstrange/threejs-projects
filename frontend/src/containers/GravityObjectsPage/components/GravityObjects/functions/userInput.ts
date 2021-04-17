import { AppObj } from './application';
import { StackBox } from './box';

interface UserInput {
  appObj: AppObj;
  stack: StackBox[];
}

export const userInput = ({ appObj, stack }: UserInput) => {
  const { appTime } = appObj;
  let gameStarted = false;

  const handleClick = () => {
    if (!gameStarted) {
      appTime.resume();
      gameStarted = true;
    } else {
    }
  };

  appTime.on('tick', (slowDownFactor, time) => {
    const speed = 0.15;

    const topLayer = stack[stack.length - 1];
    topLayer &&
      (topLayer.threejs.position[topLayer.direction] += speed * slowDownFactor);
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
