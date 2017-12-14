import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { InfoService } from '../info.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let navbarTag: HTMLElement;
  let infoService: any;
  let infoServiceStub: any;

  beforeEach(async(() => {
    infoServiceStub =  { // mock-response-data to be used.
      info : {role: 'Admin'}
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ NavbarComponent ],
      providers: [
        { provide: InfoService, useValue: infoServiceStub },
        HttpClientModule
      ],
    })
    .compileComponents();
    console.log('async');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('nav'));
    infoService = de.injector.get(InfoService);
    navbarTag = de.nativeElement;
    console.log('sync');
  });

  it('Should create Navbar tag', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the default selected Home menu in Navbar', () => {
    const selectedMenu: HTMLElement = navbarTag.querySelector('li.active>a');
    expect(selectedMenu.textContent).toContain('Home');
  });

  it('Should display the username in menu by fetching', () => {
    component.getInfo();
    fixture.detectChanges();
    // navbarTag.querySelector('');
    console.log('inside Navbar tag', component, navbarTag, infoService);
  });
});
