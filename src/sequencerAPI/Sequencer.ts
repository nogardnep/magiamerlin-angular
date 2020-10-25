export interface Sequencer {
  play(): void;
  pause(): void;
  stop(): void;
  moveOnStep(backward?: boolean): void;
}
