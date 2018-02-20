import { Component, OnInit, Input, Output, EventEmitter, keyframes, Directive, ViewContainerRef } from '@angular/core';
import { ManageMembers } from '../manage-members';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { WorkspaceRolesObject } from '../workspace-objects';

@Component({
  selector: 'app-manage-member-privileges',
  templateUrl: './manage-member-privileges.component.html',
  styleUrls: ['./manage-member-privileges.component.css']
})
export class ManageMemberPrivilegesComponent implements OnInit {

  @Input() wsAccess: ManageMembers;
  serviceList: any;
  permissionList: any;
  @Input() wsRoleList: WorkspaceRolesObject[];
  @Output() fetchedWSRoleList = new EventEmitter<WorkspaceRolesObject[]>();
  showRoleDropdown: any;
  showServiceDropdown: any;
  roleUpdated = false;
  permitUpdated = false;

  constructor(private manageMembersService: ManageMembersService,
    public viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    console.log(this.wsAccess);
    this.showRoleDropdown = false;
    this.showServiceDropdown = false;
    this.getServiceList();
    if (!this.wsRoleList || this.wsRoleList.length === 0) { // it will not fetch from backend if value already is passed
      this.getWSRoleList(this.wsAccess.workspaceRole.id);
    }
    this.getPermissionList();
  }

  getServiceList() {
    this.manageMembersService.getServiceActions()
    .subscribe(res => {
      this.serviceList = res;
    });
  }

  getPermissionList() {
    this.manageMembersService.getServiceActions()
      .subscribe(res => {
        this.permissionList = res;
    });
  }

  getWSRoleList(selectedRoleId) {
    this.manageMembersService.getwsRoleList()
      .subscribe(res => {
        this.wsRoleList = res;
        this.fetchedWSRoleList.emit(this.wsRoleList); // pass the fetched value to parent component for re-use
      });
  }

  toggleRoleDropdown() {
    this.showRoleDropdown = true;
  }
  toggleServiceDropdown() {
    this.showServiceDropdown = true;
  }

  updateRole() {
    this.roleUpdated = true;
  }
  assignPermission() {
    this.permitUpdated = true;
  }
}
