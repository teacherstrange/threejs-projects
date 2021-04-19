import TWEEN from '@tweenjs/tween.js';

import EventEmitter from './EventEmitter';

const DT_60FPS = 1000 / 60;

export default class AppTime extends EventEmitter {
  ticker;
  time;
  delta;
  slowDownFactor;
  lastFrameTime;
  isResumed;
  then;
  now;
  elapsed;

  constructor() {
    super();
    this.isResumed = false;
    this.resume();
    this.tick = this.tick.bind(this);
  }

  tick = (time: number) => {
    this.ticker = window.requestAnimationFrame(this.tick);
    TWEEN.update(time);

    if (this.isResumed) {
      this.lastFrameTime = time;
      this.isResumed = false;
      return;
    }

    this.delta = time - this.lastFrameTime;
    this.lastFrameTime = time;
    this.slowDownFactor = Math.min(Math.max(this.delta / DT_60FPS, 1), 1);

    this.now = time;
    this.elapsed = this.now - this.then;
    this.then = this.now - (this.elapsed % DT_60FPS);

    if (this.elapsed > DT_60FPS) {
      this.then = this.now - (this.elapsed % DT_60FPS);
      this.trigger('tick', [this.slowDownFactor, time]);
    }
  };

  stop() {
    window.cancelAnimationFrame(this.ticker);
  }

  resume() {
    this.then = window.performance.now();
    this.ticker = window.requestAnimationFrame(this.tick);
    this.isResumed = true;
  }
}
