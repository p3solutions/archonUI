import { TestBed } from '@angular/core/testing';

import { AdhocService } from './adhoc.service';

describe('AdhocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdhocService = TestBed.get(AdhocService);
    expect(service).toBeTruthy();
  });
});
