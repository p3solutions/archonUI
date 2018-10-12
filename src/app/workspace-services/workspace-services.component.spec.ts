import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceServicesComponent } from './workspace-services.component';

xdescribe('WorkspaceServicesComponent', () => {
  let component: WorkspaceServicesComponent;
  let fixture: ComponentFixture<WorkspaceServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
