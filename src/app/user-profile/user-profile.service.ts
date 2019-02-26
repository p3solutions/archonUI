import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserProfileService {

  private messageSource = new BehaviorSubject('');
  userSelectedWorkspace = this.messageSource.asObservable();

  jwtHelper: JwtHelperService = new JwtHelperService();
  accessToken = localStorage.getItem('accessToken');
  token_data = this.jwtHelper.decodeToken(this.accessToken);

  private UserName = new BehaviorSubject(this.token_data.user.name);
  UserNamechange = this.UserName.asObservable();

  constructor() { }

  changeWorkspace(message) {
    this.messageSource.next(message);
  }

  changeUserName(message) {
    this.UserName.next(message);
  }

}
