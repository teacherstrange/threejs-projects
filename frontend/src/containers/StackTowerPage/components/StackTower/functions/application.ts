import AppTime from './utils/AppTime';
import { world } from './world';
import * as THREE from 'three';
import * as dat from 'dat.gui';

export interface ApplicationProps {
  canvasRefEl: HTMLCanvasElement;
  canvasWrapperRefEl: HTMLDivElement;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isReady: boolean;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  point: number;
  setPoint: React.Dispatch<React.SetStateAction<number>>;
}

interface Config {
  showDebugGui?: boolean;
}

export const CAMERA_POS = 6;

export interface AppObj {
  appTime: AppTime;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  sizes: DOMRect;
  config: Config;
  debugGUI: dat.GUI;
  baseColor: number;
  backgroundColor: number;

  colorMultiplier: number;
}

export const application = (appProps: ApplicationProps) => {
  const appObj: AppObj = {
    appTime: new AppTime(),
    camera: null,
    scene: null,
    renderer: null,
    sizes: null,
    config: { showDebugGui: false },
    debugGUI: null,
    backgroundColor: 1,
    baseColor: 1,
    colorMultiplier: 10,
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

    appObj.camera.position.set(CAMERA_POS, CAMERA_POS, CAMERA_POS);
    appObj.camera.lookAt(0, 0, 0);
  };

  const updateCameraSettings = () => {
    const aspectRatio = appObj.sizes.width / appObj.sizes.height;
    const distance = CAMERA_POS;

    appObj.camera.left = (aspectRatio / -1) * distance;
    appObj.camera.right = (aspectRatio / 1) * distance;
    appObj.camera.top = 1 * distance;
    appObj.camera.bottom = -1 * distance;

    appObj.camera.updateProjectionMatrix();
  };

  const setRenderer = () => {
    appObj.scene = new THREE.Scene();

    appObj.renderer = new THREE.WebGLRenderer({
      canvas: appProps.canvasRefEl,
      antialias: true,
      alpha: true,
    });

    appObj.renderer.shadowMap.enabled = true;
    appObj.renderer.outputEncoding = THREE.sRGBEncoding;
    appObj.renderer.setClearColor(
      new THREE.Color(`hsl(${appObj.backgroundColor}, 40%,80%)`),
    );
    appObj.renderer.physicallyCorrectLights = true;
  };

  const setSizes = () => {
    appObj.sizes = appProps.canvasWrapperRefEl.getBoundingClientRect();
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
    window.addEventListener('visibilitychange', onVisibilityChange);

    appObj.appTime.on('tick', (_slowDownFactor, _time, _delta) => {
      appObj.renderer.render(appObj.scene, appObj.camera);
    });
  };

  const setWorld = () => {
    const { destroy, container } = world({ appObj, appProps });
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
  appProps.setIsReady(true);

  return { destroy };
};
