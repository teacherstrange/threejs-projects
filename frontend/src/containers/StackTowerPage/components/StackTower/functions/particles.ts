import * as THREE from 'three';

import firefliesVertexShader from './shaders/fireflies/vertex.glsl';
import firefliesFragmentShader from './shaders/fireflies/fragment.glsl';

import { AppObj } from './application';

interface ParticlesProps {
  appObj: AppObj;
}

export const particles = ({ appObj }: ParticlesProps) => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  const RANDOM_SIZE = 8;

  const firefliesGeometry = new THREE.BufferGeometry();
  const firefliesCount = 30;
  const positionArray = new Float32Array(firefliesCount * 3);
  const scaleArray = new Float32Array(firefliesCount);

  for (let i = 0; i < firefliesCount; i++) {
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * RANDOM_SIZE;
    positionArray[i * 3 + 1] = (Math.random() - 0.5) * RANDOM_SIZE;
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * RANDOM_SIZE;
    scaleArray[i] = Math.random();
  }

  firefliesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positionArray, 3),
  );

  // Material
  const firefliesMaterial = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    uniforms: {
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 500 },
      uTime: { value: 0 },
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
  });

  firefliesGeometry.setAttribute(
    'aScale',
    new THREE.BufferAttribute(scaleArray, 1),
  );

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

  appObj.appTime.on('tick', (slowDownFactor, time, delta) => {
    firefliesMaterial.uniforms.uTime.value = time / 700;
  });

  window.addEventListener('resize', onResize);

  const destroy = () => {
    window.removeEventListener('resize', onResize);
  };

  return {
    container,
    destroy,
  };
};
