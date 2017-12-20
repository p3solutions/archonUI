import { TestBed, inject } from '@angular/core/testing';

import { ForgotpasswordFormService } from './forgotpassword-form.service';

describe('ForgotpasswordFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotpasswordFormService]
    });
  });

  it('should be created', inject([ForgotpasswordFormService], (service: ForgotpasswordFormService) => {
    expect(service).toBeTruthy();
  }));
});
