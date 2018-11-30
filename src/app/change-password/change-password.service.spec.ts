import { TestBed, inject, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';

import { ChangePasswordService } from './change-password.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { JwtHelper } from 'angular2-jwt';
import { HttpClient, Response, ResponseOptions, XHRBackend } from '@angular/http';

describe('ChangePasswordService', () => {
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: MockBackend, useClass: MockBackend },
        { provide: XHRBackend, useExisting: MockBackend },
        ChangePasswordService,
        JwtHelper,
        HttpClientModule
      ]
    });
    backend = TestBed.get(MockBackend);
    spyOn(HttpClient.prototype, 'request').and.callThrough();
  });
  afterEach(() => backend.verifyNoPendingRequests());

  it('should be created', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));

  it(`should passwordParam object should be same as passed in service`, fakeAsync(inject([ ChangePasswordService, MockBackend ],
    (service: ChangePasswordService, mockBackend: MockBackend) => {
      // prepare fake response from `MockBackend`
      mockBackend.connections.subscribe((c: MockConnection) => {
        // respond to `ChangePasswordService` with a 200 Ok
        c.mockRespond(new Response(<ResponseOptions>{
          body: '',
          status: 200
        }));
      });
      const passwordParam = {
        oldPassword: 123456,
        newPassword: 123456,
        confirmPassword: 123456
      };
      expect(service.passwordParam).toBeUndefined();
      tick();
      // dispatch the http request
      service.changePassword(passwordParam);
        // ensure that `ChangePasswordService` respond data with success
      expect(service.passwordParam).toEqual(passwordParam);
      flushMicrotasks();
  })));
});
