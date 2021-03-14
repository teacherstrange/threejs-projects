import React, { memo } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  useTransform,
  useSpring,
  motion,
  ScrollMotionValues,
} from 'framer-motion';

import { globalState } from 'utils/globalState';
import { useWindowSize } from 'hooks/useWindowSize';

import { Wrapper } from './styled/Wrapper';

interface ParallaxScrollProps {
  speed?: number;
  children: JSX.Element;
}

export const ParallaxScroll = memo<ParallaxScrollProps>(props => {
  const { children, speed = -0.2 } = props;
  const { scrollY } = globalState.scrollValues as ScrollMotionValues;
  const { windowHeight, windowWidth } = useWindowSize();
  const topValue = React.useRef(0);
  const myRef = React.useRef(null);
  const parallaxYBlueprint = React.useRef(0);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const parallaxY = useTransform(scrollY, latest => {
    if (inView) {
      parallaxYBlueprint.current = (latest - topValue.current) * speed;
    }
    return parallaxYBlueprint.current;
  });

  const springMv = useSpring(parallaxY, {
    damping: 200,
    stiffness: 1000,
    mass: 1,
  });

  const getOffsetTop = element => {
    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  };

  React.useEffect(() => {
    topValue.current = getOffsetTop(myRef.current) - windowHeight;
  }, [scrollY, windowHeight, windowWidth]);

  return (
    <>
      <motion.div
        style={{ width: '100%', height: '100%', position: 'relative' }}
        ref={myRef}
      >
        <motion.div
          style={{ width: '100%', height: '100%', position: 'relative' }}
          ref={ref}
        >
          <Wrapper
            style={{
              y: springMv,
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
          >
            {children}
          </Wrapper>
        </motion.div>
      </motion.div>
    </>
  );
});

ParallaxScroll.displayName = 'ParallaxScroll';
