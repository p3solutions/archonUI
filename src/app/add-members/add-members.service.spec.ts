import { TestBed, inject , async, fakeAsync, flushMicrotasks, ComponentFixture } from '@angular/core/testing';
import { AddMembersService } from './add-members.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions, XHRBackend } from '@angular/http';

describe('AddMembersService', () => {
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
        AddMembersService,
        HttpClientModule
      ]
    });
    backend = TestBed.get(MockBackend);
    spyOn(HttpClient.prototype, 'request').and.callThrough();
  });

  afterEach(() => backend.verifyNoPendingRequests());

  it('should be created', inject([AddMembersService], (service: AddMembersService) => {
    expect(service).toBeTruthy();
  }));

  it(`should emit 'true' for 200 Ok`, fakeAsync(inject([ AddMembersService, MockBackend ],
    (service: AddMembersService, mockBackend: MockBackend) => {
      // 1. prepare fake response from `MockBackend`
      mockBackend.connections.subscribe((c: MockConnection) => {
        // 3. respond to `AddMembersService` with a 200 Ok
        c.mockRespond(new Response(new ResponseOptions({
          body: {},
          status: 200
        })));
      });
      // 2. dispatch the http request
      const prom = service.getAllUsers();
      // tick();
      flushMicrotasks();
      prom
      .subscribe((res) => {
        // 4. ensure that `AddMembersService` respond data with success
        console.log('res', res);
        expect(res).toBeTruthy();
      });
  })));

  it(`should emit 'false' for 401 Unauthorized`, async(inject([ AddMembersService, MockBackend ],
    (service: AddMembersService, mockBackend: MockBackend) => {
    // 0. prepare fake response from `MockBackend`
      mockBackend.connections.subscribe((c: MockConnection) => {
      // 2a. expect `AddMembersService` to make a proper request
      // expect(c.request.url).toBe('auth/login');
      // expect(c.request.method).toBe(RequestMethod.Post);
      // expect(c.request.headers.get('Content-Type'))
        // .toBe('application/x-www-form-urlencoded');
      // 2b. expect request body to contain form data
      // expect(c.request.getBody()).toBe(/* ... */);
      // 3. respond to `AddMembersService` with a 401 Unauthorized
      c.mockRespond(new Response(new ResponseOptions({
        body: '',
        status: 401
        })));
      });

    // 1. dispatch the http request
    service.getAllUsers()
      .subscribe((res) => {
        // 4. ensure that `AddMembersService` reports login failure
        expect(res).toBeFalsy();
      });
  })));

});
