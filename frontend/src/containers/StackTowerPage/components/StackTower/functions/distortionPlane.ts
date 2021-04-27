import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
    const overlayGeometry = new THREE.PlaneGeometry(3, 3, 1, 1);
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
            gl_Position = vec4(position.xy * 0.7, 0.5, 1.);
        }
      `,
      fragmentShader: fragShader,
      transparent: true,
    });
    overlay = new THREE.Mesh(overlayGeometry, overlayMaterial);

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
