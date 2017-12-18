import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { WorkspaceHeaderComponent } from './workspace-header.component';
import { Observable } from 'rxjs/Observable';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkSpaceHeaderInfo } from '../WorkSpaceHeaderInfo';

describe('WorkspaceHeaderComponent', () => {
  let component: WorkspaceHeaderComponent;
  let fixture: ComponentFixture<WorkspaceHeaderComponent>;
  let de: DebugElement;
  let navbarTag: HTMLElement;
  let infoService: any;
  // mock data
  const info: any = { id: 11, username: 'deepak', role: 'Member' };
  const simpleObservable = new Observable<WorkSpaceHeaderInfo>((observer) => {
    // observable execution
    observer.next(info);
    observer.complete();
  });
  const getInfo = function (): Observable<WorkSpaceHeaderInfo> {
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
      declarations: [WorkspaceHeaderComponent],
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

    // InfoService provided to the TestBed
    infoService = TestBed.get(UserWorkspaceService);

    de = fixture.debugElement.query(By.css('nav'));
    navbarTag = de.nativeElement;
  });

  it('Should create Workspace-Header tag', () => {
    expect(component).toBeTruthy();
  });

  /* it('Should have the default selected Home menu in Navbar', () => {
    const selectedMenu: Element = navbarTag.querySelector('li.active>a');
    expect(selectedMenu.textContent).toContain('Home');
  });

  it('Should not display the username in Navbar before calling getInfo', () => {
    const userName: Element = navbarTag.querySelector('li.user-menu>a');
    // info.username not rendered
    expect(userName.textContent.trim()).toBe('');
  });

  it('Should display the username in Navbar for any user', () => {
    const userName: Element = navbarTag.querySelector('li.user-menu>a');
    // while spying on real service, mocked info is returned
    spyOn(infoService, 'getinfo').and.returnValue(getInfo());
    fixture.detectChanges();
    expect(userName.textContent.trim()).toBe(component.info.username);
    // console.log('username->', component.info.username, 'info returned by infoservice->', component.info);
  });

  it('Should display username, Manage-link, notifications in Navbar for Admin role', () => {
    // to test for Admin, set role = 'Admin'
    info.role = 'Admin';
    // while spying on real service, mocked info is returned
    spyOn(infoService, 'getinfo').and.returnValue(getInfo());
    fixture.detectChanges();
    // call getInfo() to set info.show true for Admin
    component.getInfo();

    // detecting changes
    fixture.detectChanges();

    // expecting username
    const userName: Element = navbarTag.querySelector('li.user-menu>a');
    expect(userName.textContent.trim()).toBe(component.info.username);
    // expecting Manage link
    const manageLink: Element = navbarTag.querySelector('li[title="Manage"]>a');
    expect(manageLink.textContent.trim()).toBe('Manage');

    const notifications: Element = navbarTag.querySelector('#see-all-notif');
    expect(notifications.textContent.trim()).toBe('See All Notifications');
    // console.log('info returned by infoservice->', component.info, manageLink, notifications);
  }); */
});
