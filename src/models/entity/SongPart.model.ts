import { Entity } from './Entity.model';

export interface SongPart extends Entity {
  num: number;
  name: string;
  sequenceNum: number;
  repetitions: number;
}
