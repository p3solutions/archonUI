import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService, JwtModule} from '@auth0/angular-jwt';
export function tokenGetter() {
  return localStorage.getItem('accessToken');
}

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService, JwtHelperService],
      imports: [JwtModule.forRoot({
        config: {
                tokenGetter: tokenGetter
        }
})]
    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
