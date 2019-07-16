import { TestBed } from '@angular/core/testing';

import { ResetpasswordService } from './resetpassword.service';

describe('ResetpasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetpasswordService = TestBed.get(ResetpasswordService);
    expect(service).toBeTruthy();
  });
});
