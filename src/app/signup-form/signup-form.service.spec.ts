import { TestBed, inject } from '@angular/core/testing';

import { SignupFormService } from './signup-form.service';

describe('SignupFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupFormService]
    });
  });

  it('should be created', inject([SignupFormService], (service: SignupFormService) => {
    expect(service).toBeTruthy();
  }));
});
