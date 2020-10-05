import { AudioService } from 'src/app/services/audio/audio.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MetronomeService {
  beatSoundBuffer: AudioBuffer; // TODO
  mesureSoundBuffer: AudioBuffer; // TODO
  muted = true;

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
    }
  }

  playMesureSound(): void {
    if (!this.muted) {
      this.audioService.play(this.mesureSoundBuffer);
    }
  }
}
