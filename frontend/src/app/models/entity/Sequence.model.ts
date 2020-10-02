import { Sheet } from './Sheet.model';

export interface Sequence extends Sheet {
  num: number;

  parameters: {
    bpm: number;
  };
}
