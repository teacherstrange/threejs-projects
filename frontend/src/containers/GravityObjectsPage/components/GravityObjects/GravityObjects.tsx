import React, { memo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import Time from './classes/utils/Time';

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
  const appTime = useRef(new Time());
  const controls = useRef(null);

  useEffect(() => {
    setCamera();
    setRenderer();
    setWorld();
    setConfig();
    setDebug();

    appTime.current.on('tick', () => {
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
    });

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

    appTime.current.on('tick', () => {
      cube.position.x += 0.02 * appTime.current.slowDownFactor;
    });
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
