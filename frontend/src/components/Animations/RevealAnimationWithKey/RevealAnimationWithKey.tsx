import { AnimatePresence } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';

import {
  revealVariants,
  beforeInitVariants,
  TR_DURATION,
  TR_DELAY,
  ENTER_ANIMATION_DURATION,
} from './framerPresets';
import { RevealWrapper } from './styled/RevealWrapper';
import { Wrapper } from './styled/Wrapper';
import { Container } from './styled/Container';
import { MockObject } from './styled/MockObject';

interface RevealAnimationWithKeyProps {
  itemKey: number;
  children: React.ReactNode;
  reverseAnimation?: boolean;
  isInit?: boolean; //Use this if you want to switch variants earlier than after given timeout on "isReady"
}

export const RevealAnimationWithKey = React.memo<RevealAnimationWithKeyProps>(
  props => {
    const { children, itemKey, reverseAnimation, isInit } = props;
    const [isReady, setIsReady] = useState(false);
    const mockObjectRef = useRef<HTMLDivElement>(null);
    const [containerHeight, setContainerHeight] = useState(0);

    const setContainerSize = () => {
      setContainerHeight(mockObjectRef.current.clientHeight);
    };

    const onResize = React.useCallback(() => {
      setContainerSize();
    }, []);

    useEffect(() => {
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    }, [onResize]);

    useEffect(() => {
      if (containerHeight !== 0) {
        setTimeout(() => {
          setIsReady(true);
        }, ENTER_ANIMATION_DURATION * 1000);
      }
    }, [containerHeight]);

    useEffect(() => {
      setContainerSize();
    }, [itemKey]);

    const containerStyle = {
      height: containerHeight + 'px',
      transitionDuration: TR_DURATION + 's',
      transitionProperty: 'height',
      transitionDelay: TR_DELAY + 's',
    };

    return (
      <>
        <Container style={containerStyle}>
          <MockObject key={itemKey} ref={mockObjectRef}>
            {children}
          </MockObject>
          <AnimatePresence custom={reverseAnimation} exitBeforeEnter={false}>
            <Wrapper key={itemKey}>
              <RevealWrapper
                custom={reverseAnimation}
                variants={
                  isReady || isInit ? revealVariants : beforeInitVariants
                }
              >
                {children}
              </RevealWrapper>
            </Wrapper>
          </AnimatePresence>
        </Container>
      </>
    );
  },
);

RevealAnimationWithKey.displayName = 'RevealAnimationWithKey';
