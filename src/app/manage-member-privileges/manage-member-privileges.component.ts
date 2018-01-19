import { Component, OnInit, Input } from '@angular/core';
import { ManageMembers } from '../managemembers';

@Component({
  selector: 'app-manage-member-privileges',
  templateUrl: './manage-member-privileges.component.html',
  styleUrls: ['./manage-member-privileges.component.css']
})
export class ManageMemberPrivilegesComponent implements OnInit {

  @Input() wsAccess: ManageMembers;
  serviceList: any;
  permissionList: any;
  wsRoleList: any;
  showRoleDropdown: any;
  showServiceDropdown: any;
  roleUpdated = false;
  permitUpdated = false;

  constructor() { }

  ngOnInit() {
    this.showRoleDropdown = false;
    this.showServiceDropdown = false;
    this.serviceList = this.getServiceList();
    this.wsRoleList = this.getWSRoleList();
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

  getWSRoleList() {
    return [
      { íd: '123a', name: 'ROLE_MEMBER' },
      { íd: '123b', name: 'ROLE_OWNER' },
      { íd: '123c', name: 'ROLE_APPROVER'},
    ];
  }

  toggleRoleDropdown() {
    this.showRoleDropdown = true;
  }
  toggleServiceDropdown() {
    this.showServiceDropdown = true;
  }

  update() {
    this.roleUpdated = true;
  }
  assign() {
    this.permitUpdated = true;
  }
}
