import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class UserProfileService {

  private messageSource = new BehaviorSubject('');
  userSelectedWorkspace = this.messageSource.asObservable();
  userID = sessionStorage.getItem('userId');
  jwtHelper: JwtHelperService = new JwtHelperService();
  accessToken = localStorage.getItem(this.userID);
  token_data = this.jwtHelper.decodeToken(this.accessToken);

  private UserName = new BehaviorSubject(this.token_data.user.firstName + ' ' + this.token_data.user.lastName);
  UserNamechange = this.UserName.asObservable();

  constructor() { }

  changeWorkspace(message) {
    this.messageSource.next(message);
  }

  changeUserName(message) {
    this.UserName.next(message);
  }

}
