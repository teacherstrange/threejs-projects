import React, { memo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import SandboxItem3D from './classes/SandboxItem3D';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import SandboxScene from './classes/SandboxScene';
import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

interface LetterSandboxProps {
  onItemClick?: () => void;
}

const DT_60FPS = 1000 / 60;

export const LetterSandbox = memo<LetterSandboxProps>(props => {
  const { onItemClick } = props;

  const camera = useRef(new THREE.PerspectiveCamera());
  const renderer = useRef<THREE.WebGLRenderer>();

  const rendererWrapperEl = useRef<HTMLElement>();

  const controls = useRef<OrbitControls>();
  const lastFrameTime = useRef(0);

  const [scene, setScene] = useState<SandboxScene>(null);

  useEffect(() => {
    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    controls.current = new OrbitControls(
      camera.current,
      rendererWrapperEl.current,
    );

    if (rendererWrapperEl.current && !renderer.current.domElement.parentNode) {
      rendererWrapperEl.current.appendChild(renderer.current.domElement);
    }

    return () => {
      renderer.current.domElement.remove();
    };
  }, []);

  useEffect(() => {
    setScene(
      new SandboxScene(
        camera.current,
        renderer.current.capabilities.getMaxAnisotropy(),
      ),
    );
  }, []);

  useEffect(() => {
    if (!scene) {
      return () => {};
    }

    let rafId: number;
    let isResumed = true;

    const onFrame = (time: number) => {
      rafId = requestAnimationFrame(onFrame);

      if (isResumed) {
        lastFrameTime.current = time;
        isResumed = false;
      }

      const dt = time - lastFrameTime.current;
      lastFrameTime.current = time;
      const slowDownFactor = Math.min(Math.max(dt / DT_60FPS, 1), 1);
      TWEEN.update(time);
      scene.update(time, dt, slowDownFactor);
      controls.current.update();
      renderer.current.render(scene, camera.current);
    };

    const onResize = () => {
      const bounds = rendererWrapperEl.current.getBoundingClientRect();
      scene.rendererBounds = bounds;
      renderer.current.setPixelRatio(window.devicePixelRatio);
      renderer.current.setSize(bounds.width, bounds.height);
      camera.current.aspect = bounds.width / bounds.height;
      camera.current.updateProjectionMatrix();
      camera.current.position.set(0, 0, 20);
      // camera.current.lookAt(new THREE.Vector3(0, 0, 0));
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        isResumed = true;
        rafId = requestAnimationFrame(onFrame);
      }
    };

    scene.renderer = renderer.current;
    scene.addEventListener('itemclick', onItemClickInternal);
    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('keypress', onKeyPressInternal);
    rafId = requestAnimationFrame(onFrame);
    onResize();

    return () => {
      scene.removeEventListener('itemclick', onItemClickInternal);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('keypress', onKeyPressInternal);
      cancelAnimationFrame(rafId);
      scene.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  const refWrapper = (el: HTMLElement) => {
    if (el && !rendererWrapperEl.current) {
      rendererWrapperEl.current = el;
      if (renderer.current && !renderer.current.domElement.parentNode) {
        rendererWrapperEl.current.appendChild(renderer.current.domElement);
      }
    }
  };

  const onKeyPressInternal = (event: KeyboardEvent) => {
    scene.newLetter = event.key;
  };

  const onItemClickInternal = (event: Event) => {
    console.log(event['item']);
    // const item = event['item'] as SandboxItem3D;
    // onItemClick && onItemClick(item);
  };

  return (
    <>
      <Wrapper>
        <RendererWrapper ref={refWrapper} />
      </Wrapper>
    </>
  );
});

LetterSandbox.displayName = 'LetterSandbox';
