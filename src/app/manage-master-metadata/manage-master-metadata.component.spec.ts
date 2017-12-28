import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ManageMasterMetadataComponent } from './manage-master-metadata.component';
import { ManageMasterMetadataService } from '../manage-master-metadata.service';
import { Manage_Master_Metadata } from '../master-metadata-data';
import { Observable } from 'rxjs/Observable';
describe('ManageMasterMetadataComponent', () => {
  let component: ManageMasterMetadataComponent;
  let fixture: ComponentFixture<ManageMasterMetadataComponent>;
  let masterMetaData: Manage_Master_Metadata;
  let de: DebugElement;
  let memberRequestHTMLTag: HTMLElement;
  let masterMetaDataService: any;

  const master_metadataMock : any = [
    { slNo : '1', version : '1.01', description : 'Null' , createdDate : '20/11/2017 04.05 PM'},
    { slNo : '2', version : '1.46', description : 'Null' , createdDate : '20/11/2017 04.05 PM'},
    { slNo : '3', version : '2.46', description : 'Null' , createdDate : '20/11/2017 04.05 PM'},
    { slNo : '4', version : '3.00', description : 'Null' , createdDate : '20/11/2017 04.05 PM'},
    { slNo : '5', version : '4.69', description : 'Null' , createdDate : '20/11/2017 04.05 PM'}
];
  const simpleObservable = new Observable<Manage_Master_Metadata>((observer) => {
    observer.next(master_metadataMock);
    observer.complete();
  });
  let disposeMe;
  const getMemberRequest = function (): Observable<Manage_Master_Metadata> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ManageMasterMetadataService],
      declarations: [ManageMasterMetadataComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterMetadataComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#manager-master-metadata'));
    console.log('&&&&7',component,de,'chandruashwin');
    memberRequestHTMLTag = de.nativeElement;
    masterMetaDataService = TestBed.get(ManageMasterMetadataService);
  });
  it('Should display the observable data for Manage-master Metadata component', () => {
    spyOn(masterMetaDataService, 'getManageMasterMetaData').and.returnValue(getMemberRequest());
    fixture.detectChanges();
    component.isAvailable = true;
    fixture.detectChanges();
    const rowArray: NodeListOf<Element> = memberRequestHTMLTag.querySelectorAll('.man-mast-data');
    console.log(rowArray[0], component.manage_Master_Metadata);
    const sl_no = rowArray[0];
    const version = rowArray[1];
    const description = rowArray[2];
    const createdDate = rowArray[3];
    expect(sl_no.textContent.trim()).toBe(component.manage_Master_Metadata[0].slNo);
    expect(version.textContent.trim()).toBe(component.manage_Master_Metadata[0].version);
    expect(description.textContent.trim()).toBe(component.manage_Master_Metadata[0].description);
    expect(createdDate.textContent.trim()).toBe(component.manage_Master_Metadata[0].createdDate);
  });
  it('should work the delete function', () => {
    expect(component.deleteManageMasterRecord).toBeTruthy();
  });
});
