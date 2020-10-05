import { Howl } from 'howler';

export type Enveloppe = {
  attack: number;
  release: number;
};

export class SamplerVoice {
  private lastId: number = null;
  private lastHowl: Howl = null;
  private playing = false;
  private volume = 1;

  constructor(private src: string, private enveloppe: Enveloppe) {}

  play(): void {
    this.stop();
    this.playing = true;

    const newHowl = new Howl({
      volume: this.volume,
      src: [this.src],
      onend: () => {
        this.playing = false;
      },
    });

    this.lastId = newHowl.play();
    newHowl.fade(0, this.volume, this.enveloppe.attack, this.lastId);

    this.lastHowl = newHowl;
  }

  stop(): void {
    this.playing = false;

    if (this.lastId !== null) {
      this.lastHowl.fade(this.volume, 0, this.enveloppe.release, this.lastId);
    }
  }

  isPlaying(): boolean {
    return this.playing;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }
}
