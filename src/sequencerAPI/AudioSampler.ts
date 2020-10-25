import { Track } from 'src/models/entity/Track.model';
export interface AudioSampler {
  playTrack(num: number, bank: number): void;
  updateTrack(track: Track): void;
  stopTrack(num: number, bank: number): void;
  getTrack(num: number, bank: number): void;
}
