import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { JwtHelper } from 'angular2-jwt';

xdescribe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService, JwtHelper]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
