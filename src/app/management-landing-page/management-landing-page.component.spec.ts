import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementLandingPageComponent } from './management-landing-page.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('ManagementLandingPageComponent', () => {
  let component: ManagementLandingPageComponent;
  let fixture: ComponentFixture<ManagementLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementLandingPageComponent, NavbarComponent],
      imports: [RouterTestingModule, HttpClientModule, NgxSpinnerModule, FormsModule, ReactiveFormsModule],
      providers: [UserProfileService, UserinfoService, NgxSpinnerService, WorkspaceServicesService, 
        { provide: EnvironmentService, useClass: MockEnvironmentService }
      ],
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
