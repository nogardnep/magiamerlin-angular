import { ParametersModel } from './../Parameter';
import { Entity } from './Entity.model';
import { Resource } from './Resource.model';

export enum Chunk {
  NoChunk = 0,
}

export const trackAudioParametersModel: ParametersModel = {
  voices: {
    name: 'Voices',
    min: 1,
    max: 10,
    default: 1,
  },
  chunk: {
    name: 'Chunk',
    min: 0,
    max: 10,
    default: Chunk.NoChunk,
    labels: [
      {
        value: Chunk.NoChunk,
        text: 'No chunk',
      },
    ],
  },
};

// TODO: force same keys as model
export type TrackAudioParameters = {
  voices: number;
  chunk: number;
};

export interface TrackAudio extends Entity {
  resource: Resource;
  parameters: TrackAudioParameters;
}
