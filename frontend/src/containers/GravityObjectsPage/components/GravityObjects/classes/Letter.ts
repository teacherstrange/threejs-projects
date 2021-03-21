import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

export default class Letter {
  appTime: any;
  physics: any;
  materials: any;
  renderer: any;
  camera: any;
  debug: any;
  config: any;
  container: THREE.Object3D;
  position: THREE.Vector3;
  debugFolder: any;
  spherePhysicBody;
  sphereBody;

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

    // Debug
    if (this.debug) {
      this.debugFolder = this.debug.addFolder('letter');
      // this.debugFolder.open()
    }

    this.setLetter();
    this.update();
  }

  setLetter = () => {
    // this.letter = {};
    // this.setLetter.object.position.copy(this.physics.letter.body.position);

    // Cannon
    const sphereShape = new CANNON.Sphere(0.5);

    const randomX = (Math.random() - 0.5) * Math.random() * 30;
    const randomY = (Math.random() - 0.5) * Math.random() * 30;
    const randomZ = (Math.random() - 0.5) * Math.random() * 30 * 0;

    this.spherePhysicBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(randomX, randomY, randomZ),
      shape: sphereShape,
    });

    this.physics.world.addBody(this.spherePhysicBody);

    const geometry = new THREE.SphereGeometry(0.5, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    material.wireframe = true;
    this.sphereBody = new THREE.Mesh(geometry, material);

    this.container.add(this.sphereBody);
  };

  update = () => {
    this.appTime.on('tick', () => {
      this.sphereBody.position.copy(this.spherePhysicBody.position);
    });
  };

  onStartMove = () => {
    console.log(this.spherePhysicBody.position);
  };

  performMove = mouse => {
    this.spherePhysicBody.position.set(mouse.x, mouse.y, 0);
  };
}
