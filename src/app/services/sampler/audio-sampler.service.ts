import { SamplerTrack } from './../../../sequencer/AudioSampler';
import { OutputService } from 'src/app/services/io/output.service';
import { Injectable } from '@angular/core';
import { Track } from 'src/models/entity/Track.model';
import {
  Chunk,
  TrackAudio,
  TrackAudioParametersIndex,
  trackAudioParametersModel,
} from 'src/models/entity/TrackAudio.model';
import { ParameterValue } from 'src/models/Parameter';
import { ResourcesDataService } from 'src/app/services/data/resources-data.service';
import { ParametersService } from 'src/app/services/parameters/parameters.service';


@Injectable({
  providedIn: 'root',
})
export class AudioSamplerService {
  constructor(
    private resourcesDataService: ResourcesDataService,
    private parametersService: ParametersService,
    private outputService: OutputService
  ) {}

  initSamplerTracks(tracks: Track[]): void {
    // this.samplerTracks = [];
    // tracks.forEach((track: Track) => {
    //   this.samplerTracks.push({
    //     track,
    //     voices: [],
    //     lastPlayedVoiceIndex: null,
    //   });
    // });
    // tracks.forEach((track: Track) => {
    //   this.updateSamplerTrack(track);
    // });
  }

  updateTrack(track: Track): void {
    // this.outputService.getAudioSampler().updateTrack(track);

    // if (track.audio && track.audio.resource) {
    //   const samplerTrack = this.getSamplerTrack(track.num, track.bank);
    //   samplerTrack.track = track;
    //   samplerTrack.lastPlayedVoiceIndex = null;
    //   samplerTrack.voices = [];
    //   const voicesNumber = this.getParameterFor(
    //     samplerTrack.track.audio,
    //     TrackAudioParametersIndex.Voices
    //   );
    //   for (let index = 0; index < voicesNumber; index++) {
    //     const src = this.resourcesDataService.getSrc(
    //       samplerTrack.track.audio.resource
    //     );
    //     const attack = this.getParameterFor(
    //       samplerTrack.track.audio,
    //       TrackAudioParametersIndex.Attack
    //     );
    //     const release = this.getParameterFor(
    //       samplerTrack.track.audio,
    //       TrackAudioParametersIndex.Release
    //     );
    //     samplerTrack.voices.push(
    //       new SamplerVoice(this.audioService, src, {
    //         attack,
    //         release,
    //       })
    //     );
    //   }
    // }
  }

  playTrack(num: number, bank: number): void {
    // this.outputService.getAudioSampler().playTrack(num, bank);

    // TODO
    // const samplerTrack = this.getSamplerTrack(num, bank);

    // if (samplerTrack.track !== null) {

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

    // if (samplerTrack.voices.length > 0) {
    //   samplerTrack.voices[0].play();
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
    // }
    // }
  }

  stopAllTrack(): void {
    // this.samplerTracks.forEach((samplerTrack: SamplerTrack) => {
    //   this.stopSamplerTrack(samplerTrack);
    // });
  }

  stopTrack(samplerTrack: SamplerTrack): void {
    // samplerTrack.voices.forEach((voice: SamplerVoice) => {
    //   voice.stop();
    // });
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
