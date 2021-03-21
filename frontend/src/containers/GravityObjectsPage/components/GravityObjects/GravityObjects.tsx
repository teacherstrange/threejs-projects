import React, { memo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import World from './classes/World';

import AppTime from './classes/utils/AppTime';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

interface GravityObjectsProps {
  onItemClick?: () => void;
}

export interface Config {
  debug?: boolean;
}

const GravityObjects = memo<GravityObjectsProps>(props => {
  const { onItemClick } = props;

  const camera = useRef(null);
  const scene = useRef(null);
  const renderer = useRef(null);
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null);
  const config = useRef<Config>({});
  const debug = useRef<dat.GUI>(null);
  const appTime = useRef(new AppTime());
  const controls = useRef(null);
  const world = useRef(null);
  const bounds = useRef(null);

  useEffect(() => {
    setBounds();
    setCamera();
    setRenderer();
    setWorld();
    setConfig();
    setDebug();

    appTime.current.on('tick', () => {
      // controls.current.update();
      renderer.current.render(scene.current, camera.current);
    });

    const onResize = () => {
      setBounds();
      renderer.current.setPixelRatio(
        Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
      );
      renderer.current.setSize(bounds.current.width, bounds.current.height);
      camera.current.aspect = bounds.current.width / bounds.current.height;
      camera.current.updateProjectionMatrix();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        appTime.current.stop();
      } else {
        appTime.current.resume();
      }
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);
    onResize();

    return () => {
      destructor();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  const setBounds = () => {
    bounds.current = canvasWrapperRef.current.getBoundingClientRect();
  };

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

    // controls.current = new OrbitControls(camera.current, canvasRef.current);
    // controls.current.enableDamping = true;
  };

  const setCamera = () => {
    camera.current = new THREE.PerspectiveCamera();
    camera.current.position.set(0, 0, 20);
  };

  const setWorld = () => {
    world.current = new World({
      bounds: bounds.current,
      config: config.current,
      debug: debug.current,
      appTime: appTime.current,
      camera: camera.current,
      renderer: renderer.current,
    });
    scene.current.add(world.current.container);
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
    camera.current.orbitControls && camera.current.orbitControls.dispose();
    appTime.current.stop();
    debug.current && debug.current.destroy();
    renderer.current.dispose();
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
