import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export default class Floor {
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

    this.setFloor();
    this.update();
  }

  setFloor = () => {
    const floorShape = new CANNON.Plane();
    const floorBody = new CANNON.Body();
    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5,
    );
    floorBody.position.y = 0;
    floorBody.mass = 0;
    floorBody.addShape(floorShape);
    this.physics.world.addBody(floorBody);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(500, 500),
      new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.3,
        roughness: 0.4,
      }),
    );
    floor.receiveShadow = true;
    floor.position.y = 0;
    floor.rotation.x = -Math.PI * 0.5;
    this.container.add(floor);
  };

  update = () => {
    this.appTime.on('tick', () => {});
  };
}
