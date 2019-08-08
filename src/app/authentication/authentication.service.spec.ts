import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
export function tokenGetter() {
  const userId = sessionStorage.getItem('userId');
  return localStorage.getItem(userId);
}

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService, JwtHelperService, { provide: EnvironmentService, useClass: MockEnvironmentService }],
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
