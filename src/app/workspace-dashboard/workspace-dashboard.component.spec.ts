import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceDashboardComponent } from './workspace-dashboard.component';
import { WorkspaceHeaderComponent } from '../workspace-header/workspace-header.component';
import { WorkspaceHeaderInfoComponent } from '../workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from '../workspace-mgmt-panel/workspace-mgmt-panel.component';
import { UserWorkspaceService } from '../user-workspace.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoWorkspaceComponent } from '../no-workspace/no-workspace.component';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { DynamicLoaderService } from '../dynamic-loader.service';

describe('WorkspaceDashboardComponent', () => {
  let component: WorkspaceDashboardComponent;
  let fixture: ComponentFixture<WorkspaceDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        RouterTestingModule,
        UserWorkspaceService,
        HttpClientModule,
        UserinfoService,
        WorkspaceServicesService,
        WorkspaceHeaderService,
        UserProfileService,
        DynamicLoaderService
      ],
      declarations: [
        WorkspaceDashboardComponent,
        WorkspaceHeaderComponent,
        WorkspaceHeaderInfoComponent,
        WorkspaceMgmtPanelComponent,
        NoWorkspaceComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
