import { Component, OnInit } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';
import { GlobalRoles } from '../global-roles';
import { ChangeGlobalRole } from '../change-global-role';


@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css']
})
export class ManageUserRolesComponent implements OnInit {
  isAvailable = false;
  manageUserRolesRequestData: ManageUserRoles[];
  globalRolesRequestData: GlobalRoles[];
  changeRoleRequestData: ChangeGlobalRole[];
  userId: string;
  globalRoleId: string;
  index: string;
  constructor(private manageUserRolesService: ManageUserRolesService, private router: Router) { }

  ngOnInit() {
    this.getManageUserRolesData();
    this.getGlobalRoleData();
  }
  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(res => {
        this.manageUserRolesRequestData = res;
        this.isAvailable = true;
        console.log(this.manageUserRolesRequestData);
      });
  }
  getUserId(id) {
    // this.index = index;
    this.userId = id;
    console.log(id);
  }
  getGlobalId(roleId) {
    this.globalRoleId = roleId;
  }

  changeOnConfirm() {
    this.manageUserRolesService.changeGlobalRoleDetails(this.userId, this.globalRoleId);
    // this.manageUserRolesRequestData[this.index]['globalRoles'][0]['roleName'] = this.choosedRole;
  }

  getGlobalRoleData() {
    this.manageUserRolesService.getGlobalRoleDetails()
      .subscribe(res => {
        this.globalRolesRequestData = res;
        console.log(this.globalRolesRequestData);
      });
  }

  gotoManagementPanel() {
    this.router.navigate(['workspace/management-panel']);
  }

}
