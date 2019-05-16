import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SigninFormService } from './signin-form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('SigninFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        SigninFormService,
        HttpClientTestingModule, { provide: EnvironmentService, useClass: MockEnvironmentService }
      ]
    });
  });

  it('should be created', inject([SigninFormService], (service: SigninFormService) => {
    expect(service).toBeTruthy();
  }));
});
