import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export default class Lights {
  appTime: any;
  physics: any;
  materials: any;
  renderer: any;
  camera: any;
  debug: any;
  config: any;
  container: THREE.Object3D;
  position: THREE.Vector3;
  constructor(_options) {
    // Options
    this.appTime = _options.appTime;
    this.physics = _options.physics;
    this.materials = _options.materials;
    this.renderer = _options.renderer;
    this.camera = _options.camera;
    this.debug = _options.debug;
    this.config = _options.config;

    // Set up
    this.container = new THREE.Object3D();
    this.position = new THREE.Vector3();

    this.setLights();
    this.update();
  }

  setLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.container.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 0);
    directionalLight.castShadow = true;

    this.container.add(directionalLight);
  };

  update = () => {
    this.appTime.on('tick', () => {});
  };
}
