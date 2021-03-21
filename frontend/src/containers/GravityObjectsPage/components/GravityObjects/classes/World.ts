import * as THREE from 'three';

import Letter from './Letter';
import Physics from './Physics';
import UserInput from './UserInput';

interface WorldProps {
  config: any;
  debug: any;
  appTime: any;
  camera: any;
  renderer: any;
  bounds: any;
}

export default class World {
  config: any;
  debug: any;
  appTime: any;
  camera: any;
  renderer: any;
  container: THREE.Object3D;
  axis: THREE.AxesHelper;
  letters = [];
  physics: any;
  userInput: any;
  bounds: any;

  constructor(options: WorldProps) {
    // Options
    this.config = options.config;
    this.debug = options.debug;
    this.appTime = options.appTime;
    this.camera = options.camera;
    this.renderer = options.renderer;
    this.bounds = options.bounds;

    // Set up
    this.container = new THREE.Object3D();

    this.container.matrixAutoUpdate = false;
    this.setAxes();
    this.start();
    this.userInput = new UserInput({
      bounds: this.bounds,
      camera: this.camera,
      letters: this.letters,
    });
  }

  start() {
    this.setPhysics();
    this.setLetter();
  }

  setAxes() {
    this.axis = new THREE.AxesHelper();
    this.container.add(this.axis);
  }

  setPhysics() {
    this.physics = new Physics({
      config: this.config,
      debug: this.debug,
      appTime: this.appTime,
    });
    // this.container.add(this.physics.container);
  }

  setLetter() {
    for (let i = 0; i < 10; i++) {
      const letter = new Letter({
        appTime: this.appTime,
        physics: this.physics,
        renderer: this.renderer,
        camera: this.camera,
        config: this.config,
      });
      this.letters.push(letter);
      this.container.add(letter.container);
    }
  }
}
