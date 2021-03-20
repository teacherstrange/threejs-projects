import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export default class Car {
  time: any;
  physics: any;
  materials: any;
  renderer: any;
  camera: any;
  debug: any;
  config: any;
  container: THREE.Object3D;
  position: THREE.Vector3;
  debugFolder: any;
  constructor(_options) {
    // Options
    this.time = _options.time;
    this.physics = _options.physics;
    this.materials = _options.materials;
    this.renderer = _options.renderer;
    this.camera = _options.camera;
    this.debug = _options.debug;
    this.config = _options.config;

    // Set up
    this.container = new THREE.Object3D();
    this.position = new THREE.Vector3();

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder('letter');
      // this.debugFolder.open()
    }

    this.setLetter();
  }

  setLetter() {
    // this.letter = {};
    // this.setLetter.object.position.copy(this.physics.letter.body.position);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.container.add(cube);
  }
}
