import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceHeaderComponent } from './workspace-header.component';

describe('WorkspaceHeaderComponent', () => {
  let component: WorkspaceHeaderComponent;
  let fixture: ComponentFixture<WorkspaceHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
