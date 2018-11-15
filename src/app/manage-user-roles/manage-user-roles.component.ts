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
  isProgress: boolean;
  manageUserRolesRequestData: ManageUserRoles[];
  selectedUserId: string;
  preSelectedRole: any;
  constructor(
    private manageUserRolesService: ManageUserRolesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getManageUserRolesData();
    this.isProgress = true;
  }
  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(res => {
        this.manageUserRolesRequestData = res;
        this.isAvailable = true;
        this.isProgress = false;
      });
  }
  getUserId(id, roleName) {
    this.selectedUserId = id;
    this.preSelectedRole = roleName;
    document.getElementById('selected-role').innerHTML = this.preSelectedRole;
  }

  gotoManagementPanel() {
    this.router.navigate(['workspace/management-panel']);
  }

  onconfirm(confirm: boolean) {
    if (confirm) {
      this.getManageUserRolesData();
    }
  }

  getUserProfile(userobj) {
    localStorage.setItem('userId', userobj.id);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}

