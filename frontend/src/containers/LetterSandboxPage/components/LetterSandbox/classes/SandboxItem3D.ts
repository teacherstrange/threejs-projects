import { Mesh, Object3D } from 'three';

import InteractiveObject3D from './InteractiveObject3D';

export default class SandboxItem3D extends InteractiveObject3D {
  update(time: number, dt: number, slowDownFactor: number) {
    super.update(time, dt, slowDownFactor);
  }
}
