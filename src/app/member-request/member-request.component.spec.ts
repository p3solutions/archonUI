// import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
// // import { ComponentFixtureAutoDetect } from '@angular/core/testing';
// import { HttpModule, Http, Response, ResponseOptions} from '@angular/http';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
// import { Request, RequestMethod, RequestOptions,XHRBackend } from '@angular/http';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// // import { ActivatedRoute, ParamMap } from '@angular/router';/
// import { MemberRequestComponent } from './member-request.component';
// import { MemberRequestService } from '../member-request.service';
import { MemberRequestData } from '../member-request-data';

// describe('MemberRequestComponent', () => {
//   let component: MemberRequestComponent;
//   let fixture: ComponentFixture<MemberRequestComponent>;
//   var memberData : MemberRequestData[];
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ HttpClientTestingModule ],
//       providers: [MemberRequestService,  // DI Token for `MockBackend`: used by tests
//       { provide: MockBackend, useClass: MockBackend },
//       // DI Token for `XHRBackend`: used by `Http` service and transitive dependents
//       { provide: XHRBackend, useExisting: MockBackend }],
//       declarations: [ MemberRequestComponent ]
//     })
//     .compileComponents();
//   }));
//   beforeEach(() => {
//     fixture = TestBed.createComponent(MemberRequestComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
// //  it('should create', () => {
// //     component.getMemberRequestData();
// //     console.log(component.isAvailable+" "+component.memberRequestData);
// //     expect(component).toBeTruthy();
// //   });
//   // describe('getMemberRequestDetails()', () => {
//   //     it('should return an Observable<Array<MemberRequestDetail>>',
//   //       inject([MemberRequestService], (memberRequestService) => {
//   //          memberRequestService.getMemberRequestDetails().subscribe(memberData => {
//   //              console.log(memberData.length+"cad");
//   //           expect(memberData.length).toBe(5);
//   //           // expect(memberData[0].slNo).toEqual('1');
//   //           // expect(memberData[1].slNo).toEqual('2');
//   //           // expect(memberData[2].slNo).toEqual('3');
//   //           // expect(memberData[3].slNo).toEqual('4');
//   //           // expect(memberData[4].slNo).toEqual('5');
//   //         });
//   //       }));
//   //   });
  
//   // describe(`FakeHttpClientResponses`, () => {
    
//   //     it(`should respond with fake data`, async(inject([HttpClient, HttpTestingController, ActivatedRoute],
//   //       (http: HttpClient, backend: HttpTestingController, route : ActivatedRoute) => {
//   //         http.get('/api/memberrequest').subscribe((next) => {
//   //           expect(next).toEqual({ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'});
//   //         });
    
//   //         backend.match({
//   //           url: '/api/memberrequest',
//   //           method: 'GET'
//   //         })[0].flush({ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'});
//   //     })));
    
//   //   });

//   describe('FakeHttpResponses', () => {
//     let backend: MockBackend;
//     backend = TestBed.get(MockBackend);
//     it(`should 1) call a http request, 2) verify the request,`
//        + `3) respond with fake data, and 4) verify the response`,
//       async(inject([ Http, MockBackend ], (http: Http, mockBackend: MockBackend) => {
  
//         // 0. prepare fake response from MockBackend
//         mockBackend.connections.subscribe((c: MockConnection) => {
//           // 2. expect the test client to make a well-known request
//           expect(c.request.url).toBe('/foo/bar');
  
//           // 3. respond to test client with a well-known response
//           c.mockRespond(new Response(new ResponseOptions({
//             body: 'This is a fake response'
//           })));
//         });
  
//         // 1. dispatch the request
//         http.request(new Request(new RequestOptions({
//             url: '/foo/bar',
//             method: RequestMethod.Get
//           })))
//           .subscribe((res: Response) => {
//             // 4. oviously, we should receive the fake response
//             expect(res.text()).toBe(`This is a fake response`);
  
//             // SANITY: we've made our http request, it should have been dispatched by `Http`
//             expect(http.request).toHaveBeenCalledTimes(1);
//           });
  
//       })));
  
//   });
// });



import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient,HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberRequestService } from '../member-request.service';
describe(`FakeHttpClientResponses`, () => {

  beforeEach(() => {
    // 0. set up the test environment
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers : [ MemberRequestService]
    });
  });
  
  it('should create a service', inject([MemberRequestService], (service: MemberRequestService) => {
    expect(service).toBeTruthy();
  }));

  it(`should respond with fake data using GET method`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('/api/memberrequest').subscribe((next) => {
        expect(next).toEqual({ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'});
      });

      backend.match({
        url: '/api/memberrequest',
        method: 'GET'
      })[0].flush({ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'});
  })));
  it(`should respond with fake data using DELETE method`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.delete('/api/memberrequest').subscribe((next) => {
        expect(next).toEqual({ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'});
      });

      backend.match({
        url: '/api/memberrequest',
        method: 'DELETE'
      })[0].flush({ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'});
  })));

});



// it(`should issue a request`,
// // 1. declare as async test since the HttpClient works with Observables
// async(
//   // 2. inject HttpClient and HttpTestingController into the test
//   inject([HttpClient, HttpTestingController], (http: HttpClient, backend: HttpTestingController) => {
//     // 3. send a simple request
//     http.get('/api/memberrequest').subscribe();

//     // 4. HttpTestingController supersedes `MockBackend` from the "old" Http package
//     // here two, it's significantly less boilerplate code needed to verify an expected request
//     backend.expectOne({
//       url: '/api/memberrequest',
//       method: 'GET'
//     });
//   })
// )
// );
// it(`should not issue a PUT request`, async(inject([HttpClient, HttpTestingController],
// (http: HttpClient, backend: HttpTestingController) => {
//   http.post('/api/memberrequest',{ slNo : '1', masterVersion : '1.01', description : 'Null' , requestedDate : '20/11/2017 04.05 PM' , requestedBy : 'Member 1'}).subscribe();
//   http.get('/api/memberrequest').subscribe();
//   http.delete('/api/memberrequest').subscribe();

//   backend.expectNone((req: HttpRequest<any>) => {
//     return req.method === 'PUT';
//   });
// })));