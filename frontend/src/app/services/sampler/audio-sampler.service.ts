import { AudioService } from 'src/app/services/audio/audio.service';
import { Injectable } from '@angular/core';
import { Howler } from 'howler';
import { Track } from 'src/app/models/entity/Track.model';
import {
  Chunk,
  TrackAudio,
  TrackAudioParametersIndex,
  trackAudioParametersModel,
} from 'src/app/models/entity/TrackAudio.model';
import { ParameterValue } from 'src/app/models/Parameter';
import { SamplerVoice } from 'src/app/models/system/audio/SamplerVoice.model';
import { ResourcesDataService } from 'src/app/services/data/resources-data.service';
import { ParametersService } from 'src/app/services/parameters/parameters.service';

export type SamplerTrack = {
  track: Track;
  voices: SamplerVoice[];
  lastPlayedVoiceIndex: number;
};

@Injectable({
  providedIn: 'root',
})
export class AudioSamplerService {
  private masterVolume: number;
  private samplerTracks: SamplerTrack[];

  constructor(
    private resourcesDataService: ResourcesDataService,
    private parametersService: ParametersService,
    private audioService: AudioService
  ) {
    this.setMasterVolume(1);
  }

  initSamplerTracks(tracks: Track[]): void {
    this.samplerTracks = [];

    tracks.forEach((track: Track) => {
      this.samplerTracks.push({
        track,
        voices: [],
        lastPlayedVoiceIndex: null,
      });
    });

    tracks.forEach((track: Track) => {
      this.updateSamplerTrack(track);
    });
  }

  updateSamplerTrack(track: Track): void {
    if (track.audio && track.audio.resource) {
      const samplerTrack = this.getSamplerTrack(track.num, track.bank);

      samplerTrack.track = track;
      samplerTrack.lastPlayedVoiceIndex = null;
      samplerTrack.voices = [];

      const voicesNumber = this.getParameterFor(
        samplerTrack.track.audio,
        TrackAudioParametersIndex.Voices
      );

      for (let index = 0; index < voicesNumber; index++) {
        const src = this.resourcesDataService.getSrc(
          samplerTrack.track.audio.resource
        );
        const attack = this.getParameterFor(
          samplerTrack.track.audio,
          TrackAudioParametersIndex.Attack
        );
        const release = this.getParameterFor(
          samplerTrack.track.audio,
          TrackAudioParametersIndex.Release
        );

        samplerTrack.voices.push(
          new SamplerVoice(this.audioService, src, {
            attack,
            release,
          })
        );
      }
    }
  }

  playSamplerTrack(num: number, bank: number): void {
    const samplerTrack = this.getSamplerTrack(num, bank);

    if (samplerTrack.track !== null) {
      // TODO
      // const chunk = this.getParameterFor(
      //   samplerTrack.track.audio,
      //   TrackAudioParametersIndex.Chunk
      // );

      // if (chunk !== Chunk.NoChunk) {
      //   this.samplerTracks.forEach((otherSamplerTrack: SamplerTrack) => {
      //     if (
      //       samplerTrack.track.bank === otherSamplerTrack.track.bank &&
      //       samplerTrack.track.num !== otherSamplerTrack.track.num
      //     ) {
      //       const otherChunk = this.getParameterFor(
      //         otherSamplerTrack.track.audio,
      //         TrackAudioParametersIndex.Chunk
      //       );
      //       if (chunk === otherChunk) {
      //         this.stopSamplerTrack(otherSamplerTrack);
      //       }
      //     }
      //   });
      // }

      if (samplerTrack.voices.length > 0) {
        samplerTrack.voices[0].play();
        //   // this.playOnSamplerTrack(samplerTrack);

        //   let voiceIndex: number;
        //   if (samplerTrack.lastPlayedVoiceIndex !== null) {
        //     voiceIndex = samplerTrack.lastPlayedVoiceIndex + 1;
        //     if (samplerTrack.voices[voiceIndex] === undefined) {
        //       voiceIndex = 0;
        //     }
        //   } else {
        //     voiceIndex = 0;
        //   }
        //   samplerTrack.voices[voiceIndex].play();
        //   samplerTrack.lastPlayedVoiceIndex = voiceIndex;
      }
    }
  }

  stopAllSamplerTrack(): void {
    this.samplerTracks.forEach((samplerTrack: SamplerTrack) => {
      this.stopSamplerTrack(samplerTrack);
    });
  }

  stopSamplerTrack(samplerTrack: SamplerTrack): void {
    samplerTrack.voices.forEach((voice: SamplerVoice) => {
      voice.stop();
    });
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = volume;
    Howler.volume(volume);
  }

  getSamplerTrack(num: number, bank: number): SamplerTrack {
    let found: SamplerTrack = null;

    this.samplerTracks.forEach((samplerTrack: SamplerTrack) => {
      if (samplerTrack.track.bank === bank && samplerTrack.track.num === num) {
        found = samplerTrack;
      }
    });

    return found;
  }

  private getParameterFor(
    trackAudio: TrackAudio,
    key: TrackAudioParametersIndex
  ): ParameterValue {
    return this.parametersService.getParameter(
      trackAudio,
      trackAudioParametersModel,
      key
    );
  }
}
