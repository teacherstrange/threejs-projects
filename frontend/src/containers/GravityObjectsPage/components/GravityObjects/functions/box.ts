import * as THREE from 'three';

interface Box {}

export const box = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const BOX_HEIGHT = 1;
  const stack = [];

  const addLayer = (x, z, width, depth, direction) => {
    const y = BOX_HEIGHT * stack.length;

    const layer = generateBox(x, y, z, width, depth);
    layer.direction = direction;
    stack.push(layer);
  };

  const generateBox = (x, y, z, width, depth) => {
    const geometry = new THREE.BoxGeometry(width, BOX_HEIGHT, depth);

    const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%,50%)`);
    const material = new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    container.add(mesh);

    return {
      width,
      depth,
    };
  };

  return {
    container,
    generateBox,
    addLayer,
    stack,
  };
};
