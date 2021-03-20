import * as THREE from 'three';

import { Config } from '../GravityObjects';
import AppTime from './utils/AppTime';

import Letter from './Letter';
import Physics from './Physics.js';

interface WorldProps {
  config: any;
  debug: any;
  appTime: any;
  camera: any;
  renderer: any;
}

export default class World {
  config: any;
  debug: any;
  appTime: any;
  camera: any;
  renderer: any;
  container: THREE.Object3D;
  axis: THREE.AxesHelper;
  letter: Letter;
  physics: any;
  constructor(_options: WorldProps) {
    // Options
    this.config = _options.config;
    this.debug = _options.debug;
    this.appTime = _options.appTime;
    this.camera = _options.camera;
    this.renderer = _options.renderer;

    // Set up
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.setAxes();
    this.start();
  }

  start() {
    // this.setPhysics();
    this.setLetter();
  }

  setAxes() {
    this.axis = new THREE.AxesHelper();
    this.container.add(this.axis);
  }

  // setPhysics() {
  //   this.physics = new Physics({
  //     config: this.config,
  //     debug: this.debug,
  //     appTime: this.appTime,
  //   });
  //   this.container.add(this.physics.models.container);
  // }

  setLetter() {
    this.letter = new Letter({
      appTime: this.appTime,
      physics: this.physics,
      renderer: this.renderer,
      camera: this.camera,
      config: this.config,
    });
    this.container.add(this.letter.container);
  }
}
