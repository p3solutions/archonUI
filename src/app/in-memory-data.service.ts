import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'member' };
    const signin = { email: '', password: '' };
    const memberrequest = [
      { siNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'},
      { siNo : '2', masterVersion : '1.46', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 2'}
  ];
    const forgotpassword = { email: '' };
    return { info, signin, forgotpassword, memberrequest };
  }
}
