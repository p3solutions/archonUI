import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { WorkspaceHeaderComponent } from './workspace-header.component';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceHeaderInfoComponent } from '../workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from '../workspace-mgmt-panel/workspace-mgmt-panel.component';

describe('WorkspaceHeaderComponent', () => {
  let component: WorkspaceHeaderComponent;
  let fixture: ComponentFixture<WorkspaceHeaderComponent>;
  let de: DebugElement;
  let workspaceHeader: HTMLElement;
  let userWorkspaceService: any;
  // mock data
  const userId = '11';
  const workspace1 = {
    id: 123,
    masterMetaVersion: 22,
    members: 22,
    name: 'Sample WS Name',
    role: 'Admin', // need to remove this & use userRole instead
    users: [11, 13] // user-ids --> info.id
  };
  const workspace2 = {
    id: 234,
    masterMetaVersion: 23,
    members: 20,
    name: 'Sample 2',
    role: 'Member',
    users: [11, 12, 13] // user-ids --> info.id
  };
  const workspaceList = {
  11: [
      workspace1,
      workspace2,
      workspace1,
      workspace2
      ]
    };
  const simpleObservable = new Observable<object>((observer) => {
    // observable execution
    observer.next(workspaceList);
    observer.complete();
  });
  let disposeMe;
  const getUserWorkspaceList = function (): Observable<object> {
    // subscribe to the observable
    disposeMe = simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [
        WorkspaceHeaderComponent,
        WorkspaceHeaderInfoComponent,
        WorkspaceMgmtPanelComponent
      ],
      providers: [
        UserWorkspaceService,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(WorkspaceHeaderComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    // userWorkspaceService provided to the TestBed
    userWorkspaceService = TestBed.get(UserWorkspaceService);
    de = fixture.debugElement.query(By.css('#workspace-header'));
    workspaceHeader = de.nativeElement;
    fixture.detectChanges();
  });

  it('Should create Workspace-Header component', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the drop-down button & its options', () => {
    // returning mock data from the spy stub
    spyOn(userWorkspaceService, 'getUserWorkspaceList').and.returnValue(getUserWorkspaceList());
    // calling the function to render data in template
    component.getUserWorkspaceList();
    // triggering changes & update view
    fixture.detectChanges();
    const dropDownOptions: NodeListOf<Element> = workspaceHeader.querySelectorAll('a.dropdown-item.dynamic-option');
    // testing names of all the drop-down options rendered
    for (let index = 0; index < dropDownOptions.length; index++) {
      const dynamicOption = dropDownOptions.item(index);
      expect(dynamicOption.textContent).toContain(component.userWorkspaceArray[index].workspaceName);
    }
    disposeMe.unsubscribe();
  });

});
