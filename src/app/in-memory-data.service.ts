import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'member' };
    const signin = { email: '', password: '' };
    const forgotpassword = { email: '' };
    const workspaceinfo = {
      name: 'Frontend Developer', owner: 'Platform3Solutions', approver: 'User1, User2',
      members: 'User1, User2, User3', your_role: 'Admin', master_metadata_version: '22'
    };
    const managemembers = [{ sl_no: '1', member: '2.0', role: 'need to be filled'},
    { sl_no: '2', member: '2.0', role: 'need to be filled' },
    { sl_no: '3', member: '2.0', role: 'need to be filled'},
    { sl_no: '4', member: '2.0', role: 'need to be filled'},
    { sl_no: '5', member: '2.0', role: 'need to be filled'}];
    return { info, signin, forgotpassword, workspaceinfo, managemembers };
  }
}
