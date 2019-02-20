import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserProfileService {

  private messageSource = new BehaviorSubject('');
  userSelectedWorkspace = this.messageSource.asObservable();

  private UserName = new BehaviorSubject('');
  UserNamechange = this.UserName.asObservable();

  constructor() { }

  changeWorkspace(message) {
    this.messageSource.next(message);
  }

  changeUserName(message) {
    this.UserName.next(message);
  }

}
