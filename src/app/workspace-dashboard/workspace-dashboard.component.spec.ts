import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceDashboardComponent } from './workspace-dashboard.component';
import { WorkspaceHeaderComponent } from '../workspace-header/workspace-header.component';
import { WorkspaceHeaderInfoComponent } from '../workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from '../workspace-mgmt-panel/workspace-mgmt-panel.component';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Router } from '@angular/router';
// import { routes } from '../app-routing.module';
// import { Location } from '@angular/common';

xdescribe('WorkspaceDashboardComponent', () => {
  let component: WorkspaceDashboardComponent;
  let fixture: ComponentFixture<WorkspaceDashboardComponent>;
  // let location: Location;
  // let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [RouterTestingModule],
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
    // router = TestBed.get(Router);
    // location = TestBed.get(Location);
    fixture = TestBed.createComponent(WorkspaceDashboardComponent);
    component = fixture.componentInstance;
    // router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
