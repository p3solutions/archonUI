import { Component, OnInit } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';
import { GlobalRoles } from '../global-roles';


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
  constructor(private manageUserRolesService: ManageUserRolesService, private router: Router) { }

  ngOnInit() {
    this.getManageUserRolesData();
    this.getGlobalRolesData();
  }
  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(res => {
        this.manageUserRolesRequestData = res;
        this.isAvailable = true;
        console.log('manage-user-roles');
      });
  }

  selectGlobalRoles(data) {
     this.choosedRole = data;
  }

  getGlobalRolesData() {
    this.manageUserRolesService.getGlobalRolesDetails()
      .subscribe(res => {
        this.globalRolesRequestData = res;
        console.log('globalglobalglobal', this.globalRolesRequestData);
      });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

}
