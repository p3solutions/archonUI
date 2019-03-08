import { TestBed } from '@angular/core/testing';

import { AdhocScreenService } from './adhoc-screen.service';

describe('AdhocScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdhocScreenService = TestBed.get(AdhocScreenService);
    expect(service).toBeTruthy();
  });
});
