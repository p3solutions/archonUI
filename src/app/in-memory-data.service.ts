import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const info = { id: 11, username: 'deepak', role: 'Admin' };
    const credential =[ 
    {email : "chandru@platform3solutions.com",password : "chandru"},
    {email : "ashwin@platform3solutions.com",password : "chandru"}
    ]
    return { info , credential};
  }
}
