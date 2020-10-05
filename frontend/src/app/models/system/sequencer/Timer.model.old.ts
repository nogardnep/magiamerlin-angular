import { SamplerVoice } from 'src/app/models/system/audio/SamplerVoice.model';
export class Timer {
  private interval: number;
  private timer: any; // TODO
  private counter: number;
  private action: () => void;
  private playing: boolean;
  private audio: SamplerVoice;
  private timestamp = new Date().getTime();

  constructor(interval: number, action: () => void) {
    this.action = action;
    this.interval = interval;

    this.init();

    this.audio = new SamplerVoice('assets/metronome/metronome-beat.wav', {
      attack: 0,
      release: 0,
    });

    this.audio.setVolume(0.2);
  }

  init(): void {
    this.playing = false;
    this.counter = 0;
  }

  start(): void {
    if (!this.playing) {
      this.playing = true;
      this.stop();
      this.run();
      // this.timer = setInterval(() => {
      //   this.tick();
      // }, this.interval);
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
    console.log(
      requestAnimationFrame((test) => {
        console.log(test);
      })
    );
    this.audio.play();
    this.action();
    this.counter++;
  }

  private run(): void {
    const now = new Date().getTime();

    if (now - this.timestamp >= 100) {
      console.log('tick');
      this.audio.play();
      this.timestamp = now;
    }

    setTimeout(() => {
      this.run();
    }, 10);
  }
}
