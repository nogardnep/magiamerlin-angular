import { ParameterValue } from 'src/app/models/Parameter';
import { ParametersService } from 'src/app/services/parameters/parameters.service';
import { ResourcesDataService } from 'src/app/services/data/resources-data.service';
import { configuration } from 'src/app/config/config';
import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Resource } from 'src/app/models/entity/Resource.model';
import { Track } from 'src/app/models/entity/Track.model';
import { SamplerVoice } from 'src/app/models/system/audio/SamplerVoice.model';
import {
  TrackAudio,
  trackAudioParametersModel,
  Chunk,
  TrackAudioParametersIndex,
} from 'src/app/models/entity/TrackAudio.model';

// import { Audio } from 'src/app/models/entity/Audio.model';

export type SamplerTrack = {
  id: string;
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
    private parametersService: ParametersService
  ) {
    this.setMasterVolume(1);

    this.samplerTracks = [];

    for (
      let num = configuration.entities.firstNum;
      num <= configuration.entities.trackNumber;
      num++
    ) {
      const samplerTrack: SamplerTrack = {
        id: num.toString(),
        track: null,
        voices: [],
        lastPlayedVoiceIndex: null,
      };

      this.samplerTracks.push(samplerTrack);
    }
  }

  initSamplerTracks(tracks: Track[]): void {
    tracks.forEach((track: Track) => {
      this.updateSamplerTrack(track);
    });
  }

  updateSamplerTrack(track: Track): void {
    if (track.audio && track.audio.resource) {
      const samplerTrack = this.getSamplerTrack(track.num.toString());

      samplerTrack.track = track;
      samplerTrack.lastPlayedVoiceIndex = null;

      const sounds = [];
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

        sounds.push(
          new SamplerVoice(src, {
            attack,
            release,
          })
        );
      }

      samplerTrack.voices = sounds;
    }
  }

  playSamplerTrack(num: number): void {
    const samplerTrack = this.getSamplerTrack(num.toString());

    if (samplerTrack.track !== null) {
      const chunk = this.getParameterFor(
        samplerTrack.track.audio,
        TrackAudioParametersIndex.Chunk
      );
      if (chunk !== Chunk.NoChunk) {
        this.samplerTracks.forEach((otherSamplerTrack: SamplerTrack) => {
          if (
            samplerTrack.track.bank === otherSamplerTrack.track.bank &&
            samplerTrack.track.num !== otherSamplerTrack.track.num
          ) {
            const otherChunk = this.getParameterFor(
              otherSamplerTrack.track.audio,
              TrackAudioParametersIndex.Chunk
            );

            if (chunk === otherChunk) {
              this.stopSamplerTrack(otherSamplerTrack);
            }
          }
        });
      }

      if (samplerTrack.voices.length > 0) {
        // this.playOnSamplerTrack(samplerTrack);
        let voiceIndex: number;

        if (samplerTrack.lastPlayedVoiceIndex !== null) {
          voiceIndex = samplerTrack.lastPlayedVoiceIndex + 1;

          if (samplerTrack.voices[voiceIndex] === undefined) {
            voiceIndex = 0;
          }
        } else {
          voiceIndex = 0;
        }

        samplerTrack.voices[voiceIndex].play();
        samplerTrack.lastPlayedVoiceIndex = voiceIndex;
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

  getSamplerTrack(id: string): SamplerTrack {
    let found: SamplerTrack = null;

    this.samplerTracks.forEach((track: SamplerTrack) => {
      if (track.id === id) {
        found = track;
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
