import { Entity } from './Entity.model';
import { Resource } from './Resource.model';

export interface TrackAudio extends Entity {
  resource: Resource;
  parameters: {
    voices: number;
  };
}
