import { TimeoutError } from 'rxjs';

export class Metronome {
  private interval: number;
  private timer: any; // TODO
  private counter: number;
  private action: () => void;
  private playing: boolean;

  constructor(interval = 500, action: () => void) {
    this.action = action;
    this.interval = interval;
  }

  start(): void {
    if (!this.playing) {
      this.playing = true;
      stop();
      this.tick();
    }
  }

  stop(): void {
    if (this.playing) {
      this.playing = false;
      this.counter = 0;

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }
  }

  setInterval(interval: number): void {
    this.interval = interval;
  }

  private tick(): void {
    this.action();
    this.counter++;

    this.timer = setTimeout(() => {
      this.tick();
    }, this.interval);
  }
}
