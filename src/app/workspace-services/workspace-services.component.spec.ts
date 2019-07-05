import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceServicesComponent } from './workspace-services.component';
import { RouterTestingModule } from '@angular/router/testing';
import { WorkspaceServicesService } from './workspace-services.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { CommonUtilityService } from '../common-utility.service';
import { MatCardModule } from '@angular/material';
import { UserProfileService } from '../user-profile/user-profile.service';
import { EnvironmentService } from '../environment/environment.service';
import { ApplicationInitStatus } from '@angular/core';
import { MockEnvironmentService } from '../environment/mock-environment.service';
import { CookieService } from 'ngx-cookie-service';
import { UserWorkspaceService } from '../user-workspace.service';

describe('WorkspaceServicesComponent', () => {
  let component: WorkspaceServicesComponent;
  let fixture: ComponentFixture<WorkspaceServicesComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatCardModule],
      declarations: [WorkspaceServicesComponent],
      providers: [
        { provide: EnvironmentService, useClass: MockEnvironmentService }
        , CookieService,
        WorkspaceServicesService, UserinfoService, UserWorkspaceService,
        WorkspaceHeaderService, MetalyzerHeaderService, TableListService, CommonUtilityService, UserProfileService]
    })
      .compileComponents();
    await TestBed.get(ApplicationInitStatus).donePromise;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
