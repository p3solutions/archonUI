import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'Admin'};
    const signin = { email: '', password: '' };
    const forgotpassword = { email: '' };

    const workspace1 = {
      id: 1,
      masterMetaVersion: 22,
      members: 22,
      name: 'Sample WS Name',
      role: 'admin',
      users: [11, 13] // user-ids --> info.id
    };
    const workspace2 = {
      id: 2,
      masterMetaVersion: 23,
      members: 20,
      name: 'Sample 2',
      role: 'member',
      users: [11, 12, 13] // user-ids --> info.id
    };
    const userWorkspaces = [
        workspace1,
        workspace2,
        workspace1,
        workspace2
      ];
    const workspaceList = {
      11: userWorkspaces,
      12: userWorkspaces
    };
    const currentWorkspace = workspace1;
    return { info, signin, forgotpassword, workspaceList, currentWorkspace };
  }
}
