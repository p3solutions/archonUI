import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserProfileService {

  private messageSource = new BehaviorSubject('');
  userSelectedWorkspace = this.messageSource.asObservable();

  constructor() { }

  changeWorkspace(message) {
    this.messageSource.next(message);
  }

}
