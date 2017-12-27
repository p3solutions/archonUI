import { Workspaceinfo } from '../workspaceinfo';
import { WorkspaceInfoComponent } from './workspace-info.component';
import { WorkspaceinfoService } from '../workspaceinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { WorkspaceServicesComponent } from '../workspace-services/workspace-services.component';

xdescribe('WorkspaceInfoComponent', () => {
  let component: WorkspaceInfoComponent;
  let fixture: ComponentFixture<WorkspaceInfoComponent>;
  let de: DebugElement;
  let WorkspaceInfoTag: HTMLElement;
  let workspaceinfoService: any;
  let workspaceServiceTag: any;
  const dashboardUrl = 'workspace/workspace-dashboard/workspace-services';
  const managemembers1: any = {
    name: 'Frontend Developer', owner: 'Platform3Solutions', approver: 'User1, User2',
    members: 'User1, User2, User3', your_role: 'Admin', master_metadata_version: '22'
  };
  const simpleObservable = new Observable<Workspaceinfo>((observer) => {
    // observable execution
    observer.next(managemembers1);
    observer.complete();
  });
  let disposeMe;
  const getworkinfo = function (): Observable<Workspaceinfo> {
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
        WorkspaceinfoService
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceInfoComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#workspace-info-table'));
    WorkspaceInfoTag = de.nativeElement;
    workspaceinfoService = TestBed.get(WorkspaceinfoService);
    fixture.detectChanges();
  });

  it('Should create Workspace_Info tag', () => {
    // console.log(component, 'component');
    expect(component).toBeTruthy();
  });

  xit('Should display the observable data for workspace-info componenet', () => {
    const row1Array: NodeListOf<Element> = WorkspaceInfoTag.querySelectorAll('.ws-info-data');
    spyOn(workspaceinfoService, 'getworkinfo').and.returnValue(getworkinfo());
    fixture.detectChanges();
    console.log(row1Array, 'row1Array');
    const name = row1Array[0];
    const owner = row1Array[1];
    const approver = row1Array[2];
    const member = row1Array[3];
    const role = row1Array[4];
    const metadata_version = row1Array[5];
    expect(name.textContent.trim()).toBe(component.workspaceInfoData.name);
    expect(owner.textContent.trim()).toBe(component.workspaceInfoData.owner);
    expect(approver.textContent.trim()).toBe(component.workspaceInfoData.approver);
    expect(member.textContent.trim()).toBe(component.workspaceInfoData.members);
    expect(role.textContent.trim()).toBe(component.workspaceInfoData.your_role);
    expect(metadata_version.textContent.trim()).toBe(component.workspaceInfoData.master_metadata_version);
    disposeMe.unsubscribe();
  });
  // ToDo: revisit again
  xit('Should navigate to dashboard', () => {
    component.gotoDashboard();
    fixture.detectChanges();
    // find DebugElements with an attached WorkspaceServicesComponentDirective
    workspaceServiceTag = fixture.debugElement
      .queryAll(By.directive(WorkspaceServicesComponent));
    // console.log('workspaceServiceTag', workspaceServiceTag);
    // get the attached link directive instances using the DebugElement injectors
    const links = workspaceServiceTag
      .map(dE => dE.injector.get(WorkspaceServicesComponent) as WorkspaceServicesComponent);
    // console.log('links', links);
    expect(links[1].navigatedTo).toBe(dashboardUrl);
  });
});
