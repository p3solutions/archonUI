import { TestBed } from '@angular/core/testing';

import { ErtService } from './ert.service';

describe('ErtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErtService = TestBed.get(ErtService);
    expect(service).toBeTruthy();
  });
});
