import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'member' };
    const signin = { email: '', password: '' };
    const forgotpassword = { email: '' };
    return { info, signin, forgotpassword };
  }
}
