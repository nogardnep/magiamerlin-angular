import { Entity } from './Entity.model';
import { Track } from './Track.model';

export interface TrackPreset extends Entity {
  name: string;
  tracks: Track[];
}
