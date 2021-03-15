import {
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import throttle from 'lodash.throttle';

import InteractiveObject3D from './InteractiveObject3D';

export default class InteractiveScene extends Scene {
  camera: PerspectiveCamera;
  touchMoveStartX = 0;
  touchMoveStartY = 0;
  touchMoveLastX = 0;
  touchMoveLastY = 0;
  touchMoveDistance = 0;
  raycaster = new Raycaster();
  _rendererBounds: DOMRect;
  hoveredObject?: InteractiveObject3D;
  rendererEl: HTMLElement;

  constructor(camera: PerspectiveCamera) {
    super();
    this.camera = camera;
  }

  dispose() {
    this.rendererEl.removeEventListener('touchstart', this._onTouchStart);
    this.rendererEl.removeEventListener('touchmove', this._onTouchMove);
    this.rendererEl.removeEventListener('touchend', this.onTouchEnd);
    this.rendererEl.removeEventListener('click', this._onClick);
    document.documentElement.removeEventListener(
      'mousemove',
      this._onMouseMove,
    );
  }

  set renderer(renderer: WebGLRenderer) {
    this.rendererEl = renderer.domElement;
    this.rendererEl.addEventListener('touchstart', this._onTouchStart);
    this.rendererEl.addEventListener('touchmove', this._onTouchMove, {
      passive: false,
    });
    this.rendererEl.addEventListener('touchend', this._onTouchEnd);
    this.rendererEl.addEventListener('click', this._onClick);
    document.documentElement.addEventListener('mousemove', this._onMouseMove);
  }

  get rendererBounds() {
    return this._rendererBounds;
  }

  set rendererBounds(bounds: DOMRect) {
    this._rendererBounds = bounds;
  }

  performRaycast(x: number, y: number, fnToCallIfHit?: string) {
    const mouse = new Vector2(
      ((x - this.rendererBounds.x) / this.rendererBounds.width) * 2 - 1,
      -((y - this.rendererBounds.y) / this.rendererBounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.children, true);

    const intersectingObjects: InteractiveObject3D[] = [];

    for (let i = 0; i < intersects.length; ++i) {
      const interactiveObject = intersects[i].object[
        'interactiveObject'
      ] as InteractiveObject3D;

      console.log(interactiveObject);

      if (interactiveObject) {
        if (fnToCallIfHit) {
          interactiveObject[fnToCallIfHit]();
        }
        intersectingObjects.push(interactiveObject);
        break;
      }
    }

    return intersectingObjects;
  }

  _onTouchStart = (event: TouchEvent) => {
    this.touchMoveStartX = event.touches[0].clientX;
    this.touchMoveStartY = event.touches[0].clientY;
    this.touchMoveLastY = this.touchMoveStartY;
    this.touchMoveDistance = 0;
    this.onTouchStart(this.touchMoveStartX, this.touchMoveStartY);
  };

  _onTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    const dx = x - this.touchMoveLastX;
    const dy = y - this.touchMoveLastY;
    this.touchMoveDistance += Math.sqrt(dx * dx + dy * dy);
    this.touchMoveLastX = x;
    this.touchMoveLastY = y;
    this.onTouchMove(x, y, dx, dy, this.touchMoveDistance);
  };

  _onTouchEnd = (event: TouchEvent) => {
    this.onTouchEnd();
    if (this.touchMoveDistance < 10) {
      this.onClick(this.touchMoveStartX, this.touchMoveStartY);
    }
  };

  _onClick = (event: MouseEvent) => {
    this.onClick(event.clientX, event.clientY);
  };

  _onMouseMove = throttle((event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    const objects = this.performRaycast(x, y);
    if (objects.length > 0) {
      const hoveredObject = objects[0];
      if (hoveredObject !== this.hoveredObject) {
        if (this.hoveredObject) {
          this.hoveredObject.onMouseOut();
        }
        this.hoveredObject = hoveredObject;
        hoveredObject.onMouseOver();
      }
    } else if (this.hoveredObject) {
      this.hoveredObject.onMouseOut();
      this.hoveredObject = null;
    }
  }, 1000 / 10);

  onTouchStart(x: number, y: number) {}

  onTouchMove(
    x: number,
    y: number,
    dx: number,
    dy: number,
    currentDistance: number,
  ) {}

  onTouchEnd() {}

  onClick = (x: number, y: number) => {
    this.performRaycast(x, y, 'onClick');
  };
}
