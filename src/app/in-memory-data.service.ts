import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo) {
    const info = { id: 11, username: 'deepak', role: 'Admin' };
    const signin = { email: '', password: '' };
    const users = [
      { email: 'sai@p3.com', password: 'password-1' },
      { email: 'sai2@p3.com', password: 'password-1' },
      { email: 'sai3@p3.com', password: 'password-1' },
    ];
    if (reqInfo) {
      const signin_info = reqInfo.utils.getJsonBody(reqInfo.req) || {};
      console.log(signin_info);
    }
    const forgotpassword = { email: '' };

    const workspace1 = {
      id: 123,
      masterMetaVersion: 22,
      members: 22,
      name: 'Sample WS Name',
      role: 'Admin', // need to remove this & use userRole instead
      users: [11, 13] // user-ids --> info.id
    };
    const workspace2 = {
      id: 234,
      masterMetaVersion: 23,
      members: 20,
      name: 'Sample 2',
      role: 'Member',
      users: [11, 12, 13] // user-ids --> info.id
    };
    const userWorkspaces = [
        workspace1,
        workspace2,
        workspace1,
        workspace2
      ];
    const userWorkspaces2 = [
      workspace2,
      workspace1,
      workspace1
    ];
    const workspaceList = {
      11: userWorkspaces,
      12: userWorkspaces2
    };
    const currentWorkspace = workspace1;
    return { info, signin, forgotpassword, workspaceList, currentWorkspace };
  }
}
