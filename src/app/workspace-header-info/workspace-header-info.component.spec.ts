import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceHeaderInfoComponent } from './workspace-header-info.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';

describe('WorkspaceHeaderInfoComponent', () => {
  let component: WorkspaceHeaderInfoComponent;
  let fixture: ComponentFixture<WorkspaceHeaderInfoComponent>;
  let de: DebugElement;
  let workspaceHeaderInfo: HTMLElement;
  let userWorkspaceService: any;
  const currentWorkspace = {
    id: 123,
    masterMetaVersion: 22,
    members: 22,
    name: 'Sample WS Name',
    role: 'Admin', // need to remove this & use userRole instead
    users: [11, 13] // user-ids --> info.id
  };
  const simpleObservable = new Observable<object>((observer) => {
    observer.next(currentWorkspace);
    observer.complete();
  });
  let disposeMe;
  const getCurrentWorkspace = function (): Observable<object> {
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ WorkspaceHeaderInfoComponent ],
      providers: [
        UserWorkspaceService,
        HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceHeaderInfoComponent);
    component = fixture.componentInstance;
    userWorkspaceService = TestBed.get(UserWorkspaceService);
    de = fixture.debugElement.query(By.css('#workspace-header-info'));
    workspaceHeaderInfo = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the drop-down button & its options', () => {
    // returning mock data from the spy stub
    spyOn(userWorkspaceService, 'getCurrentWorkspace').and.returnValue(getCurrentWorkspace());
    // calling the function to render data in template
    component.getCurrentWorkspace();
    // triggering changes & update view
    fixture.detectChanges();
    // testing names of all the workspaceHeaderInfo rendered
    const workspaceName: Element = workspaceHeaderInfo.querySelector('div.workspace-name');
    expect(workspaceName.textContent).toContain(component.currentWorkspace.name);
    const workspaceRole: Element = workspaceHeaderInfo.querySelector('div.workspace-role');
    expect(workspaceRole.textContent).toContain(component.currentWorkspace.role);
    const workspaceMeta: Element = workspaceHeaderInfo.querySelector('div.workspace-master-meta-version');
    expect(workspaceMeta.textContent).toContain(component.currentWorkspace.masterMetaVersion.toString());
    disposeMe.unsubscribe();
  });
});
