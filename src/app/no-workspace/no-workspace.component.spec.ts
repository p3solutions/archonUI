import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoWorkspaceComponent } from './no-workspace.component';

xdescribe('NoWorkspaceComponent', () => {
  let component: NoWorkspaceComponent;
  let fixture: ComponentFixture<NoWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoWorkspaceComponent ]
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
