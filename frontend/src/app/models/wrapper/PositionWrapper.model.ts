import { TimeSignature } from 'src/app/models/entity/TimeSignature.model';
import { Position } from 'src/app/models/entity/Position.model';

export class PositionWrapper {
  private position: Position;
  private timeSignature: TimeSignature;

  constructor(position: Position, timeSignature: TimeSignature) {
    this.position = position;
    this.timeSignature = timeSignature;
  }

  move(position: Position): void {
    if (position.tick !== undefined) {
      this.position.tick += position.tick;
    }

    if (this.position.tick >= this.timeSignature.step - 1) {
      console.log('STEP');
    }

    if (position.beat !== undefined) {
      this.position.beat += position.beat;
    }

    if (position.mesure !== undefined) {
      this.position.mesure += position.mesure;
    }
  }

  getPosition(): Position {
    return this.position;
  }

  isSameAs(position: Position): boolean {
    return (
      this.position.tick === position.tick &&
      this.position.beat === position.beat &&
      this.position.mesure === position.mesure
    );
  }
}
