import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ManageMasterMetadataComponent } from './manage-master-metadata.component';
import { Manage_Master_Metadata } from '../master-metadata-data';
import { ManageMasterMetadataService } from '../manage-master-metadata.service';
describe('ManageMasterMetadataComponent', () => {
  let component: ManageMasterMetadataComponent;
  let fixture: ComponentFixture<ManageMasterMetadataComponent>;
  let manage_Master_Metata : Manage_Master_Metadata[];
  let obj : Manage_Master_Metadata;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ManageMasterMetadataService],
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
      inject([ManageMasterMetadataService], (manageMasterMetadataService) => {
        manageMasterMetadataService.getManageMasterMetaData().subscribe(manage_Master_Metata => {
          console.log("The total length is : "+manage_Master_Metata.length);
          obj = manage_Master_Metata[0];
         // console.log(obj.description+" "+obj.createdDate+" "+obj.slNo+" "+obj.version);
          expect(manage_Master_Metata.length).toBe(5);
         
        });
      }));
  });

 
});
