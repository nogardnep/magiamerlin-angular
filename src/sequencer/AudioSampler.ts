import { SamplerVoice } from 'src/models/system/audio/SamplerVoice.model';
import { Track } from 'src/models/entity/Track.model';
import { AudioSampler as IAudioSampler } from 'src/sequencerAPI/AudioSampler';

export type SamplerTrack = {
  track: Track;
  voices: SamplerVoice[];
  lastPlayedVoiceIndex: number;
};

export class AudioSampler implements IAudioSampler {
  private samplerTracks: SamplerTrack[];

  updateTrack(track: Track): void {}

  playTrack(num: number, bank: number): void {
    throw new Error('Method not implemented.');
  }

  stopTrack(num: number, bank: number): void {}

  getTrack(num: number, bank: number): SamplerTrack {
    let found: SamplerTrack = null;
    this.samplerTracks.forEach((samplerTrack: SamplerTrack) => {
      if (samplerTrack.track.bank === bank && samplerTrack.track.num === num) {
        found = samplerTrack;
      }
    });
    return found;
  }
}
