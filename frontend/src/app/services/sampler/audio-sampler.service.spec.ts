import { TestBed } from '@angular/core/testing';

import { AudioSamplerService } from './audio-sampler.service';

describe('AudioSamplerService', () => {
  let service: AudioSamplerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioSamplerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
