import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMemberPrivilegesComponent } from './manage-member-privileges.component';

xdescribe('ManageMemberPrivilegesComponent', () => {
  let component: ManageMemberPrivilegesComponent;
  let fixture: ComponentFixture<ManageMemberPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMemberPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMemberPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
