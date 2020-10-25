import { Entity } from './Entity.model';
import { TimeSignature } from './TimeSignature.model';

export interface Sheet extends Entity {
  timeSignature: TimeSignature;
}
