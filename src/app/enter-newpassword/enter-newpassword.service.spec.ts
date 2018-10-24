import { TestBed, inject } from '@angular/core/testing';

import { EnterNewpasswordService } from './enter-newpassword.service';

describe('EnterNewpasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnterNewpasswordService]
    });
  });

  it('should be created', inject([EnterNewpasswordService], (service: EnterNewpasswordService) => {
    expect(service).toBeTruthy();
  }));
});
