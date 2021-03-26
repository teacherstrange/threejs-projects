import React, { memo, useRef, useEffect } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

import Application from './classes/Application';
import Link from 'next/link';

interface GravityObjectsProps {}

const GravityObjects = memo<GravityObjectsProps>(props => {
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null);

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

        <Link href="/">go to main</Link>
      </Wrapper>
    </>
  );
});

export default GravityObjects;

GravityObjects.displayName = 'GravityObjects';
