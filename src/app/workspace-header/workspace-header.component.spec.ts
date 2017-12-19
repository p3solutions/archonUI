import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { WorkspaceHeaderComponent } from './workspace-header.component';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from '../user-workspace.service';

describe('WorkspaceHeaderComponent', () => {
  let component: WorkspaceHeaderComponent;
  let fixture: ComponentFixture<WorkspaceHeaderComponent>;
  let de: DebugElement;
  let btnTag: HTMLElement;
  let userWorkspaceService: any;
  // mock data
  const id = 11;
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
    observer.next(workspaceList[id]);
    observer.complete();
  });
  const getUserWorkspaceList = function (): Observable<object> {
    // subscribe to the observable
    simpleObservable.subscribe();
    return simpleObservable;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ WorkspaceHeaderComponent ],
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

    de = fixture.debugElement.query(By.css('button'));
    btnTag = de.nativeElement;
  });

  it('Should create Workspace-Header tag', () => {
    expect(component).toBeTruthy();
    console.log(btnTag, 'btn');
  });

  /* it('Should have the default selected Home menu in Navbar', () => {
    const selectedMenu: Element = btnTag.querySelector('li.active>a');
    expect(selectedMenu.textContent).toContain('Home');
  });

  it('Should not display the username in Navbar before calling getInfo', () => {
    const userName: Element = btnTag.querySelector('li.user-menu>a');
    // info.username not rendered
    expect(userName.textContent.trim()).toBe('');
  });

  it('Should display the username in Navbar for any user', () => {
    const userName: Element = btnTag.querySelector('li.user-menu>a');
    // while spying on real service, mocked info is returned
    spyOn(userWorkspaceService, 'getinfo').and.returnValue(getInfo());
    fixture.detectChanges();
    expect(userName.textContent.trim()).toBe(component.info.username);
    // console.log('username->', component.info.username, 'info returned by userWorkspaceService->', component.info);
  });

  it('Should display username, Manage-link, notifications in Navbar for Admin role', () => {
    // to test for Admin, set role = 'Admin'
    info.role = 'Admin';
    // while spying on real service, mocked info is returned
    spyOn(userWorkspaceService, 'getinfo').and.returnValue(getInfo());
    fixture.detectChanges();
    // call getInfo() to set info.show true for Admin
    component.getInfo();

    // detecting changes
    fixture.detectChanges();

    // expecting username
    const userName: Element = btnTag.querySelector('li.user-menu>a');
    expect(userName.textContent.trim()).toBe(component.info.username);
    // expecting Manage link
    const manageLink: Element = btnTag.querySelector('li[title="Manage"]>a');
    expect(manageLink.textContent.trim()).toBe('Manage');

    const notifications: Element = btnTag.querySelector('#see-all-notif');
    expect(notifications.textContent.trim()).toBe('See All Notifications');
    // console.log('info returned by userWorkspaceService->', component.info, manageLink, notifications);
  }); */
});
