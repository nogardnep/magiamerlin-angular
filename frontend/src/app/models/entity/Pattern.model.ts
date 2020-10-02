import { PatternEvent } from './PatternEvent.model';
import { Sheet } from './Sheet.model';

export interface Pattern extends Sheet {
  events: PatternEvent[];
  num: number;
  bank: number;
  name: string;
}
