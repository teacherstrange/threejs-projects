import React, { memo, useRef, useEffect } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

import Application from './classes/Application';

interface GravityObjectsProps {}

const GravityObjects = memo<GravityObjectsProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application(canvasRef.current, canvasWrapperRef.current);

    return () => {
      app.destructor();
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

export default GravityObjects;

GravityObjects.displayName = 'GravityObjects';
