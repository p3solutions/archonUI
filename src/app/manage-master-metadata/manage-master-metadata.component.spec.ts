
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient,HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ManageMasterMetadataService } from '../manage-master-metadata.service';
describe(`FakeHttpClientResponsesIn ManageMasterMetadata`, () => {

  beforeEach(() => {
    // 0. set up the test environment
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers : [ ManageMasterMetadataService]
    });
  });
  
  it('should create a service', inject([ManageMasterMetadataService], (service: ManageMasterMetadataService) => {
    expect(service).toBeTruthy();
  }));

  it(`should respond with fake data using GET method`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.get('api/master_metadata').subscribe((next) => {
        expect(next).toEqual(  { slNo : '1', version : '1.01', description : 'Null' , createdDate : '20/11/2017 04.05 PM'});
      });

      backend.match({
        url: 'api/master_metadata',
        method: 'GET'
      })[0].flush(  { slNo : '1', version : '1.01', description : 'Null' , createdDate : '20/11/2017 04.05 PM'});
  })));
  it(`should respond with fake data using DELETE method`, async(inject([HttpClient, HttpTestingController],
    (http: HttpClient, backend: HttpTestingController) => {
      http.delete('api/master_metadata').subscribe((next) => {
        expect(next).toEqual({ slNo : '1', version : '1.01', description : 'Null' , createdDate : '20/11/2017 04.05 PM'});
      });

      backend.match({
        url: 'api/master_metadata',
        method: 'DELETE'
      })[0].flush(  { slNo : '1', version : '1.01', description : 'Null' , createdDate : '20/11/2017 04.05 PM'});
  })));

});
