import AppTime from './utils/AppTime';
import { world } from './world';
import * as THREE from 'three';
import * as dat from 'dat.gui';

interface Application {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
}

interface Config {
  showDebugGui?: boolean;
}

export interface AppObj {
  appTime: AppTime;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  sizes: DOMRect;
  config: Config;
  debugGUI: dat.GUI;
}

export const application = (props: Application) => {
  const appObj: AppObj = {
    appTime: new AppTime(),
    camera: null,
    scene: null,
    renderer: null,
    sizes: null,
    config: { showDebugGui: false },
    debugGUI: null,
  };

  const setCamera = () => {
    const aspectRatio = appObj.sizes.width / appObj.sizes.height;
    appObj.camera = new THREE.OrthographicCamera(
      -1 * aspectRatio,
      1 * aspectRatio,
      1,
      -1,
      0.1,
      100,
    );

    updateCameraSettings();

    appObj.camera.position.set(4, 4, 4);
    appObj.camera.lookAt(0, 0, 0);
  };

  const updateCameraSettings = () => {
    const aspectRatio = appObj.sizes.width / appObj.sizes.height;
    const distance = 10;

    appObj.camera.left = (aspectRatio / -1) * distance;
    appObj.camera.right = (aspectRatio / 1) * distance;
    appObj.camera.top = 1 * distance;
    appObj.camera.bottom = -1 * distance;

    appObj.camera.updateProjectionMatrix();
  };

  const setRenderer = () => {
    appObj.scene = new THREE.Scene();

    appObj.renderer = new THREE.WebGLRenderer({
      canvas: props.canvasRefEl,
      antialias: true,
      alpha: true,
    });

    appObj.renderer.shadowMap.enabled = true;
    appObj.renderer.outputEncoding = THREE.sRGBEncoding;
    appObj.renderer.setClearColor(0xff00ff, 1);
    appObj.renderer.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    appObj.sizes = props.canvasWrapperRefEl.getBoundingClientRect();
  };

  const onResize = () => {
    setSizes();
    appObj.renderer.setSize(appObj.sizes.width, appObj.sizes.height);
    appObj.renderer.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
    );

    updateCameraSettings();
  };

  const onVisibilityChange = () => {
    if (document.hidden) {
      appObj.appTime.stop();
    } else {
      appObj.appTime.resume();
    }
  };

  const setListeners = () => {
    window.addEventListener('resize', onResize);

    appObj.appTime.on('tick', (slowDownFactor, time) => {
      appObj.renderer.render(appObj.scene, appObj.camera);
    });
  };

  const setWorld = () => {
    const { destroy, container } = world({ appObj });
    appObj.scene.add(container);
    return { destroy };
  };

  const setConfig = () => {
    appObj.config.showDebugGui = window.location.hash === '#debug';
  };

  const setDebug = () => {
    if (appObj.config.showDebugGui) {
      appObj.debugGUI = new dat.GUI({ width: 420 });
    }
  };

  const destroy = () => {
    destroySetWorld();
    appObj.appTime.stop();
    appObj.debugGUI && appObj.debugGUI.destroy();
    appObj.renderer.dispose();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('visibilitychange', onVisibilityChange);
  };

  setSizes();
  setCamera();
  setRenderer();
  onResize();
  setConfig();
  setDebug();
  const { destroy: destroySetWorld } = setWorld();
  setListeners();

  return { destroy };
};
