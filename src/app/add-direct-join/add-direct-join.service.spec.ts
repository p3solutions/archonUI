import { TestBed, inject } from '@angular/core/testing';

import { AddDirectJoinService } from './add-direct-join.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';

describe('AddDirectJoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddDirectJoinService, UserinfoService, HttpClient, HttpHandler, Router]
    });
  });

  xit('should be created', inject([AddDirectJoinService], (service: AddDirectJoinService) => {
    expect(service).toBeTruthy();
  }));
});
