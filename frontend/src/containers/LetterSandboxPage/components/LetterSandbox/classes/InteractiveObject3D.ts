import { Mesh, Object3D } from 'three';

export default class InteractiveObject3D extends Object3D {
  setColliderMesh(mesh: Mesh) {
    mesh['interactiveObject'] = this;
  }

  update(time: number, dt: number, slowDownFactor: number) {}

  onMouseOver() {
    this.dispatchEvent({ type: 'mouseover' });
  }

  onMouseOut() {
    this.dispatchEvent({ type: 'mouseout' });
  }

  onClick() {
    this.dispatchEvent({ type: 'click' });
  }
}
