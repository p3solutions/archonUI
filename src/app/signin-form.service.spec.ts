import { TestBed, inject } from '@angular/core/testing';

import { SigninFormService } from './signin-form.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {HttpHandler,HttpClientModule} from '@angular/common/http';
describe('SigninFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SigninFormService,HttpClient,HttpHandler]
    });
  });

  it('should be created', inject([SigninFormService], (service: SigninFormService) => {
    expect(service).toBeTruthy();
  }));
});