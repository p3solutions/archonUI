import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceMgmtPanelComponent } from './workspace-mgmt-panel.component';

describe('WorkspaceMgmtPanelComponent', () => {
  let component: WorkspaceMgmtPanelComponent;
  let fixture: ComponentFixture<WorkspaceMgmtPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceMgmtPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceMgmtPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
