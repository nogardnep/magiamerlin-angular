import { Track } from './Track.model';
import { Event } from './Event.model';

export enum PatternEventActions {
  Empty = 0,
  Play = 1,
  Stop = 2,
}

export interface PatternEvent extends Event {
  action: PatternEventActions;
  trackNum: number;
  bankNum: number;
  parameters: {
    velocity: 1;
  };
}
