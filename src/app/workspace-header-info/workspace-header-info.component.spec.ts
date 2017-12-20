import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceHeaderInfoComponent } from './workspace-header-info.component';

describe('WorkspaceHeaderInfoComponent', () => {
  let component: WorkspaceHeaderInfoComponent;
  let fixture: ComponentFixture<WorkspaceHeaderInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceHeaderInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceHeaderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
