import { AudioService } from 'src/app/services/audio/audio.service';
export type Enveloppe = {
  attack: number;
  release: number;
};

export class SamplerVoice {
  private playing = false;
  private volume = 1;
  private buffer: AudioBuffer = null;
  private lastSource: AudioBufferSourceNode = null;

  constructor(
    private audioService: AudioService,
    private src: string,
    private enveloppe: Enveloppe
  ) {
    this.audioService.load(src, (buffer: AudioBuffer) => {
      this.buffer = buffer;
    });
  }

  play(): void {
    console.log('PLAy');
    this.stop();
    this.playing = true;

    if (this.buffer !== null) {
      this.lastSource = this.audioService.getSourceFor(this.buffer);
      this.lastSource.start();
    }
  }

  stop(): void {
    if (this.lastSource !== null) {
      this.lastSource.stop();
    }

    this.playing = false;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  setVolume(volume: number): void {
    this.volume = volume;
  }
}
