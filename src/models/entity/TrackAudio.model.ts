import { configuration } from 'src/app/config/config';
import { ParametersModel } from '../Parameter';
import { Entity } from './Entity.model';
import { Resource } from './Resource.model';

export enum Chunk {
  NoChunk = 0,
}

export enum TrackAudioParametersIndex {
  Voices = 'voices',
  Fadein = 'fadin',
  Chunk = 'chunk',
  Release = 'release',
  Attack = 'attack',
}

export const trackAudioParametersModel: ParametersModel = {
  chunk: {
    name: 'Chunk',
    min: 0,
    max: configuration.entities.trackNumber,
    default: Chunk.NoChunk,
    labels: [
      {
        value: Chunk.NoChunk,
        text: 'No chunk',
      },
    ],
  },
  voices: {
    name: 'Voices',
    min: 1,
    max: 10,
    default: 1,
  },
  release: {
    name: 'Release',
    min: 0,
    max: 10000,
    default: 0,
  },
  attack: {
    name: 'Attack',
    min: 0,
    max: 10000,
    default: 0,
  },
};

export interface TrackAudio extends Entity {
  resource: Resource;
}
