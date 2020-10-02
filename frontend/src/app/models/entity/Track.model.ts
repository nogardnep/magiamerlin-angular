import { TrackVideo } from './TrackVideo.model';
import { TrackMidi } from './TrackMidi.model';
import { TrackAudio } from './TrackAudio.model';

import { Entity } from './Entity.model';

export interface Track extends Entity {
  num: number;
  bank: number;
  name: string;
  audio: TrackAudio;
  video: TrackVideo;
  midi: TrackMidi;
}
