import { TestBed, inject , async, getTestBed, fakeAsync, tick, flush, flushMicrotasks, ComponentFixture } from '@angular/core/testing';
import { AddMembersService } from './add-members.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

describe('AddMembersService', () => {
  let mockBackend: MockBackend;
  let addMembersService: AddMembersService;
  // let setupConnections;
  const getAllUsersResponse = [
    {'id': '5ac5cda32e6c9905ef23b54b', 'createdAt': 1522912675, 'updatedAt': 1522912675, 'name': 'User', 'emailAddress': 'user@test.com',
  'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907, 'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER',
  'softDeleted': false}], 'softDeleted': false},
  {'id': '5ac5d7af2e6c990861830974', 'createdAt': 1522915246, 'updatedAt': 1522915246, 'name': 'admin', 'emailAddress': 'admin@test.com',
  'globalRoles': [{'id': '5ac5c6bda54d7503a6b80915', 'createdAt': 1522910907, 'updatedAt': 1535533386, 'roleName': 'ROLE_ADMIN',
  'softDeleted': false}], 'softDeleted': false},
  {'id': '5ac763622e6c9951ab2df429', 'createdAt': 1523016546, 'updatedAt': 1523016546, 'name': 'chandruashwin',
  'emailAddress': 'chandru@test.com', 'globalRoles': [{'id': '5ac5c6bda54d7503a6b80916', 'createdAt': 1522910907,
  'updatedAt': 1535533386, 'roleName': 'ROLE_MEMBER', 'softDeleted': false}], 'softDeleted': false}
  ];
  const loggedInAccessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYmFkbWluQHRlc3QuY29tIiwicm9sZXMiOlt7InJvbGVJZCI6IjVhYzVjNmJkYTU0Z' +
  'Dc1MDNhNmI4MDkxOSIsInJvbGVOYW1lIjoiUk9MRV9EQl9BRE1JTiJ9XSwidXNlciI6eyJuYW1lIjoiZGJhZG1pbiIsImlkIjoiNWFjNWRjNjUyZTZjOTkwODYxODM' +
  'wOTc3IiwiZW1haWxBZGRyZXNzIjoiZGJhZG1pbkB0ZXN0LmNvbSJ9LCJpc3MiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTUyNzY4Nzc5MiwiZXhwIjoxNTI3Nzc0MTkyfQ' +
  '.822cmi5CYPIHFgMba7D-LwsdLvFpphMw6FdU8FAs6RYdGKXtr36EugH_EUCbqxccjCAx4EwUBW9swXDSTRjiWA';
  localStorage.setItem('accessToken', loggedInAccessToken); // inserting logged in user info

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        AddMembersService,
        HttpClientModule,
        {
          deps: [
              MockBackend,
              BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          }
        }
      ]
    });
    mockBackend = TestBed.get(MockBackend);
    addMembersService = TestBed.get(AddMembersService);
    // setupConnections = function(backend: MockBackend, options: any) {
    //   console.log('mockBackend', mockBackend);
    //   backend.connections.subscribe((connection: MockConnection) => {
    //         console.log('connection.request', connection.request);
    //           const responseOptions = new ResponseOptions(options);
    //           const response = new Response(responseOptions);
    //           connection.mockRespond(response);
    //   });
    // };
  });
  afterEach( fakeAsync( () => {
    mockBackend.resolveAllConnections();
    flush();
  }));
  it('should be created', () => {
    expect(addMembersService).toBeTruthy();
  });
  it('should getAllUsers', fakeAsync(() => {
    // setupConnections(mockBackend, getAllUsersResponse);
    mockBackend.connections.subscribe((connection: MockConnection) => {
      // console.log('connection.request', connection.request);
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(getAllUsersResponse)
      }));
    });
    // console.log('calling srvc');
    const prom = addMembersService.getAllUsers();
    tick();
    flushMicrotasks();
    prom.subscribe( res => {
      // console.log('res', res);
    });
    // console.log('should getAllUsers', addMembersService);
  }));
});
