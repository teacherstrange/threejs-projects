import React, { memo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import * as dat from 'dat.gui';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

interface GravityObjectsProps {
  onItemClick?: () => void;
}

interface Config {
  debug?: boolean;
}

const GravityObjects = memo<GravityObjectsProps>(props => {
  const { onItemClick } = props;
  const DT_60FPS = 1000 / 60;
  const camera = useRef(null);
  const scene = useRef(null);
  const renderer = useRef(null);
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const config = useRef<Config>({});
  const debug = useRef(null);

  const frameRafReference = useRef<ReturnType<typeof requestAnimationFrame>>(
    null,
  );

  const controls = useRef(null);
  const lastFrameTime = useRef(0);
  const isResumed = useRef(false);

  useEffect(() => {
    setCamera();
    setRenderer();
    setWorld();
    setConfig();
    setDebug();

    const onFrame = (time: number) => {
      frameRafReference.current = requestAnimationFrame(onFrame);
      TWEEN.update(time);

      if (isResumed.current) {
        lastFrameTime.current = time;
        isResumed.current = false;
        return;
      }

      const dt = time - lastFrameTime.current;
      lastFrameTime.current = time;
      const slowDownFactor = Math.min(Math.max(dt / DT_60FPS, 1), 1);
      // scene.current.update(time, dt, slowDownFactor);
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
    };

    const onResize = () => {
      const bounds = canvasWrapperRef.current.getBoundingClientRect();

      renderer.current.setPixelRatio(
        Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
      );
      renderer.current.setSize(bounds.width, bounds.height);
      camera.current.aspect = bounds.width / bounds.height;
      camera.current.updateProjectionMatrix();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frameRafReference.current);
      } else {
        isResumed.current = true;
        frameRafReference.current = requestAnimationFrame(onFrame);
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);
    frameRafReference.current = requestAnimationFrame(onFrame);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(frameRafReference.current);
      scene.current.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRenderer = () => {
    scene.current = new THREE.Scene();

    renderer.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    renderer.current.setClearColor(0xffffff, 1);
    renderer.current.physicallyCorrectLights = true;
    renderer.current.gammaFactor = 2.2;
    renderer.current.gammaOutPut = true;

    controls.current = new OrbitControls(camera.current, canvasRef.current);
    controls.current.enableDamping = true;
  };

  const setCamera = () => {
    camera.current = new THREE.PerspectiveCamera();
    camera.current.position.set(0, 0, 20);
  };

  const setWorld = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.current.add(cube);
  };

  const setConfig = () => {
    config.current.debug = window.location.hash === '#debug';
  };

  const setDebug = () => {
    if (config.current.debug) {
      debug.current = new dat.GUI({ width: 420 });
    }
  };

  const destructor = () => {
    camera.current.orbitControls.dispose();
    renderer.current.dispose();
    debug.current.destroy();
  };

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
