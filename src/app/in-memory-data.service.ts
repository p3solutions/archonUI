import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'Admin' };
    const signin = { email: '', password: '' };
    const forgotpassword = { email: '' };

    const workspace1 = {
      name: 'Sample workspace',
      members: 22,
      masterMetaVersion: 22
    };
    const workspace2 = {
      name: 'Sample 2',
      members: 20,
      masterMetaVersion: 23
    };
    const userWorkspaceArray = [
      workspace1,
      workspace2,
      workspace1,
      workspace2
    ];

    return { info, signin, forgotpassword, userWorkspaceArray };
  }
}
