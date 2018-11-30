import { TestBed, async, inject } from '@angular/core/testing';
import { MemberRequestService } from './member-request.service';
import { HttpClientModule, HttpClient, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';

xdescribe('MemberRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MemberRequestService, HttpClient, HttpHandler, { provide: XHRBackend, useClass: MockBackend }]
    });
  });


  // it('should be created', inject([MemberRequestService], (service: MemberRequestService) => {
  //   expect(service).toBeTruthy();
  // }));
  // describe('getMemberRequestDetails()', () => {
  //   it('should return an Observable<Array<MemberRequestDetail>>',
  //     inject([MemberRequestService, XHRBackend], (memberRequestService, mockBackend) => {
  //       const mockResponce = {
  //         data: [
  //           { slNo: '1', masterVersion: '1.01', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 1' },
  //           { slNo: '2', masterVersion: '1.46', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 2' },
  //           { slNo: '3', masterVersion: '2.46', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 3' },
  //           { slNo: '4', masterVersion: '3.00', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 4' },
  //           { slNo: '5', masterVersion: '4.69', description: 'Null', requestedDate: '20/11/2017 04.05 PM', requestedBy: 'Member 5' }
  //         ]
  //       };
  //       mockBackend.connections.subscribe((connection) => {
  //         connection.mockRespond(new Response(new ResponseOptions({
  //           body: JSON.stringify(mockResponce)
  //         })));
  //       });
  //       // memberRequestData: MemberRequestData[];
  //       // data => {
  //       //   this.memberRequestData = data;
  //       // }
  //       memberRequestService.getMemberRequestDetails().subscribe((memberRequestData) => {
  //         expect(memberRequestData.length).toBe(5);
  //         // expect(memberrequest[0].slNo).toEqual('1');
  //         // expect(memberrequest[1].slNo).toEqual('2');
  //         // expect(memberrequest[2].slNo).toEqual('3');
  //         // expect(memberrequest[3].slNo).toEqual('4');
  //         // expect(memberrequest[4].slNo).toEqual('5');
  //       });
  //     }));
  // });
  // it('should be created', inject([MemberRequestService], (service: MemberRequestService) => {
  //   expect(service).toBeTruthy();
  // }));
});
