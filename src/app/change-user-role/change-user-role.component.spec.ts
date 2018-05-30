import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserRoleComponent } from './change-user-role.component';

xdescribe('ChangeUserRoleComponent', () => {
  let component: ChangeUserRoleComponent;
  let fixture: ComponentFixture<ChangeUserRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
