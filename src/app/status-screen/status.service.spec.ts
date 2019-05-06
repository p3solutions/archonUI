import { TestBed, inject } from '@angular/core/testing';
import { StatusService } from './status.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { jobArray, jobOriginArray, jobStatusArray } from '../hardcoded-collection';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '../../environments/environment';

describe('StatusService', () => {
  const getJobOriginsUrl = environment.apiUrl + 'jobStatus/jobOrigins';
  const getJobStatusesUrl = environment.apiUrl + 'jobStatus/jobStatuses';
  const getStatusListUrl = environment.apiUrl + 'jobStatus/jobList?userId=';
  const getRetryStatusUrl = environment.apiUrl + 'jobStatus/jobRetry';
  const setupConnections = function (mockBackend: MockBackend, options: any) {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      if (connection.request.url === getStatusListUrl) {
        responseOptions.body = { data: jobArray, success: true };
      } else if (connection.request.url === getJobOriginsUrl) {
        responseOptions.body = { data: jobOriginArray, success: true };
      } else if (connection.request.url === getJobStatusesUrl) {
        responseOptions.body = { data: jobStatusArray, success: true };
      } else if (connection.request.url === getRetryStatusUrl) {
        responseOptions.body = { data: [jobArray[0]], success: true };
      } else {
        responseOptions.body = { data: [], success: false };
      }
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  };
  const loggedInAccessToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkYmFkbWluQHRlc3QuY29tIiwicm9sZXMiOlt7InJvbGVJZCI6IjVhYzVjNmJkYTU0Z' +
    'Dc1MDNhNmI4MDkxOSIsInJvbGVOYW1lIjoiUk9MRV9EQl9BRE1JTiJ9XSwidXNlciI6eyJuYW1lIjoiZGJhZG1pbiIsImlkIjoiNWFjNWRjNjUyZTZjOTkwODYxODM' +
    'wOTc3IiwiZW1haWxBZGRyZXNzIjoiZGJhZG1pbkB0ZXN0LmNvbSJ9LCJpc3MiOiJhcHBsaWNhdGlvbiIsImlhdCI6MTUyNzY4Nzc5MiwiZXhwIjoxNTI3Nzc0MTkyfQ' +
    '.822cmi5CYPIHFgMba7D-LwsdLvFpphMw6FdU8FAs6RYdGKXtr36EugH_EUCbqxccjCAx4EwUBW9swXDSTRjiWA';
  localStorage.setItem('accessToken', loggedInAccessToken); // inserting logged in user info
  const logger = function (data: any) {
  };

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     imports: [
  //       HttpClientModule,
  //       HttpClientTestingModule
  //     ],
  //     providers: [
  //       BaseRequestOptions,
  //       MockBackend,
  //       StatusService,
  //       UserinfoService,
  //       {
  //         deps: [
  //           MockBackend,
  //           BaseRequestOptions
  //         ],
  //         provide: HttpClient,
  //         useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
  //           return new HttpClient(backendInstance, defaultOptions);
  //         }
  //       }
  //     ]
  //   });
  // }));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule, RouterTestingModule
      ],
      providers: [StatusService, UserinfoService, MockBackend]
    });
  });

  // afterEach(fakeAsync(() => {
  //   backend.resolveAllConnections();
  //   flush();
  // }));


  it('Service should be created', inject([StatusService], (service: StatusService) => {
    expect(service).toBeTruthy();
  }));



  // if there is an error for 'WorkspaceHeaderInfoService should be created'
  //  open workspace-header-info.service.spec.ts file do small change in logging & save it, it will run successfully

  // Run below test-cases one at a time by removing 'x' from xit()

  // xit('should return the list of jobArray from the server on success', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     status: 200
  //   });
  //   // logger('should return the list of jobArray from the server on success');
  //   const prom = statusService.getJobList();
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.success).toBeTruthy();
  //     expect(res.data.jobArray.length).toBe(jobArray.length);
  //   });
  // }));

  // xit('should not return the list of jobArray from the server on error', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     status: 500
  //   });
  //   logger('should not return the list of jobArray from the server on error');
  //   const prom = statusService.getJobList();
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.success).toBeFalsy();
  //   });
  // })
  // );



  // xit('should return the list of jobOrigins from the server on success', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     status: 200
  //   });
  //   logger('should return the list of jobOrigins from the server on success');
  //   const prom = statusService.getJobOrigins();
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.data.success).toBeTruthy();
  //     expect(res.data.jobOriginArray.length).toBe(jobOriginArray.length);
  //   });
  // }));

  // xit('should not return the list of jobOrigins from the server on error', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     status: 500
  //   });
  //   logger('should not return the list of jobOrigins from the server on error');
  //   const prom = statusService.getJobOrigins();
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.data.success).toBeFalsy();
  //   });
  // })
  // );




  // xit('should return the list of jobStatuses from the server on success', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     // url: getJobStatusesUrl,
  //     status: 200
  //   });
  //   logger('should return the list of jobStatuses from the server on success');
  //   const prom = statusService.getJobStatuses();
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.data.success).toBeTruthy();
  //     expect(res.data.jobStatusArray.length).toBe(jobStatusArray.length);
  //   });
  // }));

  // xit('should not return the list of jobStatuses from the server on error', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     url: getJobStatusesUrl,
  //     status: 500
  //   });
  //   logger('should not return the list of jobStatuses from the server on error');
  //   const prom = statusService.getJobStatuses();
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.data.success).toBeFalsy();
  //   });
  // }));




  // xit('should return response on retry job from the server on success', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     status: 200
  //   });
  //   logger('should return response on retry job from the server on success');
  //   const selectedJobId = jobArray[0]._id;
  //   const prom = statusService.setRetryStatus(selectedJobId);
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.data.success).toBeTruthy();
  //     expect(res.data.jobStatusArray.length).toBe(jobStatusArray.length);
  //   });
  // }));

  // xit('should not return response on retry job from the server on error', fakeAsync(() => {
  //   setupConnections(backend, {
  //     body: {},
  //     status: 500
  //   });
  //   logger('should not return response on retry job from the server on error');
  //   const prom = statusService.setRetryStatus(null);
  //   flushMicrotasks();
  //   prom.subscribe((res) => {
  //     expect(res.data.success).toBeFalsy();
  //   });
  // }));

});
