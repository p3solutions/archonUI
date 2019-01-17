import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMemberPrivilegesComponent } from './manage-member-privileges.component';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { HttpClientModule } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ManageMembers } from '../manage-members';
import { UserObject, RoleObject } from '../workspace-objects';

describe('ManageMemberPrivilegesComponent', () => {
  let component: ManageMemberPrivilegesComponent;
  let fixture: ComponentFixture<ManageMemberPrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMemberPrivilegesComponent ],
      providers: [ManageMembersService, UserinfoService],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMemberPrivilegesComponent);
    component = fixture.componentInstance;
    component.wsAccess = {createdAt: 12,
    updatedAt: 23,
    user: new UserObject,
    workspaceRole: new RoleObject};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
