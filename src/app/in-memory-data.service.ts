import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'member' };
    const signin = { email: '', password: '' };
    const memberrequest = [
      { slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'},
      { slNo : '2', masterVersion : '1.46', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 2'},
      { slNo : '3', masterVersion : '2.46', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 3'},
      { slNo : '4', masterVersion : '3.00', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 4'},
      { slNo : '5', masterVersion : '4.69', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 5'}
  ];
    const forgotpassword = { email: '' };
    return { info, signin, forgotpassword, memberrequest };
  }
}
