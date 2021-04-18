import React, { memo, useRef, useEffect } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

import { application } from './functions/application';

interface StackTowerProps {}

const StackTower = memo<StackTowerProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
    });

    return () => {
      destroy();
    };
  }, []);

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
