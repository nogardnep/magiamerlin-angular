import { TestBed } from '@angular/core/testing';

import { SpecialActionsService } from './special-actions.service';

describe('SpecialActionsService', () => {
  let service: SpecialActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
