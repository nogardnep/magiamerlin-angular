export class Metronome {
  private interval: number;
  private timer: any; // TODO
  private counter: number;
  private action: () => void;
  private playing: boolean;

  constructor(interval: number, action: () => void) {
    this.action = action;
    this.interval = interval;

    this.init();
  }

  init(): void {
    this.playing = false;
    this.counter = 0;
  }

  start(): void {
    if (!this.playing) {
      this.playing = true;
      stop();
      this.timer = setInterval(() => {
        this.tick();
      }, this.interval);
    }
  }

  stop(): void {
    if (this.playing) {
      this.init();

      clearInterval(this.timer);
    }
  }

  setInterval(interval: number): void {
    this.interval = interval;
  }

  private tick(): void {
    this.action();
    this.counter++;
  }
}
