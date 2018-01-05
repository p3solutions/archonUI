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
  selectDropDown = 'Choose Role';
  choosedRole = 'not selected';
  manageUserRolesRequestData: ManageUserRoles[];
  globalRolesRequestData: GlobalRoles[];
  changeRoleRequestData: ChangeGlobalRole[];
  constructor(private manageUserRolesService: ManageUserRolesService, private router: Router) { }

  ngOnInit() {
    this.getManageUserRolesData();
    this.getGlobalRoleData();
    // this.changeGlobalRoleData();
  }
  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(res => {
        this.manageUserRolesRequestData = res;
        this.isAvailable = true;
      });
  }

  selectGlobalRoles(data) {
     this.choosedRole = data;
  }

  changeGlobalRoleData(id) {
       this.manageUserRolesService.changeGlobalRoleDetails(); 
  }
 
  getGlobalRoleData() {
    this.manageUserRolesService.getGlobalRoleDetails()
      .subscribe(res => {
        this.globalRolesRequestData = res;
        console.log('globalglobalglobal', this.globalRolesRequestData);
      });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

}
