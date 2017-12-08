import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'member' };
    const signin = { email: '', password: '' };
    const forgotpassword = { email: '' };
    const workspaceinfo = { name: 'Frontend Developer', owner: 'Platform3Solutions', approver: 'User1, User2',
    members: 'User1, User2, User3', your_role: 'Admin', master_metadata_version: '22'};
    return { info, signin, forgotpassword, workspaceinfo };
  }
}
