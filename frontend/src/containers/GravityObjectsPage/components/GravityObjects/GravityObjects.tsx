import React, { memo, useRef, useEffect } from 'react';

import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

import Application from './classes/Application';
import { application } from './functions/application';
import Link from 'next/link';

interface GravityObjectsProps {}

const GravityObjects = memo<GravityObjectsProps>(props => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { destroy } = application({
      canvasRefEl: canvasRef.current,
      canvasWrapperRefEl: canvasWrapperRef.current,
    });

    // console.log(x.showName());

    // const app = new Application(canvasRef.current, canvasWrapperRef.current);

    return () => {
      destroy();
      // app.destructor();
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
