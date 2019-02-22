import { TestBed, inject } from '@angular/core/testing';

import { AddDirectJoinService } from './add-direct-join.service';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddDirectJoinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [AddDirectJoinService, UserinfoService]
    });
  });

  it('should be created', inject([AddDirectJoinService], (service: AddDirectJoinService) => {
    expect(service).toBeTruthy();
  }));
});
