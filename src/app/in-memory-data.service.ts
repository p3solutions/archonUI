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
    return { info, signin, forgotpassword };
  }
}
