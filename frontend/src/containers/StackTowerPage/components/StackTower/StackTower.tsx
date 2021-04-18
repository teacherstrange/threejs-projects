import React, { memo, useRef, useEffect, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';
import { Cover } from './styled/Cover';
import { RevealAnimationWithKey } from 'components/Animations/RevealAnimationWithKey/RevealAnimationWithKey';
import { SlideWithKey } from 'components/Animations/SlideWithKey/SlideWithKey';

import { application } from './functions/application';
import { StatWrapper } from './styled/StatWrapper';
import { Counter } from './styled/Counter';

interface StackTowerProps {}

const StackTower = memo<StackTowerProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [isStarted, setIsStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      isStarted,
      setIsStarted,
      isReady,
      setIsReady,
      point,
      setPoint,
    });

    return () => {
      destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(isStarted);
  }, [isStarted]);

  return (
    <>
      <Wrapper>
        <Cover animate={isReady ? 'animate' : 'initial'} />
        <StatWrapper>
          <SlideWithKey itemKey={point}>
            <Counter>{point}</Counter>
          </SlideWithKey>
        </StatWrapper>
        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

export default StackTower;

StackTower.displayName = 'StackTower';
