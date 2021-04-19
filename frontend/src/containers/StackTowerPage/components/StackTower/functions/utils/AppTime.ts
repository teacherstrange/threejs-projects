import TWEEN from '@tweenjs/tween.js';

import EventEmitter from './EventEmitter';

const DT_60FPS = 1000 / 60;

export default class AppTime extends EventEmitter {
  isResumed;
  ticker;
  lastFrameTime;

  constructor() {
    super();
    this.isResumed = false;
    this.resume();
  }

  tick = (time: number) => {
    this.ticker = window.requestAnimationFrame(this.tick);
    TWEEN.update(time);

    if (this.isResumed) {
      this.lastFrameTime = window.performance.now();
      this.isResumed = false;
      return;
    }

    if (time - this.lastFrameTime > DT_60FPS) {
      this.trigger('tick', [1, time]);
      this.lastFrameTime += DT_60FPS;
    }
  };

  stop() {
    window.cancelAnimationFrame(this.ticker);
  }

  resume() {
    this.ticker = window.requestAnimationFrame(this.tick);
    this.isResumed = true;
  }
}
