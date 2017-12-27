import { Component, OnInit } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css']
})
export class ManageUserRolesComponent implements OnInit {
  manageUserRolesRequestData: ManageUserRoles[];
  constructor(    private manageUserRolesService: ManageUserRolesService) { }

  ngOnInit() {
    this.getManageUserRolesData();
  }
  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(data => {
        this.manageUserRolesRequestData = data;
      });
     console.log('manage-members-component', this.manageUserRolesRequestData);
  }

}
