import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SigninFormService } from './signin-form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('SigninFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        SigninFormService,
        HttpClientTestingModule
      ]
    });
  });

  it('should be cre ated', inject([SigninFormService], (service: SigninFormService) => {
    expect(service).toBeTruthy();
  }));
});
