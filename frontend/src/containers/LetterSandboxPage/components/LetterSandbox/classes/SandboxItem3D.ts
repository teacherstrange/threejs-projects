import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import InteractiveObject3D from './InteractiveObject3D';

export default class SandboxItem3D extends InteractiveObject3D {
  scaleTween;
  clickedTween;
  animateOutTween;

  constructor(font, letter, material) {
    super();
    this.setup(font, letter, material);
  }

  setup(font, letter, material) {
    const fontOption = {
      font: font,
      size: 1,
      height: 0.4,
      curveSegments: 1,
      bevelEnabled: true,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const geometry = new THREE.TextBufferGeometry(letter, fontOption);
    const mesh = new THREE.Mesh(geometry, material);

    this.setColliderMesh(mesh);

    mesh.position.set(
      (Math.random() - 0.5) * Math.random() * 30,
      (Math.random() - 0.5) * Math.random() * 30,
      (Math.random() - 0.5) * Math.random() * 30 * 1,
    );

    this.scale.set(0, 0, 0);
    this.animateScale(1.2);

    this.add(mesh);
  }

  animateScale(scale: number) {
    if (this.scaleTween) {
      this.scaleTween.stop();
    }

    this.scaleTween = new TWEEN.Tween(this.scale)
      .to({ x: scale, y: scale, z: scale }, 1200)
      .easing(TWEEN.Easing.Exponential.Out);

    this.scaleTween.start();
  }

  animateClicked() {
    if (this.clickedTween) {
      this.clickedTween.stop();
    }

    this.clickedTween = new TWEEN.Tween(this.scale)
      .to({ x: 2, y: 2, z: 2 }, 1200)
      .easing(TWEEN.Easing.Exponential.Out);

    setTimeout(() => {
      this.dispose();
      this.remove();
    }, 1200);

    this.clickedTween.start();
  }

  animateOut() {
    if (this.animateOutTween) {
      this.animateOutTween.stop();
    }

    this.animateOutTween = new TWEEN.Tween(this.scale)
      .to({ x: 0, y: 0, z: 0 }, 1200)
      .easing(TWEEN.Easing.Exponential.Out);

    this.animateOutTween.start();
  }

  dispose() {
    console.log('disposed');
  }

  update(time: number, dt: number, slowDownFactor: number) {
    super.update(time, dt, slowDownFactor);
  }
}
