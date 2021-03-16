import * as THREE from 'three';

import InteractiveScene from './InteractiveScene';
import SandboxItem3D from './SandboxItem3D';

const fontURL = '/fonts/rancher.json';

export default class SandboxScene extends InteractiveScene {
  items3D: SandboxItem3D[] = [];
  maxAnisotropy: number;

  fontLoader = new THREE.FontLoader();
  myFont;
  loadTheFont = this.fontLoader.load(fontURL, f => {
    this.myFont = f;
  });

  constructor(camera: THREE.PerspectiveCamera, maxAnisotropy: number) {
    super(camera);
    this.maxAnisotropy = maxAnisotropy;
  }

  set newLetter(letter) {
    this.items3D.forEach(item3D => {
      this.remove(item3D);
      item3D.dispose();
      item3D.removeEventListener('click', this.onItemClick);
    });
    this.items3D = [];

    if (!letter) {
      return;
    }

    const item3D = new SandboxItem3D(this.myFont, letter);
    item3D.addEventListener('click', this.onItemClick);

    console.log(item3D);
    // this.items3D.push(item3D);
    this.add(item3D);
  }

  dispose() {
    super.dispose();
    this.items3D = [];
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
