import { TestBed } from '@angular/core/testing';

import { TrackPresetsDataService } from './track-presets-data.service';

describe('TrackPresetsDataService', () => {
  let service: TrackPresetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackPresetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
