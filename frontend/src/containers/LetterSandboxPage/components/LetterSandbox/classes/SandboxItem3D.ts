import * as THREE from 'three';

import InteractiveObject3D from './InteractiveObject3D';

export default class SandboxItem3D extends InteractiveObject3D {
  textureLoader = new THREE.TextureLoader();
  matcapTexture = this.textureLoader.load('/textures/matcaps/4.png');
  material = new THREE.MeshMatcapMaterial({ matcap: this.matcapTexture });

  constructor(font, letter) {
    super();

    this.setup(font, letter);
  }

  setup(font, letter) {
    const fontOption = {
      font: font,
      size: 1,
      height: 0.4,
      curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.9,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 10,
    };

    const geometry = new THREE.TextBufferGeometry(letter, fontOption);
    const mesh = new THREE.Mesh(geometry, this.material);

    mesh.position.set(Math.random() * 5, Math.random() * 5, Math.random() * 5);

    this.add(mesh);
  }

  dispose() {
    console.log('disposed');
  }

  update(time: number, dt: number, slowDownFactor: number) {
    super.update(time, dt, slowDownFactor);
  }
}
