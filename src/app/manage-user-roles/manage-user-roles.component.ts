import { Component, OnInit } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';


@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css']
})
export class ManageUserRolesComponent implements OnInit {
  isAvailable = false;
  manageUserRolesRequestData: ManageUserRoles[];
  // globalRolesRequestData: 
  constructor(private manageUserRolesService: ManageUserRolesService, private router: Router) { }

  ngOnInit() {
    this.getManageUserRolesData();
    // this.getGlobalRolesData();
  }
  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(res => {
        this.manageUserRolesRequestData = res;
        this.isAvailable = true;
      });
  }

  // getGlobalRolesData() {
  //   this.manageUserRolesService.getGlobalRolesDetails()
  //     .subscribe(res => {
  //       this.m
  //     })
  // }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

}
