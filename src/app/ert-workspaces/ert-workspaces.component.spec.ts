import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErtWorkspacesComponent } from './ert-workspaces.component';

describe('ErtWorkspacesComponent', () => {
  let component: ErtWorkspacesComponent;
  let fixture: ComponentFixture<ErtWorkspacesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErtWorkspacesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErtWorkspacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
