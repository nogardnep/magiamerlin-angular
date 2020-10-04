import { configuration } from 'src/app/config/config';
import { TimeSignature } from 'src/app/models/entity/TimeSignature.model';
import { Position } from 'src/app/models/entity/Position.model';

export class PositionWrapper {
  constructor(
    private position: Position,
    private timeSignature?: TimeSignature
  ) {}

  initPosition(): void {
    this.position.tick = 0;
    this.position.beat = 0;
    this.position.mesure = 0;
    this.position.turn = 0;
  }

  onTick(): boolean {
    return true;
  }

  onBeat(): boolean {
    return this.position.tick === 0;
  }

  onMesure(): boolean {
    return this.position.beat === 0;
  }

  onTurn(): boolean {
    return this.position.mesure === 0;
  }

  onEnd(): boolean {
    return (
      this.position.tick >= configuration.sequencer.tickNumber - 1 &&
      this.position.beat >= this.timeSignature.beat - 1 &&
      this.position.mesure >= this.timeSignature.mesure - 1
    );
  }

  move(progression?: Position): void {
    // TODO: restore complex behaviour

    this.position.tick += progression.tick;

    if (this.position.tick < 0) {
      this.position.tick = configuration.sequencer.tickNumber - 1;
      this.position.beat--;
    } else if (this.position.tick === configuration.sequencer.tickNumber) {
      this.position.tick = 0;
      this.position.beat++;
    }

    if (this.position.beat < 0) {
      this.position.beat = this.timeSignature.beat - 1;
      this.position.mesure--;
    } else if (this.position.beat === this.timeSignature.beat) {
      this.position.beat = 0;
      this.position.mesure++;
    }

    if (this.position.mesure < 0) {
      this.position.mesure = this.timeSignature.mesure - 1;
      this.position.turn--;
    } else if (this.position.mesure === this.timeSignature.mesure) {
      this.position.mesure = 0;
      this.position.turn++;
    }

    // TODO: do not works moving backward
    // TODO: do not works

    // if (progression.tick === undefined) {
    //   progression.tick = 0;
    // }

    // if (progression.beat === undefined) {
    //   progression.beat = 0;
    // }

    // if (progression.mesure === undefined) {
    //   progression.mesure = 0;
    // }

    // progression.tick += this.position.tick;
    // const beatToAdd = Math.ceil(
    //   (progression.tick - (configuration.sequencer.tickNumber - 1)) /
    //     configuration.sequencer.tickNumber
    // );

    // progression.beat += this.position.beat + beatToAdd;
    // const mesureToAdd = Math.ceil(
    //   (progression.beat - (this.timeSignature.beat - 1)) /
    //     this.timeSignature.beat
    // );

    // progression.mesure += this.position.mesure + mesureToAdd;
    // const turnToAdd = Math.ceil(
    //   (progression.mesure - (this.timeSignature.mesure - 1)) /
    //     this.timeSignature.mesure
    // );

    // if (progression.tick >= 0) {
    //   this.position.tick =
    //     progression.tick % configuration.sequencer.tickNumber;
    // } else {
    //   this.position.tick =
    //     (configuration.sequencer.tickNumber + progression.tick) %
    //     configuration.sequencer.tickNumber;
    // }

    // if (progression.beat >= 0) {
    //   this.position.beat = progression.beat % this.timeSignature.beat;
    // } else {
    //   this.position.beat =
    //     (this.timeSignature.beat + progression.beat) % this.timeSignature.beat;
    // }

    // if (progression.mesure >= 0) {
    //   this.position.mesure = progression.mesure % this.timeSignature.mesure;
    // } else {
    //   this.position.mesure =
    //     (this.timeSignature.mesure + progression.mesure) %
    //     this.timeSignature.mesure;
    // }

    // this.position.turn += turnToAdd;
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
