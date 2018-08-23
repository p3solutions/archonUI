import { TestBed, inject } from '@angular/core/testing';

import { SignupFormService } from './signup-form.service';
import { HttpClientModule } from '@angular/common/http';

describe('SignupFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [SignupFormService]
    });
  });

  it('should be created', inject([SignupFormService], (service: SignupFormService) => {
    expect(service).toBeTruthy();
  }));
});
