import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatabasePageComponent } from './create-database-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatCardModule, MatInputModule,
  MatStepperModule, matSelectAnimations, MatSelectModule, MatOptionModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseListService } from '../database-list/database-list.service';
import { UserWorkspaceService } from '../user-workspace.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

describe('CreateDatabasePageComponent', () => {
  let component: CreateDatabasePageComponent;
  let fixture: ComponentFixture<CreateDatabasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDatabasePageComponent, NavbarComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule,
        FormsModule, MatFormFieldModule, MatCardModule, NgxSpinnerModule, MatInputModule, BrowserAnimationsModule,
        MatSelectModule, MatOptionModule, MatStepperModule],
      providers: [UserWorkspaceService, NgxSpinnerService, UserinfoService, DatabaseListService, UserProfileService, WorkspaceServicesService,
        { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDatabasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
