import React, { memo, useRef, useEffect, useState } from 'react';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import TWEEN from '@tweenjs/tween.js';

import SandboxItem3D from './classes/SandboxItem3D';

// eslint-disable-next-line node/no-unpublished-import
import { OrbitControls } from '../../../../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import SandboxScene from './classes/SandboxScene';
import { Wrapper } from './styled/Wrapper';
import { RendererWrapper } from './styled/RendererWrapper';

interface LetterSandboxProps {}

const DT_60FPS = 1000 / 60;

export const LetterSandbox = memo<LetterSandboxProps>(props => {
  const { children } = props;

  const camera = useRef(new PerspectiveCamera());
  const renderer = useRef<WebGLRenderer>();

  const rendererWrapperEl = useRef<HTMLElement>();

  const controls = useRef<OrbitControls>();
  const lastFrameTime = useRef(0);

  const [scene, setScene] = useState<SandboxScene>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    renderer.current = new WebGLRenderer({ antialias: true, alpha: true });
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

    scene.items = [{ name: 'me' }, { name: 'you' }];

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
      camera.current.position.z = 3;
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
    scene.addEventListener('itemmouseover', onItemMouseOverInternal);
    scene.addEventListener('itemmouseout', onItemMouseOutInternal);
    scene.addEventListener('itemchange', onCurrentItemChangeInternal);
    window.addEventListener('resize', onResize);
    window.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(onFrame);
    onResize();

    return () => {
      scene.removeEventListener('itemclick', onItemClickInternal);
      scene.removeEventListener('itemmouseover', onItemMouseOverInternal);
      scene.removeEventListener('itemmouseout', onItemMouseOutInternal);
      scene.removeEventListener('itemchange', onCurrentItemChangeInternal);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      scene.dispose();
    };
  }, [scene]);

  const refWrapper = (el: HTMLElement) => {
    if (el && !rendererWrapperEl.current) {
      rendererWrapperEl.current = el;
      if (renderer.current && !renderer.current.domElement.parentNode) {
        rendererWrapperEl.current.appendChild(renderer.current.domElement);
      }
    }
  };

  const onItemClickInternal = (event: Event) => {
    const item = (event['item'] as SandboxItem3D).item;
    onItemClick && onItemClick(item);
  };

  const onItemMouseOverInternal = (event: Event) => {
    const item = (event['item'] as SandboxItem3D).item;
    setIsMouseOver(true);
    onItemMouseOver && onItemMouseOver(item);
  };

  const onItemMouseOutInternal = (event: Event) => {
    const item = (event['item'] as SandboxItem3D).item;
    setIsMouseOver(false);
    onItemMouseOut(item);
  };
  const onCurrentItemChangeInternal = (event: Event) => {
    const item = (event['item'] as SandboxItem3D)?.item;
    item && onCurrentItemChange && onCurrentItemChange(item);
  };

  return (
    <>
      <Wrapper isMouseOver={isMouseOver}>
        <RendererWrapper ref={refWrapper} />
      </Wrapper>
    </>
  );
});

LetterSandbox.displayName = 'LetterSandbox';
