import * as THREE from 'three';

const fontURL = '/fonts/rancher.json';

import InteractiveScene from './InteractiveScene';
import SandboxItem3D from './SandboxItem3D';

export default class SandboxScene extends InteractiveScene {
  items3D: SandboxItem3D[] = [];
  maxAnisotropy: number;
  fontLoader = new THREE.FontLoader();
  textureLoader = new THREE.TextureLoader();
  letters;

  constructor(camera: THREE.PerspectiveCamera, maxAnisotropy: number) {
    super(camera);
    this.maxAnisotropy = maxAnisotropy;
    this.letters = [];

    this.fontLoader.load(fontURL, f => {
      this.setup(f);
    });
  }

  setup(f) {
    const fontOption = {
      font: f,
      size: 3,
      height: 0.4,
      curveSegments: 24,
      bevelEnabled: true,
      bevelThickness: 0.9,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 10,
    };

    const matcapTexture = this.textureLoader.load('/textures/matcaps/4.png');
    const material = new THREE.MeshMatcapMaterial();
    material.matcap = matcapTexture;
    const geometry = new THREE.TextBufferGeometry('le font', fontOption);
    const mesh = new THREE.Mesh(geometry, material);

    this.add(mesh);
  }

  dispose() {
    super.dispose();
    this.items3D = [];
  }

  set items(items) {
    this.items3D.forEach(item3D => {
      this.remove(item3D);
      item3D.dispose();
      item3D.removeEventListener('click', this.onItemClick);
    });
    this.items3D = [];

    items &&
      items.forEach((item, index) => {
        const item3D = new SandboxItem3D();
        item3D.addEventListener('click', this.onItemClick);
        this.items3D.push(item3D);
        this.add(item3D);
      });

    this.animateIn();
  }

  set filter(filter: string) {}

  set hoveredItem(item) {}

  set instructionsHeading(text: string) {}

  set instructionsParagraph(text: string) {}

  set tapToDiscover(text: string) {}

  animateIn() {}

  update(time: number, dt: number, slowDownFactor: number) {
    this.items3D.forEach(item => item.update(time, dt, slowDownFactor));
  }

  onItemClick = (event: Event) => {
    this.dispatchEvent({ type: 'itemclick', item: event.target });
  };
}
