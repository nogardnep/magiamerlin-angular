import { Injectable } from '@angular/core';
import { Howl, Howler } from 'howler';
import { Resource } from 'src/app/models/entity/Resource.model';
import { Track } from 'src/app/models/entity/Track.model';
import { Audio as SamplerAudio } from 'src/app/models/system/audio/Audio.model';
import { TrackAudio as EntityAudio } from 'src/app/models/entity/TrackAudio.model';

// import { Audio } from 'src/app/models/entity/Audio.model';

type Sound = {
  // audio: Audio;
  sound: Howl;
  id: number;
  playing: boolean;
};

export type SamplerTrack = {
  id: string;
  entity: EntityAudio;
  sounds: Sound[];
};

@Injectable({
  providedIn: 'root',
})
export class AudioSamplerService {
  private masterVolume: number;
  private samplerTracks: SamplerTrack[];

  constructor() {
    this.setMasterVolume(1);

    this.samplerTracks = [];

    for (let i = 0; i < 16; i++) {
      const samplerTrack = {
        id: i.toString(),
        entity: null,
        sounds: [],
      };

      this.samplerTracks.push(samplerTrack);
    }
  }

  initTracks(tracks: Track[]): void {
    tracks.forEach((track: Track) => {
      this.updateTrack(track);
    });
  }

  updateTrack(track: Track): void {
    if (track.audio && track.audio.resource) {
      this.samplerTracks[track.num].entity = track.audio;
    }
  }

  playTrack(num: number): void {
    const samplerTrack = this.samplerTracks[num];

    if (samplerTrack.entity !== null) {
      if (samplerTrack.entity.parameters.voices === 0) {
        if (samplerTrack.sounds.length > 0) {
          this.stopSoundsOnTrack(samplerTrack);
        }
        this.playOnTrack(samplerTrack, false);
      } else {
        if (
          samplerTrack.sounds.length <= samplerTrack.entity.parameters.voices
        ) {
          this.playOnTrack(samplerTrack, false);
        }
      }
    }
  }

  getSoundPath(resource: Resource): string {
    // TODO
    return null;
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = volume;
    Howler.volume(volume);
  }

  getTrack(id: string): SamplerTrack {
    let found: SamplerTrack = null;

    this.samplerTracks.forEach((track: SamplerTrack) => {
      if (track.id === id) {
        found = track;
      }
    });

    return found;
  }

  playOnTrack(samplerTrack: SamplerTrack, loop?: boolean): void {
    const sound = new Howl({
      src: [this.getSoundPath(samplerTrack.entity.resource)],
      volume: 1,
      loop: loop != null ? loop : false,
      onend: (num: number) => {
        if (!loop) {
          samplerTrack.sounds.forEach((value: Sound, index: number) => {
            if (value.id === num) {
              samplerTrack.sounds.splice(index, 1);
            }
          });
        }
      },
    });

    const id = sound.play();
    // sound.fade(0, 1, 100, id);
    samplerTrack.sounds.push({
      //audio , // TODO
      sound,
      id,
      playing: true,
    });
  }

  stopSoundsOnTrack(samplerTrack: SamplerTrack): void {
    samplerTrack.sounds.forEach((item: Sound) => {
      if (item.playing) {
        item.playing = false;
        item.sound.fade(1, 0, 100, item.id);
      }
    });
  }

  playSimpleAudio(audio: SamplerAudio): void {
    const sound = new Howl({
      src: this.makeSrc(audio),
      volume: audio.getVolume(),
      loop: false,
    });

    sound.play();
  }

  private makeSrc(audio: SamplerAudio): string[] {
    const src = [];

    audio.getExtensions().forEach((extension: string) => {
      src.push(audio.getName() + '.' + extension);
    });

    return src;
  }
}
