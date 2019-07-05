import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTabComponent } from './header-tab.component';
import { AddMembersComponent } from '../add-members/add-members.component';
import { ManageMembersComponent } from '../manage-members/manage-members.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AddMembersService } from '../add-members/add-members.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ManageUserRolesComponent } from '../manage-user-roles/manage-user-roles.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableModule, MatSortModule, MatDialogModule } from '@angular/material';
import { ManageUserRolesService } from '../manage-user-roles/manage-user-roles.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnvironmentService } from '../environment/environment.service';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

describe('HeaderTabComponent', () => {
  let component: HeaderTabComponent;
  let fixture: ComponentFixture<HeaderTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule, MatTableModule, MatSortModule, MatDialogModule, BrowserAnimationsModule
      ],
      declarations: [
        HeaderTabComponent,
        ManageMembersComponent,
        AddMembersComponent, ManageUserRolesComponent
      ],
      providers: [
        ManageMembersService,
        AddMembersService,
        UserinfoService, WorkspaceServicesService,
        WorkspaceHeaderService, ManageUserRolesService, { provide: EnvironmentService, useClass: MockEnvironmentService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
