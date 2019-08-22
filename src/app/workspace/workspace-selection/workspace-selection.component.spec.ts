import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSelectionComponent } from './workspace-selection.component';

describe('WorkspaceSelectionComponent', () => {
  let component: WorkspaceSelectionComponent;
  let fixture: ComponentFixture<WorkspaceSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
