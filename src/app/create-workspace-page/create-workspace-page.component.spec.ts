import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWorkspacePageComponent } from './create-workspace-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatCardModule, MatInputModule,
  MatStepperModule, matSelectAnimations, MatSelectModule, MatOptionModule, MatTableModule, MatPaginatorModule, MatSortModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseListService } from '../database-list/database-list.service';
import { UserWorkspaceService } from '../user-workspace.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { UserProfileService } from '../user-profile/user-profile.service';

describe('CreateWorkspacePageComponent', () => {
  let component: CreateWorkspacePageComponent;
  let fixture: ComponentFixture<CreateWorkspacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateWorkspacePageComponent, NavbarComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule,
        FormsModule, MatFormFieldModule, MatCardModule, MatInputModule, BrowserAnimationsModule,
        MatSelectModule, MatOptionModule, MatStepperModule, MatTableModule, MatPaginatorModule, MatSortModule],
      providers: [UserWorkspaceService, UserinfoService, DatabaseListService, UserProfileService,
        { provide: EnvironmentService, useClass: MockEnvironmentService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkspacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
