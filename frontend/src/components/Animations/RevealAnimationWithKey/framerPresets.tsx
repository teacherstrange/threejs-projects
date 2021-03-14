export const TR_DURATION = 0.6;
export const TR_DELAY = TR_DURATION / 3;
export const TR_TYPE = 'tween';
export const ENTER_ANIMATION_DURATION = 1.5;

const revealTransition = {
  type: TR_TYPE,
  duration: TR_DURATION,
};

export const beforeInitVariants = {
  initial: {
    y: '100%',
    transition: {
      type: 'tween',
      duration: ENTER_ANIMATION_DURATION,
    },
  },
  animate: {
    y: '0',
    transition: {
      type: 'tween',
      duration: ENTER_ANIMATION_DURATION,
      delay: TR_DELAY,
    },
  },
};

export const revealVariants = {
  initial: (reverse: boolean) => {
    return {
      y: reverse ? '-100%' : '100%',
      transition: {
        ...revealTransition,
      },
    };
  },
  animate: {
    y: 0,
    transition: {
      delay: TR_DELAY,
      ...revealTransition,
    },
  },
  exit: (reverse: boolean) => {
    return {
      y: reverse ? '100%' : '-100%',
      transition: {
        ...revealTransition,
      },
    };
  },
};
