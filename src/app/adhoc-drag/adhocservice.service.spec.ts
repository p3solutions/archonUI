import { TestBed } from '@angular/core/testing';

import { AdhocserviceService } from './adhocservice.service';

describe('AdhocserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdhocserviceService = TestBed.get(AdhocserviceService);
    expect(service).toBeTruthy();
  });
});
