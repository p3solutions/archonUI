import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkspacePageComponent } from './create-workspace-page.component';

describe('CreateWorkspacePageComponent', () => {
  let component: CreateWorkspacePageComponent;
  let fixture: ComponentFixture<CreateWorkspacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkspacePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkspacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
