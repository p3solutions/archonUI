import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { InfoService } from '../info.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let de: DebugElement;
  let navbarTag: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // no more boilerplate code w/ custom providers needed :-)
        HttpClientModule,
        HttpClientTestingModule
      ],
      declarations: [ NavbarComponent ],
      providers: [ InfoService, HttpClientModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('nav'));
    navbarTag = de.nativeElement;
  });

  it('Should create Navbar tag', () => {
    // console.log('inside Navbar tag', fixture, component, navbarTag);
    expect(component).toBeTruthy();
  });

  it('Should create the default selected Home menu in Navbar', () => {
    const home: HTMLElement = navbarTag.querySelector('li.active>a');
    expect(home.textContent).toContain('Home');
  });
});
