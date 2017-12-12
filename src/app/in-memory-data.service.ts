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
    const managemembers = [{ sl_no: '1', version: '2.0', description: 'need to be filled', created_date: '12/12/2017' },
    { sl_no: '2', version: '2.0', description: 'need to be filled', created_date: '12/12/2017' },
    { sl_no: '3', version: '2.0', description: 'need to be filled', created_date: '12/12/2017' }];
    return { info, signin, forgotpassword, workspaceinfo, managemembers };
  }
}
