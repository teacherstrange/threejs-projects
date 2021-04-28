import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import fragShader from './shaders/distortionPlaneShaders/fragShader.glsl';

export const distortionPlane = () => {
  const container = new THREE.Object3D();
  container.matrixAutoUpdate = false;

  let tweenSize;
  let tweenProgress;
  const color = '#73BADA';
  const shadow = '#58A4D3';
  const size = 1;
  const progress = 0;

  let overlay;

  const generatePlane = () => {
    const overlayGeometry = new THREE.PlaneGeometry(8, 8, 1, 1);
    const overlayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uColorShadow: { value: new THREE.Color(shadow) },
        uProgress: { value: progress },
        uNoiseSize: { value: size },
      },
      vertexShader: `
        varying vec2 vUv;

        void main(){
          vUv = uv;
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;


        }
      `,
      fragmentShader: fragShader,
      transparent: true,
    });
    overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);
    overlay.rotation.y = Math.PI * 0.25;
    // overlay.rotation.x = Math.PI * 0.6;
    overlay.position.set(3, 3, 3);
    container.add(overlay);
  };

  const animateValues = () => {
    if (!overlay) {
      return;
    }

    if (tweenSize) {
      tweenSize.stop();
    }

    tweenSize = new TWEEN.Tween({ size: size })
      .to({ size: 5 }, 7500)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(obj => {
        overlay.material.uniforms.uNoiseSize.value = obj.size;
      });

    tweenSize.start();

    if (tweenProgress) {
      tweenProgress.stop();
    }

    tweenProgress = new TWEEN.Tween({ progress: progress })
      .to({ progress: 1 }, 7500)
      .easing(TWEEN.Easing.Exponential.Out)
      .onUpdate(obj => {
        overlay.material.uniforms.uProgress.value = obj.progress;
      });

    tweenProgress.start();
  };

  generatePlane();

  animateValues();

  return {
    container,
  };
};
