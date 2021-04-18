import * as THREE from 'three';

import { GameSetup } from './world';

export type Direction = 'x' | 'z';

export interface StackBox {
  threejs: THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
  width: number;
  depth: number;
  direction: Direction;
}

interface Box {
  gameSetup: GameSetup;
}

export const box = ({ gameSetup }: Box) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const addLayer = (x, z, width, depth, direction) => {
    const y = gameSetup.BOX_HEIGHT * gameSetup.stack.length;

    const layer = generateBox(x, y, z, width, depth);
    layer.direction = direction;
    gameSetup.stack.push(layer);
  };

  const generateBox = (x, y, z, width, depth): StackBox => {
    const geometry = new THREE.BoxGeometry(width, gameSetup.BOX_HEIGHT, depth);

    const color = new THREE.Color(
      `hsl(${30 + gameSetup.stack.length * 4}, 100%,50%)`,
    );
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    container.add(mesh);

    return {
      threejs: mesh,
      width,
      depth,
      direction: null,
    };
  };

  return {
    container,
    addLayer,
  };
};
