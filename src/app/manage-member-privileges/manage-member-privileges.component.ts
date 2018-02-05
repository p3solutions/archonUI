import { Component, OnInit, Input, Output, EventEmitter, keyframes } from '@angular/core';
import { ManageMembers } from '../managemembers';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { WorkspaceRolesPojo } from '../WorkspacePojo';

@Component({
  selector: 'app-manage-member-privileges',
  templateUrl: './manage-member-privileges.component.html',
  styleUrls: ['./manage-member-privileges.component.css']
})
export class ManageMemberPrivilegesComponent implements OnInit {

  @Input() wsAccess: ManageMembers;
  serviceList: any;
  permissionList: any;
  @Input() wsRoleList: WorkspaceRolesPojo[];
  @Output() fetchedWSRoleList = new EventEmitter<WorkspaceRolesPojo[]>();
  showRoleDropdown: any;
  showServiceDropdown: any;
  roleUpdated = false;
  permitUpdated = false;

  constructor(private manageMembersService: ManageMembersService) { }

  ngOnInit() {
    console.log(this.wsAccess);
    this.showRoleDropdown = false;
    this.showServiceDropdown = false;
    this.serviceList = this.getServiceList();
    if (!this.wsRoleList || this.wsRoleList.length === 0) { // it will not fetch from backend if value already is passed
      this.getWSRoleList(this.wsAccess.workspaceRole.id);
    }
    this.permissionList = this.getPermissionList();
  }

  getServiceList() {
    return [
      { id: '123abc3', name: 'Service 3', permission: 'WRITE_ONLY' },
      { id: '123abc2', name: 'service 2', permission: 'READ_ONLY' },
      { id: '123abc', name: 'SERVICE 1', permission: 'NOT_ASSIGNED' },
      { id: '123abc3', name: 'Service 3', permission: 'READ_WRITE' }
    ];
  }

  getPermissionList() {
    return [
      { id: '123abc',  permission: 'NOT_ASSIGNED', default: true },
      { id: '123abc2', permission: 'READ_ONLY', default: false },
      { id: '123abc3', permission: 'WRITE_ONLY', default: false },
      { id: '123abc3', permission: 'READ_WRITE', default: false }
    ];
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
