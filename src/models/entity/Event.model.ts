import { Entity } from './Entity.model';
import { Position } from './Position.model';

export interface Event extends Entity {
  position: Position;
}
