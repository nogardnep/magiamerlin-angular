import { TimeSignature } from './TimeSignature.model';
import { Entity } from './Entity.model';

export interface Position extends Entity {
  timeSignature: TimeSignature;
  mesure: number;
  beat: number;
  tick: number;
  currentTurn: number;
  maximumTurn: number;
}
