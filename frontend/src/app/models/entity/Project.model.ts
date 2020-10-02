import { SongPart } from './SongPart.model';
import { Entity } from './Entity.model';
import { Pattern } from './Pattern.model';
import { Sequence } from './Sequence.model';
import { Track } from './Track.model';

export interface Project extends Entity {
  name: string;
  category: string;
  patterns: Pattern[];
  sequences: Sequence[];
  tracks: Track[];
  songParts: SongPart[];
}
