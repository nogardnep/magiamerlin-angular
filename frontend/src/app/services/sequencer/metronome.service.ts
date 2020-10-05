import { AudioService } from 'src/app/services/audio/audio.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetronomeService {
  beatSoundBuffer: AudioBuffer; // TODO
  mesureSoundBuffer: AudioBuffer; // TODO
  muted = false;

  constructor(private audioService: AudioService) {}

  loadSounds(): void {
    this.audioService.load(
      'assets/metronome/metronome-beat.wav',
      (buffer: AudioBuffer) => {
        this.beatSoundBuffer = buffer;
      }
    );

    this.audioService.load(
      'assets/metronome/metronome-mesure.wav',
      (buffer: AudioBuffer) => {
        this.mesureSoundBuffer = buffer;
      }
    );
  }

  playBeatSound(): void {
    if (!this.muted) {
      this.audioService.play(this.beatSoundBuffer);
      // this.playNote();
    }
  }

  playMesureSound(): void {
    if (!this.muted) {
      // this.playNote();
      this.audioService.play(this.mesureSoundBuffer);
    }
  }

  private playNote(): void {
    const context = this.audioService.getAudioContext();
    const oscillator = context.createOscillator();
    oscillator.frequency.value = 200;

    oscillator.connect(context.destination);

    oscillator.start(0);

    setTimeout(() => {
      oscillator.stop();
    }, 100);
  }
}
