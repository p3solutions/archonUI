import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { InfoService } from '../info.service';
import { Info } from '../info';
import { Observable } from 'rxjs/Observable';

xdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let navbarTag: HTMLElement;
  let infoService: any;
  // mock data
  const info: any = { id: 11, username: 'deepak', role: 'Member' };
  const simpleObservable = new Observable<Info>((observer) => {
    // observable execution
    observer.next(info);
    observer.complete();
  });
  let disposeMe;
  const getInfo = function (): Observable<Info> {
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
      declarations: [NavbarComponent],
      providers: [
        InfoService,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(NavbarComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    // InfoService provided to the TestBed
    infoService = TestBed.get(InfoService);

    de = fixture.debugElement.query(By.css('nav'));
    navbarTag = de.nativeElement;
  });

  it('Should create Navbar tag', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the default selected Home menu in Navbar', () => {
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
    disposeMe.unsubscribe();
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
    disposeMe.unsubscribe();
  });
});
