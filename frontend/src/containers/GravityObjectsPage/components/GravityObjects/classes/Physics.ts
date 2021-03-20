import CANNON from 'cannon-es';
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
  constructor(_options: PhysicsProps) {
    this.config = _options.config;
    this.debug = _options.debug;
    this.appTime = _options.appTime;

    this.setWorld();
    this.appTime.on('tick', () => {
      this.world.step(1 / 60, this.appTime.delta, 3);
    });
  }

  setWorld() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, 0, -3.25);
    this.world.allowSleep = true;
    this.world.defaultContactMaterial.friction = 0;
    this.world.defaultContactMaterial.restitution = 0.2;

    // Debug
    if (this.debug) {
      this.debugFolder
        .add(this.world.gravity, 'z')
        .step(0.001)
        .min(-20)
        .max(20)
        .name('gravity');
    }

    // this.setMaterials();
  }

  // setMaterials() {
  //   this.materials = {};

  //   // All materials
  //   this.materials.items = {};
  //   this.materials.items.floor = new CANNON.Material('floorMaterial');
  //   this.materials.items.dummy = new CANNON.Material('dummyMaterial');

  //   // Contact between materials
  //   this.materials.contacts = {};

  //   this.materials.contacts.floorDummy = new CANNON.ContactMaterial(
  //     this.materials.items.floor,
  //     this.materials.items.dummy,
  //     { friction: 0.05, restitution: 0.3, contactEquationStiffness: 1000 },
  //   );
  //   this.world.addContactMaterial(this.materials.contacts.floorDummy);

  //   this.materials.contacts.dummyDummy = new CANNON.ContactMaterial(
  //     this.materials.items.dummy,
  //     this.materials.items.dummy,
  //     { friction: 0.5, restitution: 0.3, contactEquationStiffness: 1000 },
  //   );

  //   this.world.addContactMaterial(this.materials.contacts.dummyDummy);
  // }
}
