import World from './World';
import AppTime from './utils/AppTime';
// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';

import * as THREE from 'three';
import * as dat from 'dat.gui';

export interface Config {
  showDebugGui?: boolean;
}

export default class Application {
  canvasRef: HTMLCanvasElement;
  canvasWrapper: HTMLDivElement;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  world: World;
  bounds: DOMRect;
  debugGUI: dat.GUI;
  appTime = new AppTime();
  config = <Config>{ showDebugGui: false };

  constructor(canvasRef, canvasWrapper) {
    this.canvasRef = canvasRef;
    this.canvasWrapper = canvasWrapper;
    this.setup();
  }

  setup = () => {
    this.setCamera();
    this.setRenderer();
    this.onResize();
    this.setDebug();
    this.setConfig();
    this.setWorld();
    this.setListeners();
  };

  onResize = () => {
    this.setBounds();

    this.renderer.setPixelRatio(
      Math.min(Math.max(window.devicePixelRatio, 1.5), 2),
    );
    this.renderer.setSize(this.bounds.width, this.bounds.height);
    this.camera.aspect = this.bounds.width / this.bounds.height;
    this.camera.updateProjectionMatrix();
  };

  setBounds = () => {
    this.bounds = this.canvasWrapper.getBoundingClientRect();
  };

  onVisibilityChange = () => {
    if (document.hidden) {
      this.appTime.stop();
    } else {
      this.appTime.resume();
    }
  };

  setListeners = () => {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('visibilitychange', this.onVisibilityChange);

    this.appTime.on('tick', () => {
      // this.controls.update();
      this.renderer.render(this.scene, this.camera);
    });
  };

  setRenderer = () => {
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef,
      antialias: true,
      alpha: true,
    });

    this.renderer.shadowMap.enabled = true;

    this.renderer.setClearColor(0xffffff, 1);
    this.renderer.physicallyCorrectLights = true;
    // this.renderer.gammaFactor = 2.2;
    // this.renderer.gammaOutPut = true;

    // this.controls = new OrbitControls(this.camera, this.canvasRef);
    // this.controls.enableDamping = true;
  };

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera();
    this.camera.position.set(0, 2, 10);
  };

  setWorld = () => {
    this.world = new World({
      bounds: this.bounds,
      config: this.config,
      debug: this.debugGUI,
      appTime: this.appTime,
      camera: this.camera,
      renderer: this.renderer,
    });
    this.scene.add(this.world.container);
  };

  setConfig = () => {
    this.config.showDebugGui = window.location.hash === '#debug';
  };

  setDebug = () => {
    if (this.config.showDebugGui) {
      this.debugGUI = new dat.GUI({ width: 420 });
    }
  };

  destructor = () => {
    // this.camera.orbitControls && this.camera.orbitControls.dispose();
    this.appTime.stop();
    this.debugGUI && this.debugGUI.destroy();
    this.renderer.dispose();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('visibilitychange', this.onVisibilityChange);
  };
}
