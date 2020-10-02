import { Injectable } from '@angular/core';

export type configuration = {
  trackNumber: number;
  patternNumber: number;
  sequenceNumber: number;
  bankNumber: number;
  songPartNumber: number;
  firstNum: 1;
};

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  constructor() {}

  getConfigurations(): configuration {
    return {
      firstNum: 1,
      trackNumber: 2,
      patternNumber: 2,
      sequenceNumber: 2,
      bankNumber: 2,
      songPartNumber: 2
    };
  }
}
