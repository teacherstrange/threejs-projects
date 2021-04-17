import AppTime from './utils/AppTime';
import { world } from './world';
import * as THREE from 'three';
import * as dat from 'dat.gui';

interface Application {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
}

export interface Config {
  showDebugGui?: boolean;
}

export const application = (props: Application) => {
  const appTime = new AppTime();
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let sizes: DOMRect;
  const config = <Config>{ showDebugGui: false };
  let debugGUI: dat.GUI;

  const setCamera = () => {
    camera = new THREE.PerspectiveCamera();
    camera.position.set(0, 2, 10);
  };

  const setRenderer = () => {
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({
      canvas: props.canvasRefEl,
      antialias: true,
      alpha: true,
    });

    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0xff00ff, 1);
    renderer.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    sizes = props.canvasWrapperRefEl.getBoundingClientRect();
  };

  const onResize = () => {
    setSizes();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio, 1.5), 2));

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      appTime.stop();
    } else {
      appTime.resume();
    }
  };

  const setListeners = () => {
    window.addEventListener('resize', onResize);

    appTime.on('tick', (slowDownFactor, time) => {
      renderer.render(scene, camera);
    });
  };

  const setWorld = () => {
    world();
    // scene.add(this.world.container);
  };

  const setConfig = () => {
    config.showDebugGui = window.location.hash === '#debug';
  };

  const setDebug = () => {
    if (config.showDebugGui) {
      debugGUI = new dat.GUI({ width: 420 });
    }
  };

  const destroy = () => {
    appTime.stop();
    debugGUI && debugGUI.destroy();
    renderer.dispose();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('visibilitychange', onVisibilityChange);
  };

  setCamera();
  setRenderer();
  onResize();
  setConfig();
  setDebug();
  setWorld();
  setListeners();

  return { destroy };
};
