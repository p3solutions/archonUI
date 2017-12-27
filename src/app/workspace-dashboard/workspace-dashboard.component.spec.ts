import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceDashboardComponent } from './workspace-dashboard.component';
import { WorkspaceHeaderComponent } from '../workspace-header/workspace-header.component';
import { WorkspaceHeaderInfoComponent } from '../workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from '../workspace-mgmt-panel/workspace-mgmt-panel.component';
import { UserWorkspaceService } from '../user-workspace.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
        HttpClientModule
      ],
      declarations: [
        WorkspaceDashboardComponent,
        WorkspaceHeaderComponent,
        WorkspaceHeaderInfoComponent,
        WorkspaceMgmtPanelComponent
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
