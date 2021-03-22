import React, { memo, useRef, useEffect, useState } from 'react';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

import Application from './classes/Application';
import Link from 'next/link';

interface GravityObjectsProps {}

const GravityObjects = memo<GravityObjectsProps>(props => {
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null);

  const [page, setPage] = useState(0);

  const logFunction = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    const app = new Application(
      canvasRef.current,
      canvasWrapperRef.current,
      logFunction,
    );

    return () => {
      app.destructor();
    };
  }, []);

  return (
    <>
      <Wrapper>
        <h1 style={{ zIndex: 20, fontSize: 40 }}>
          dsdddddddddddddddddddddddddddd{page}dasdasd
        </h1>
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
