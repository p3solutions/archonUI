import { TestBed, inject, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { ChangeUserRoleService } from './change-user-role.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { XHRBackend, HttpClient, ResponseOptions, Response } from '@angular/http';

describe('ChangeUserRoleService', () => {
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
        ChangeUserRoleService,
        HttpClientModule
      ]
    });
    backend = TestBed.get(MockBackend);
    spyOn(HttpClient.prototype, 'request').and.callThrough();
  });
  afterEach(() => backend.verifyNoPendingRequests());

  it('should be created', inject([ChangeUserRoleService], (service: ChangeUserRoleService) => {
    expect(service).toBeTruthy();
  }));

  it('should userId be same as passed in changeGlobalRoleDetails service', fakeAsync(inject([ ChangeUserRoleService, MockBackend ],
    (service: ChangeUserRoleService, mockBackend: MockBackend) => {
      // prepare fake response from `MockBackend`
      mockBackend.connections.subscribe((c: MockConnection) => {
        // respond to `ChangePasswordService` with a 200 Ok
        c.mockRespond(new Response(<ResponseOptions>{
          body: '',
          status: 200
        }));
      });
      const userId = '5ac5d7af2e6c990861830974';
      const globalId = '';
      expect(service.passedUserId).toBeUndefined();
      // dispatch the http request
      service.changeGlobalRoleDetails(userId, globalId);
      expect(service.passedUserId).toEqual(userId);
      flushMicrotasks();
  })));
});
