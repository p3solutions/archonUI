import { TestBed, inject, fakeAsync, flushMicrotasks, tick,async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangePasswordService } from './change-password.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Response, ResponseOptions, XHRBackend } from '@angular/http';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ChangePasswordService', () => {
  let backend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: MockBackend, useClass: MockBackend },
        { provide: XHRBackend, useExisting: MockBackend },
        ChangePasswordService,
        JwtHelperService,
        HttpClientModule,
        UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }
      ]
    });
    backend = TestBed.get(MockBackend);
    spyOn(HttpClient.prototype, 'request').and.callThrough();
  });
  afterEach(() => backend.verifyNoPendingRequests());

  it('should be created', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));

  it(`should passwordParam object should be same as passed in service`, fakeAsync(inject([ChangePasswordService, MockBackend],
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
