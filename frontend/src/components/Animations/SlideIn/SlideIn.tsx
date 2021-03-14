import React, { memo } from 'react';
import { useInView } from 'react-intersection-observer';

import { Wrapper } from './styled/Wrapper';

interface SlideInProps {
  slideSize?: string;
  children: JSX.Element;
  slideDirection?: 'x' | 'y';
  reverse?: boolean;
  dontUseObserver?: boolean;
}

export const SlideIn = memo<SlideInProps>(props => {
  const {
    slideSize = '20vh',
    reverse = false,
    slideDirection = 'y',
    children,
    dontUseObserver,
  } = props;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const slideVerticalVariants = {
    initial: {
      opacity: 0,
      y: reverse ? `-${slideSize}` : slideSize,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: reverse ? `-${slideSize}` : slideSize,
      opacity: 0,
    },
  };

  const slideHorizontalVariants = {
    initial: {
      opacity: 0,
      x: reverse ? `-${slideSize}` : slideSize,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: reverse ? `-${slideSize}` : slideSize,
      opacity: 0,
    },
  };

  return (
    <>
      <Wrapper
        ref={ref}
        variants={
          slideDirection === 'y'
            ? slideVerticalVariants
            : slideHorizontalVariants
        }
        animate={dontUseObserver ? '' : inView ? 'animate' : 'initial'}
      >
        {children}
      </Wrapper>
    </>
  );
});

SlideIn.displayName = 'SlideIn';
