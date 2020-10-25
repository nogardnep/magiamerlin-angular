import { ParametersModel } from 'src/models/Parameter';
import { Sheet } from './Sheet.model';




export const sequenceParametersModel: ParametersModel = {
  bpm: {
    name: 'BPM',
    min: 20,
    max: 500,
    default: 120,
  }
};

export interface Sequence extends Sheet {
  num: number;
  name: string;
}
