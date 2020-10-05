import { configuration } from 'src/app/config/config';
export class Timer {
  audioContext = null;
  lookahead = 25; // How frequently to call scheduling function (in milliseconds)
  scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  nextNoteTime = 0.0; // when the next note is due
  isRunning = false;
  intervalID = null;

  constructor(private tempo = 120, private action: () => void) {
    this.audioContext = new window.AudioContext();
  }

  nextNote(): void {
    const secondsPerBeat =
      60.0 / this.tempo / configuration.sequencer.ticksByBeat;
    this.nextNoteTime += secondsPerBeat;
  }

  scheduler(): void {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.nextNote();
      this.action();
    }
  }

  start(): void {
    if (this.isRunning) {
      return;
    }

    // if (this.audioContext == null) {
    //   this.audioContext = new window.AudioContext();
    // }

    this.isRunning = true;

    this.nextNoteTime = this.audioContext.currentTime + 0.05;

    this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
  }

  stop(): void {
    this.isRunning = false;

    clearInterval(this.intervalID);
  }

  startStop(): void {
    if (this.isRunning) {
      this.stop();
    } else {
      this.start();
    }
  }

  init(): void {}

  setInterval(interval: number): void {}
}
