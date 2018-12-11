import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ForgotpasswordFormService } from './forgotpassword-form.service';

xdescribe('ForgotpasswordFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [ForgotpasswordFormService, HttpClientTestingModule]
    });
  });

  it('should be created', inject([ForgotpasswordFormService], (service: ForgotpasswordFormService) => {
    expect(service).toBeTruthy();
  }));
});
