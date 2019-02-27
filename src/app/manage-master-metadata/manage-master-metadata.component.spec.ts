import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ManageMasterMetadataComponent } from './manage-master-metadata.component';
import { ManageMasterMetadataService } from './manage-master-metadata.service';
import { ManageMasterMetadata } from '../master-metadata-data';
import { Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceServicesComponent } from '../workspace-services/workspace-services.component';
import { FormsModule } from '@angular/forms';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';

describe('ManageMasterMetadataComponent', () => {
  let component: ManageMasterMetadataComponent;
  let fixture: ComponentFixture<ManageMasterMetadataComponent>;
  let de: DebugElement;
  let memberRequestHTMLTag: HTMLElement;
  let masterMetaDataService: any;

  const master_metadataMock: any = [
    { slNo: '1', version: '1.01', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
    { slNo: '2', version: '1.46', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
    { slNo: '3', version: '2.46', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
    { slNo: '4', version: '3.00', description: 'Null', createdDate: '20/11/2017 04.05 PM' },
    { slNo: '5', version: '4.69', description: 'Null', createdDate: '20/11/2017 04.05 PM' }
  ];
  const simpleObservable = new Observable<ManageMasterMetadata>((observer) => {
    observer.next(master_metadataMock);
    observer.complete();
  });
  const disposeMe = simpleObservable.subscribe();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, HttpClientModule, RouterTestingModule, NgxPaginationModule],
      providers: [ManageMasterMetadataService, UserinfoService, WorkspaceHeaderService,
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [ManageMasterMetadataComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMasterMetadataComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#manager-master-metadata'));
    memberRequestHTMLTag = de.nativeElement;
    masterMetaDataService = TestBed.get(ManageMasterMetadataService);
    const WHS = TestBed.get(WorkspaceHeaderService);
    spyOn(WHS, 'getSelectedWorkspaceId').and.returnValue('');
  });

  // it('Should display the observable data for Manage-master Metadata component', () => {
  //   spyOn(masterMetaDataService, 'getManageMasterMetaData').and.returnValue(simpleObservable);
  //   component.isProgress = true;
  //   fixture.detectChanges();
  //   const rowArray: NodeListOf<Element> = memberRequestHTMLTag.querySelectorAll('.man-mast-data');
  //   expect(rowArray[0].textContent.trim()).toBe(component.manage_Master_Metadata[0].slNo);
  //   expect(rowArray[1].textContent.trim()).toBe(component.manage_Master_Metadata[0].version);
  //   expect(rowArray[2].textContent.trim()).toBe(component.manage_Master_Metadata[0].description);
  //   expect(rowArray[3].textContent.trim()).toBe(component.manage_Master_Metadata[0].createdDate);
  //   disposeMe.unsubscribe();
  // });

  // it('Should work the delete functionality, by deleting one master-record', () => {
  //   spyOn(masterMetaDataService, 'getManageMasterMetaData').and.returnValue(simpleObservable);
  //   component.isProgress = true;
  //   fixture.detectChanges();
  //   expect(component.deleteManageMasterRecord).toBeTruthy();
  //   let rowArray: NodeListOf<Element> = memberRequestHTMLTag.querySelectorAll('.man-mast-rec');
  //   const rowsBeforeDel = rowArray.length;
  //   component.deleteManageMasterRecord(master_metadataMock[0]);
  //   fixture.detectChanges();
  //   rowArray = memberRequestHTMLTag.querySelectorAll('.man-mast-rec');
  //   const rowsAfterDel = rowArray.length;
  //   expect(rowsBeforeDel - 1).toBe(rowsAfterDel);
  //   disposeMe.unsubscribe();
  // });
  // ToDo: revisit again
  it('Should navigate to dashboard', () => {
    component.gotoDashboard();
    fixture.detectChanges();
    // find DebugElements with an attached WorkspaceServicesComponentDirective
    const workspaceServiceTag = fixture.debugElement
      .queryAll(By.css('app-workspace-services'));
    // get the attached link directive instances using the DebugElement injectors
    const links = workspaceServiceTag
      .map(dE => dE.injector.get(WorkspaceServicesComponent) as WorkspaceServicesComponent);
    const dashboardUrl = 'workspace/workspace-dashboard/workspace-services';
    // expect(links[1].navigatedTo).toBe(dashboardUrl);
  });
});
