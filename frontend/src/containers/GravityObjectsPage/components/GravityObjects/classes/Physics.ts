import * as CANNON from 'cannon-es';
import * as THREE from 'three';

interface PhysicsProps {
  config: any;
  debug: any;
  appTime: any;
}

export default class Physics {
  config: any;
  debug: any;
  appTime: any;
  world: any;
  debugFolder: any;
  materials: {};
  models: any;

  constructor(options: PhysicsProps) {
    this.config = options.config;
    this.debug = options.debug;
    this.appTime = options.appTime;

    this.setWorld();

    this.appTime.on('tick', () => {
      this.world.step(1 / 60, this.appTime.delta, 3);
    });
  }

  setWorld = () => {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.81, 0);
    // this.world.allowSleep = true;
    this.world.defaultContactMaterial.friction = 0;
    this.world.defaultContactMaterial.restitution = 0.1;
  };
}
