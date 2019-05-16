import { TestBed, inject } from '@angular/core/testing';

import { SignupFormService } from './signup-form.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('SignupFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [SignupFormService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    });
  });

  it('should be created', inject([SignupFormService], (service: SignupFormService) => {
    expect(service).toBeTruthy();
  }));
});
