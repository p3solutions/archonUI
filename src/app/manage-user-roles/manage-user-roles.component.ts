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
  choosedRole = 'Not Selected';
  manageUserRolesRequestData: ManageUserRoles[];
  globalRolesRequestData: GlobalRoles[];
  changeRoleRequestData: ChangeGlobalRole[];
  userId: string;
  globalId: string;
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
      });
  }
  getUserId(id, index) {
    this.index = index;
    this.userId = id;
    this.router.navigateByUrl('manage-user-roles');
  }
  getGlobalId(id, roleName) {
    this.globalId = id;
    this.choosedRole = roleName;
  }

  changeOnConfirm() {
    this.router.navigate([{ outlets: { bookPopup: [ 'update-book' ] }}]); 
    this.manageUserRolesService.changeGlobalRoleDetails(this.userId, this.globalId);
    this.manageUserRolesRequestData[this.index]['globalRoles'][0]['roleName'] = this.choosedRole;
    this.choosedRole = 'Not Selected';
  }

  getGlobalRoleData() {
    this.manageUserRolesService.getGlobalRoleDetails()
      .subscribe(res => {
        this.globalRolesRequestData = res;
      });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

}
