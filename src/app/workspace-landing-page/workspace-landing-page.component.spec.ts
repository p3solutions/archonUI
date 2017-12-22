import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceLandingPageComponent } from './workspace-landing-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { routes } from '../app-routing.module';
// import { Location } from '@angular/common';

xdescribe('WorkspaceLandingPageComponent', () => {
  let component: WorkspaceLandingPageComponent;
  let fixture: ComponentFixture<WorkspaceLandingPageComponent>;
  // let location: Location;
  // let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ WorkspaceLandingPageComponent, NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // router = TestBed.get(Router);
    // location = TestBed.get(Location);
    fixture = TestBed.createComponent(WorkspaceLandingPageComponent);
    component = fixture.componentInstance;
    // router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
