import { WorkspaceInfo } from './workspace-info';
import { WorkspaceInfoComponent } from './workspace-info.component';
import { WorkspaceInfoService } from './workspace-info.service';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';

describe('WorkspaceInfoComponent', () => {
  let component: WorkspaceInfoComponent;
  let fixture: ComponentFixture<WorkspaceInfoComponent>;
  // tslint:disable-next-line:prefer-const
  let workInfoData: WorkspaceInfo;
  let de: DebugElement;
  let WorkspaceInfoTag: HTMLElement;
  let workspaceinfoService: any;
  const managemembers1: any = {
    name: 'Frontend Developer', owner: 'Platform3Solutions', approver: 'User1, User2',
    members: 'User1, User2, User3', your_role: 'Admin', master_metadata_version: '22'
  };
  const simpleObservable = new Observable<WorkspaceInfo>((observer) => {
    // observable execution
    observer.next(managemembers1);
    observer.complete();
  });
  let disposeMe;
  const getworkinfo = function (): Observable<WorkspaceInfo> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [WorkspaceInfoComponent],
      providers: [
        WorkspaceInfoService,
        HttpClientModule
      ],
    })
      .compileComponents();
    console.log('changed');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#workspace-info-table'));
    WorkspaceInfoTag = de.nativeElement;
    workspaceinfoService = TestBed.get(WorkspaceInfoService);
  });

  it('Should create Workspace_Info tag', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the observable data for workspace-info componenet', () => {
    const row1Array: NodeListOf<Element> = WorkspaceInfoTag.querySelectorAll('.ws-info-data');
    // while spying on real service, mocked info is returned
    spyOn(workspaceinfoService, 'getworkinfo').and.returnValue(getworkinfo());
    fixture.detectChanges();
    console.log(row1Array, component.workspaceInfoData);
    const name = row1Array[0];
    const owner = row1Array[1];
    const approver = row1Array[2];
    const member = row1Array[3];
    const role = row1Array[4];
    const metadata_version = row1Array[5];
    // console.log('alok', name);
    // console.log('alok', owner);
    // console.log('alok', approver);
    // console.log('alok', member);
    // console.log('alok', role);
    // console.log('alok', metadata_version);
    expect(name.textContent.trim()).toBe(component.workspaceInfoData.name);
    expect(owner.textContent.trim()).toBe(component.workspaceInfoData.owner);
    expect(approver.textContent.trim()).toBe(component.workspaceInfoData.approver);
    expect(member.textContent.trim()).toBe(component.workspaceInfoData.members);
    expect(role.textContent.trim()).toBe(component.workspaceInfoData.your_role);
    expect(metadata_version.textContent.trim()).toBe(component.workspaceInfoData.master_metadata_version);

  });

});
