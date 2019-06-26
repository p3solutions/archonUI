import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ManageUserRolesService } from '../manage-user-roles/manage-user-roles.service';
import { GlobalGroup, RolesInfo } from '../global-roles';
import { RoleGroupInfo, } from '../configuration/configuration';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ConfigurationService } from '../configuration/configuration.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-role-group-configuration',
  templateUrl: './role-group-configuration.component.html',
  styleUrls: ['./role-group-configuration.component.css']
})
export class RoleGroupConfigurationComponent implements OnInit {
  displayedColumns: string[] = ['groupName', 'user', 'auditor', 'admin', 'dbadmin'];
  rolesAvailable: string[] = ['roleUser', 'roleAudit', 'roleAdmin', 'roleManageDb', 'roleManageArchon', 'roleSuper'];
  roleOfUser = '';
  globalGroup: GlobalGroup[] = [];
  RoleGroupList: RoleGroupInfo[] = [];
  roleList: RolesInfo[] = [];
  successMsg = '';
  dataSource = new MatTableDataSource<RoleGroupInfo>(this.RoleGroupList);
  @ViewChild(MatSort) sort: MatSort;
  constructor(private manageUserRolesService: ManageUserRolesService, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.findRoleOfUser();
    this.getAllRoles();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
  }

  getAllRoles() {
    this.configurationService.getAllUsers().subscribe(response => {
      this.roleList = response.data;
      this.getGlobalGroup();
    });
  }

  findRoleOfUser() {
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelperService = new JwtHelperService();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    const roles = token_data.roles;
    for (const item of roles) {
      if (item.roleName.replace(/_/g, ' ').replace(/ /g, '').toLocaleLowerCase().trim() === 'rolesuper') {
        this.roleOfUser = 'superadmin';
      }
      if (item.roleName.replace(/_/g, ' ').replace(/ /g, '').toLocaleLowerCase().trim() === 'roleadmin') {
        this.roleOfUser = 'admin';
      }
    }
  }

  getGlobalGroup() {
    if (this.roleOfUser !== '') {
      this.manageUserRolesService.getGlobalGroup(this.roleOfUser).subscribe(result => {
        this.globalGroup = result.data.globalRoles;
        this.createListOfGroupRoles();
      });
    }
  }

  createListOfGroupRoles() {
    let tempRoleGroupInfo: RoleGroupInfo = new RoleGroupInfo();
    let tempRoleInfo: RolesInfo = new RolesInfo();
    for (const item of this.globalGroup) {
      tempRoleGroupInfo = new RoleGroupInfo();
      tempRoleGroupInfo.groupName = item.groupName;
      for (const roles of this.rolesAvailable) {
        tempRoleInfo = this.roleList.find(a => a.roleName.replace(/_/g, ' ').replace(/ /g, '').toLocaleLowerCase() ===
          roles.replace(/ /g, '').toLocaleLowerCase());
        tempRoleGroupInfo[roles].roleId = tempRoleInfo.id;
        tempRoleGroupInfo[roles].roleName = tempRoleInfo.roleName;
        if (item.globalRoles.filter(a => a.roleName.replace(/_/g, ' ').replace(/ /g, '').toLocaleLowerCase() ===
          roles.replace(/ /g, '').toLocaleLowerCase()).length > 0) {
          tempRoleGroupInfo[roles].checked = true;
        }
      }
      this.RoleGroupList.push(tempRoleGroupInfo);
    }
    this.dataSource.data = this.RoleGroupList;
  }

  saveGroupRoleConfig() {
    if (this.roleOfUser === 'superadmin') {
      let tempOption = true;
      let roleId: string[] = [];
      for (const item of this.RoleGroupList) {
        roleId = [];
        for (const roles of this.rolesAvailable) {
          if (item[roles].checked) {
            roleId.push(item[roles].roleId);
          }
        }
        const param = {
          'globalName': item.groupName,
          'roleId': roleId
        };
        this.configurationService.saveRoleGroupConfiguration(param).subscribe(response => {
          if (response.httpStatus === 200) {
            tempOption = true;
            this.successMsg = 'Configuration saved successfully.';
          } else {
            tempOption = false;
          }
        },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
            } else {
              this.successMsg = err.error.message;
            }
          });
      }
      document.getElementById('success-popup-btn').click();
    } else {
      document.getElementById('success-popup-btn').click();
      this.successMsg = 'Only Super Admin can change the Groups and Roles configuration.';
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  reset() {
    this.RoleGroupList = [];
    this.dataSource.data = [];
    this.ngOnInit();
  }
}
