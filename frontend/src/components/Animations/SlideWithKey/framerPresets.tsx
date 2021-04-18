export const TR_DURATION = 0.7;
export const TR_DELAY = TR_DURATION * 0.5;
export const TR_TYPE = 'tween';
export const ENTER_ANIMATION_DURATION = 1.5;

import { springSlow } from 'components/Animations/framerTransitions';

const revealTransition = {
  type: TR_TYPE,
  duration: TR_DURATION,
};

export const revealVariants = {
  initial: (reverse: boolean) => {
    return {
      y: reverse ? '-100%' : '100%',
      transition: {
        ...springSlow,
        // ...revealTransition,
      },
    };
  },
  animate: {
    y: '0%',
    transition: {
      ...springSlow,
      // delay: TR_DELAY,
      // ...revealTransition,
    },
  },
  exit: (reverse: boolean) => {
    return {
      y: reverse ? '100%' : '-100%',
      transition: {
        ...springSlow,
        // ...revealTransition,
      },
    };
  },
};
