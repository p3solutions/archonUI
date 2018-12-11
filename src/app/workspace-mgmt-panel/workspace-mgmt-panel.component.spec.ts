import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkspaceMgmtPanelComponent } from './workspace-mgmt-panel.component';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

xdescribe('WorkspaceMgmtPanelComponent', () => {
  let component: WorkspaceMgmtPanelComponent;
  let fixture: ComponentFixture<WorkspaceMgmtPanelComponent>;
  let de: DebugElement;
  let workspaceMgmtPanel: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceMgmtPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceMgmtPanelComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('#workspace-mgmt-panel'));
    workspaceMgmtPanel = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have the tab names in the panel', () => {
    const workspaceInfo: Element = workspaceMgmtPanel.querySelector('a.workspace-info');
    expect(workspaceInfo.textContent).toContain('Workspace Info');
    const workspaceName: Element = workspaceMgmtPanel.querySelector('a.member-requests');
    expect(workspaceName.textContent).toContain('Member Requests');
    const workspaceRole: Element = workspaceMgmtPanel.querySelector('a.manage-members');
    expect(workspaceRole.textContent).toContain('Manage Members');
    const workspaceMeta: Element = workspaceMgmtPanel.querySelector('a.manage-master-metadata');
    expect(workspaceMeta.textContent).toContain('Manage Master Metadata');
  });
});
