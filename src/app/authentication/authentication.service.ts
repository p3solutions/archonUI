import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthenticationService {

  constructor(private jwtHelper: JwtHelperService) { }

  authenticateHelper(token: string) {
  }
}
