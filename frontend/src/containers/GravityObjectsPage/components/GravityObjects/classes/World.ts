import * as THREE from 'three';

import { Config } from '../GravityObjects';
import Time from './utils/Time';

import Physics from './Physics.js';
import Car from './Car.js';

interface WorldProps {
  config: Config;
  debug: React.MutableRefObject<any>;
  resources: any;
  time: Time;
  camera: any;
  renderer: any;
  car: any;
}

export default class World {
  config;
  debug;
  resources;
  time;
  camera;
  renderer;
  container;
  axis;
  physics;
  car;

  constructor(_options: WorldProps) {
    // Options
    this.config = _options.config;
    this.debug = _options.debug;
    this.resources = _options.resources;
    this.time = _options.time;
    this.camera = _options.camera;
    this.renderer = _options.renderer;

    // Set up
    this.container = new THREE.Object3D();
    this.container.matrixAutoUpdate = false;
    this.setAxes();
    this.start();
  }

  start() {
    this.setPhysics();
    this.setCar();
  }

  setAxes() {
    this.axis = new THREE.AxesHelper();
    this.container.add(this.axis);
  }

  setPhysics() {
    this.physics = new Physics({
      config: this.config,
      debug: this.debug,
      time: this.time,
    });
    this.container.add(this.physics.models.container);
  }

  setCar() {
    this.car = new Car({
      time: this.time,
      resources: this.resources,
      physics: this.physics,
      renderer: this.renderer,
      camera: this.camera,
      config: this.config,
    });
    this.container.add(this.car.container);
  }
}
