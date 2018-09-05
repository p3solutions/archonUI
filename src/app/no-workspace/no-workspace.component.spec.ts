import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoWorkspaceComponent } from './no-workspace.component';
import { WorkspaceHeaderComponent } from '../workspace-header/workspace-header.component';
import { WorkspaceHeaderInfoComponent } from '../workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from '../workspace-mgmt-panel/workspace-mgmt-panel.component';
import { RouterTestingModule } from '@angular/router/testing';

xdescribe('NoWorkspaceComponent', () => {
  let component: NoWorkspaceComponent;
  let fixture: ComponentFixture<NoWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        NoWorkspaceComponent,
        WorkspaceHeaderComponent,
        WorkspaceHeaderInfoComponent,
        WorkspaceMgmtPanelComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
