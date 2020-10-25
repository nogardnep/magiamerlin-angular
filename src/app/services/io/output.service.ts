import { AudioSampler } from 'src/sequencer/AudioSampler';
import { Sequencer } from 'src/sequencer/Sequencer';
import { AudioSampler as IAudioSampler } from 'src/sequencerAPI/AudioSampler';
import { Sequencer as ISequencer } from 'src/sequencerAPI/Sequencer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OutputService {
  sequencer: ISequencer;
  audioSampler: IAudioSampler;

  constructor() {
    this.sequencer = new Sequencer();
    this.audioSampler = new AudioSampler();
  }

  // sendMessage(message: string): void {
  //   console.log(message);
  // }

  // getSequencer(): Sequencer {
  //   return this.sequencer;
  // }

  // getAudioSampler(): AudioSampler {
  //   return this.audioSampler;
  // }
}
