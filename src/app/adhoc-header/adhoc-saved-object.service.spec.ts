import { TestBed } from '@angular/core/testing';

import { AdhocSavedObjectService } from './adhoc-saved-object.service';

describe('AdhocSavedObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdhocSavedObjectService = TestBed.get(AdhocSavedObjectService);
    expect(service).toBeTruthy();
  });
});
