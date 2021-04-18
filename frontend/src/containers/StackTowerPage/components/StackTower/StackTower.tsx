import React, { memo, useRef, useEffect, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

import { application } from './functions/application';

interface StackTowerProps {}

const StackTower = memo<StackTowerProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const [isStarted, setIsStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
      isStarted,
      setIsStarted,
      isReady,
      setIsReady,
    });

    return () => {
      destroy();
    };
  }, []);

  useEffect(() => {
    console.log(isStarted);
  }, [isStarted]);

  return (
    <>
      <Wrapper>
        <RendererWrapper ref={canvasWrapperRef}>
          <canvas ref={canvasRef} />
        </RendererWrapper>
      </Wrapper>
    </>
  );
});

export default StackTower;

StackTower.displayName = 'StackTower';
