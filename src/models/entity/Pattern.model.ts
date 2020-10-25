import { ParametersModel } from 'src/models/Parameter';
import { PatternEvent } from './PatternEvent.model';
import { Sheet } from './Sheet.model';

export enum TriggerMode {
  OnTick = 0,
  OnBeat = 1,
  OnMesure = 2,
}

export const patternParametersModel: ParametersModel = {
  triggerMode: {
    name: 'Trigger mode',
    min: 0,
    max: (Object.keys(TriggerMode).length / 2) - 1,
    default: TriggerMode.OnBeat,
    labels: [
      {
        value: TriggerMode.OnTick,
        text: 'instantaneous',
      },
      {
        value: TriggerMode.OnBeat,
        text: 'on beat',
      },
      {
        value: TriggerMode.OnMesure,
        text: 'on mesure',
      },
    ],
  },
};

export interface Pattern extends Sheet {
  events: PatternEvent[];
  num: number;
  bank: number;
  name: string;
}
