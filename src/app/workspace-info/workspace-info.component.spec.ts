import { WorkspaceInfo } from './workspace-info';
import { WorkspaceInfoComponent } from './workspace-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceInfoService } from './workspace-info.service';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { WorkspaceServicesComponent } from '../workspace-services/workspace-services.component';
import { HttpClientModule } from '@angular/common/http';

xdescribe('WorkspaceInfoComponent', () => {
  let component: WorkspaceInfoComponent;
  let fixture: ComponentFixture<WorkspaceInfoComponent>;
  let de: DebugElement;
  let WorkspaceInfoTag: HTMLElement;
  let workspaceInfoService: any;
  let workspaceServiceTag: any;
  const dashboardUrl = 'workspace/workspace-dashboard/workspace-services';
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
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [WorkspaceInfoComponent],
      providers: [
        RouterTestingModule,
        WorkspaceInfoService,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#workspace-info-table'));
    WorkspaceInfoTag = de.nativeElement;
    workspaceInfoService = TestBed.get(WorkspaceInfoService);
  });

  it('Should create Workspace_Info component', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the observable data for workspace-info componenet', () => {
    const row1Array: NodeListOf<Element> = WorkspaceInfoTag.querySelectorAll('.ws-info-data');
    spyOn(workspaceInfoService, 'getworkinfo').and.returnValue(simpleObservable);
    fixture.detectChanges();
    const name = row1Array[0];
    const owner = row1Array[1];
    const approver = row1Array[2];
    const member = row1Array[3];
    const role = row1Array[4];
    const metadata_version = row1Array[5];
    expect(name.textContent.trim()).toBe(component.workspaceInfoData.workspaceName);
    expect(owner.textContent.trim()).toBe(component.workspaceInfoData.owner.name);
    expect(approver.textContent.trim()).toBe('NULL');
    const memberNames = [];
    component.workspaceInfoData.members.forEach((mem) => {
      memberNames.push(mem.user.name);
    });
    expect(member.textContent.trim()).toBe(memberNames.join(','));
    expect(role.textContent.trim()).toBe('NULL');
    expect(metadata_version.textContent.trim()).toBe(component.workspaceInfoData.masterMetadataVersion.toString());
    disposeMe.unsubscribe();
  });
  // ToDo: revisit again
  xit('Should navigate to dashboard', () => {
    component.gotoDashboard();
    fixture.detectChanges();
    // find DebugElements with an attached WorkspaceServicesComponentDirective
    workspaceServiceTag = fixture.debugElement
      .queryAll(By.directive(WorkspaceServicesComponent));
    // get the attached link directive instances using the DebugElement injectors
    const links = workspaceServiceTag
      .map(dE => dE.injector.get(WorkspaceServicesComponent) as WorkspaceServicesComponent);
    expect(links[1].navigatedTo).toBe(dashboardUrl);
  });
});
