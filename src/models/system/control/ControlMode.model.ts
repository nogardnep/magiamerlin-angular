export enum ControlModeEnum {
  SongPart = 'Song part',
  SequencePlay = 'Sequence play',
  SequenceEdit = 'Sequence edit',
  PatternPlay = 'Pattern play',
  PatternEdit = 'Pattern edit',
  TrackPlay = 'Track play',
  TrackEdit = 'Track edit',
}

export class ControlMode {
  public name: string;

  constructor(public type: string) {
    this.name = ControlModeEnum[type];
  }
}
