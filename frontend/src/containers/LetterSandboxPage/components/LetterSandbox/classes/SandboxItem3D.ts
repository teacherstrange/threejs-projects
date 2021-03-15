import * as THREE from 'three';

import InteractiveObject3D from './InteractiveObject3D';

export default class SandboxItem3D extends InteractiveObject3D {
  constructor() {
    super();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    this.add(cube);
    this.setColliderMesh(cube);
  }

  dispose() {
    console.log('disposed');
  }

  update(time: number, dt: number, slowDownFactor: number) {
    super.update(time, dt, slowDownFactor);
  }
}
