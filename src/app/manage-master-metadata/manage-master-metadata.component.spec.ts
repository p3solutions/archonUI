import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMasterMetadataComponent } from './manage-master-metadata.component';
import { Manage_Master_Metadata } from '../master-metadata-data';
import { ManageMasterMetadataService } from '../manage-master-metadata.service';
import { MockBackend } from '@angular/http/testing';
describe('ManageMasterMetadataComponent', () => {
  let component: ManageMasterMetadataComponent;
  let fixture: ComponentFixture<ManageMasterMetadataComponent>;
  let manage_Master_Metata : Manage_Master_Metadata[];
  let obj : Manage_Master_Metadata;
  let version : '';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ManageMasterMetadataService,{ provide: XHRBackend, useClass: MockBackend }],
      declarations: [ ManageMasterMetadataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('getManageMemberMetadataDetails()', () => {
    it('should return an Observable<Array<ManageMemberMetadataDetail>>',
      inject([ManageMasterMetadataService, XHRBackend], (manageMasterMetadataService, mockBackend) => {
        const mockResponse = {
          data: [
            { id: 0, name: 'Video 0' },
            { id: 1, name: 'Video 1' },
            { id: 2, name: 'Video 2' },
            { id: 3, name: 'Video 3' },
          ]
        };

        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });


        manageMasterMetadataService.getManageMasterMetaData().subscribe((manage_Master_Metata) => {
          // console.log("The total length is : "+manage_Master_Metata.length);
          expect(manage_Master_Metata.length).toEqual(10);
          
        });
      }));

      // it('should deleted an Observable<Array<ManageMemberMetadataDetail>>',
      // inject([ManageMasterMetadataService], (manageMasterMetadataService) => {
      //   manageMasterMetadataService.removeManageMasterData(obj).subscribe(manage_Master_Metata => {
      //     console.log("The total length is : "+manage_Master_Metata.length);

      //    console.log(obj.description+" "+obj.createdDate+" "+obj.slNo+" "+obj.version);
      //     expect(manage_Master_Metata.length).toBe(4);
         
      //   });
      // }));
  });
  

 
});



