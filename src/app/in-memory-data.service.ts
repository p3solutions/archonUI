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
    const workspaceinfo = {
      name: 'Frontend Developer', owner: 'Platform3Solutions', approver: 'User1, User2',
      members: 'User1, User2, User3', your_role: 'Admin', master_metadata_version: '22'
    };
    const managemembers = [{ sl_no: '1', member: '2.0', role: 'need to be filled', },
    { sl_no: '2', member: '2.0', role: 'need to be filled' },
    { sl_no: '3', member: '2.0', role: 'need to be filled' },
    { sl_no: '4', member: '2.0', role: 'need to be filled' },
    { sl_no: '5', member: '2.0', role: 'need to be filled' }];
    const memberrequest = [
      { slNo: '1', masterVersion: '1.01', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 1' },
      { slNo: '2', masterVersion: '1.46', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 2' },
      { slNo: '3', masterVersion: '2.46', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 3' },
      { slNo: '4', masterVersion: '3.00', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 4' },
      { slNo: '5', masterVersion: '4.69', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 5' }
    ];
    const forgotpassword = { email: '' };
    const master_metadata = [
      { slNo: '1', version: '1.01', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
      { slNo: '2', version: '1.46', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
      { slNo: '3', version: '2.46', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
      { slNo: '4', version: '3.00', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
      { slNo: '5', version: '4.69', description: 'Null', createdDate: '20/11/2017 04.05 PM' }
    ];
    const manage_user_roles = [
      { slNo: '1', name: 'Archon Reloaded', email: 'archon@p3.com', lastActivityTime: '20/11/2017 04.05 PM', globalRole: 's/w engineer' },
      { slNo: '1', name: 'Archon Reloaded', email: 'archon@p3.com', lastActivityTime: '20/11/2017 04.05 PM', globalRole: 's/w engineer' },
      { slNo: '1', name: 'Archon Reloaded', email: 'archon@p3.com', lastActivityTime: '20/11/2017 04.05 PM', globalRole: 's/w engineer' },
      { slNo: '1', name: 'Archon Reloaded', email: 'archon@p3.com', lastActivityTime: '20/11/2017 04.05 PM', globalRole: 's/w engineer' }
    ];
    return {
      info,
      signin,
      forgotpassword,
      memberrequest,
      master_metadata,
      managemembers,
      workspaceinfo,
      currentWorkspace,
      workspaceList,
      userWorkspaces2,
      userWorkspaces,
      workspace2,
      workspace1,
      users,
      manage_user_roles
    };
  }
}
