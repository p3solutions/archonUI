import { TestBed, inject } from '@angular/core/testing';

import { SigninFormService } from './signin-form.service';

xdescribe('SigninFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninFormService]
    });
  });

  it('should be created', inject([SigninFormService], (service: SigninFormService) => {
    expect(service).toBeTruthy();
  }));
});
