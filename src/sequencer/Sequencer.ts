import { Sequencer as ISequencer } from 'src/sequencerAPI/Sequencer';

export class Sequencer implements ISequencer {
  play(): void {
    throw new Error('Method not implemented.');
  }
  pause(): void {
    throw new Error('Method not implemented.');
  }
  stop(): void {
    throw new Error('Method not implemented.');
  }
  moveOnStep(backward?: boolean): void {
    throw new Error('Method not implemented.');
  }
}
