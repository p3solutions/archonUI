import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLandingPageComponent } from './management-landing-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagementLandingPageComponent', () => {
  let component: ManagementLandingPageComponent;
  let fixture: ComponentFixture<ManagementLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementLandingPageComponent, NavbarComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
