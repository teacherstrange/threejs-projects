import * as THREE from 'three';

import InteractiveScene from './InteractiveScene';
import SandboxItem3D from './SandboxItem3D';

export default class SandboxScene extends InteractiveScene {
  isEnabled = false;
  items3D: SandboxItem3D[] = [];
  maxAnisotropy: number;

  constructor(camera: THREE.PerspectiveCamera, maxAnisotropy: number) {
    super(camera);
    this.maxAnisotropy = maxAnisotropy;
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
