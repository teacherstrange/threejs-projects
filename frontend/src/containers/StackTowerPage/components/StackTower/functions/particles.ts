import * as THREE from 'three';

import firefliesVertexShader from './shaders/fireflies/vertex.glsl';
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl';

export const particles = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const RANDOM_SIZE = 5;

  const firefliesGeometry = new THREE.BufferGeometry();
  const firefliesCount = 30;
  const positionArray = new Float32Array(firefliesCount * 3);

  for (let i = 0; i < firefliesCount; i++) {
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * RANDOM_SIZE;
    positionArray[i * 3 + 1] = (Math.random() - 0.5) * RANDOM_SIZE;
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * RANDOM_SIZE;
  }

  firefliesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionArray, 3),
  );

  // Material
  const firefliesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 500 },
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
  });

  // Points
  const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);

  fireflies.renderOrder = 1;

  container.add(fireflies);

  const onResize = () => {
    firefliesMaterial.uniforms.uPixelRatio.value = Math.min(
      window.devicePixelRatio,
      2,
    );
  };
  window.addEventListener('resize', onResize);

  const destroy = () => {
    window.removeEventListener('resize', onResize);
  };

  return {
    container,
    destroy,
  };
};
