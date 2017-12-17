import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  constructor(private jwtHelper: JwtHelper) { }

  authenticateHelper(token: string) {
    console.log(this.jwtHelper.decodeToken(token));
  }
}
