import { TestBed } from '@angular/core/testing';

import { TrackPresetsManagerService } from './track-presets-manager.service';

describe('TrackPresetsManagerService', () => {
  let service: TrackPresetsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackPresetsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
