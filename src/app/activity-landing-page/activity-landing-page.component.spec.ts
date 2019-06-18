import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLandingPageComponent } from './activity-landing-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';

describe('ActivityLandingPageComponent', () => {
  let component: ActivityLandingPageComponent;
  let fixture: ComponentFixture<ActivityLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityLandingPageComponent, NavbarComponent],
      imports: [NgxSpinnerModule, RouterTestingModule, HttpClientModule],
      providers: [NgxSpinnerService, UserProfileService, UserinfoService, { provide: EnvironmentService, useClass: MockEnvironmentService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
