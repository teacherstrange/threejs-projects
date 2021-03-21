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
  startMovePoint: any;
  isMoving: boolean;
  moveVector: THREE.Vector3;

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
    const sphereShape = new CANNON.Sphere(1);

    const randomX = (Math.random() - 0.5) * Math.random() * 50;
    const randomY = (Math.random() - 0.5) * Math.random() * 50;
    const randomZ = (Math.random() - 0.5) * Math.random() * 50 * 0;

    this.spherePhysicBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(randomX, randomY, randomZ),
      shape: sphereShape,
    });

    this.physics.world.addBody(this.spherePhysicBody);

    const geometry = new THREE.SphereGeometry(1, 20);
    geometry.center();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    material.wireframe = true;
    this.sphereBody = new THREE.Mesh(geometry, material);

    this.container.add(this.sphereBody);
  };

  update = () => {
    this.appTime.on('tick', () => {
      if (this.isMoving) {
        this.moveVector &&
          this.spherePhysicBody.position.set(
            this.moveVector.x,
            this.moveVector.y,
            this.moveVector.z,
          );
      }

      this.sphereBody.position.copy(this.spherePhysicBody.position);
    });
  };

  onStartMove = startPoint => {
    this.isMoving = true;
    const newVec = new THREE.Vector3(startPoint.x, startPoint.y, 0);
    const ballPos = this.spherePhysicBody.position;

    this.startMovePoint = new THREE.Vector3(
      ballPos.x - newVec.x,
      ballPos.y - newVec.y,
      ballPos.z,
    );
  };

  onStopMove = () => {
    this.isMoving = false;
  };

  performMove = mouse => {
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(
      this.camera,
    );

    this.moveVector = new THREE.Vector3(
      vector.x + this.startMovePoint.x,
      vector.y + this.startMovePoint.y,
      0,
    );
  };
}
