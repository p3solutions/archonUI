import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ManageMembers } from '../manage-members';
import { ManageMembersService } from './manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceRolesObject, RoleObject, AnyObject, MemberObject } from '../workspace-objects';
import { UserinfoService } from '../userinfo.service';
import { ManageUserRoles } from '../manage-user-roles';
import { ErrorObject } from '../error-object';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { Logs } from 'selenium-webdriver';
// import * as $ from 'jquery';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent implements OnInit {
  workspaceId: string;
  manageMembers: ManageMembers[];
  isAvailable = false;
  memberPrivilegeParam: any;
  exisitingUserIds = [];
  varArray = [];
  table: any;
  wsRoleList: WorkspaceRolesObject[];
  permissionList: string[];
  extModifiedExistingUsers = [];
  deleteMemberId: any;
  deleteNotif = new ErrorObject();
  delProgress = false;
  ownerAlreadyExist = false;
  workspaceRoleId: any;
  userId: any;
  successMsg: string;
  errorMsg: any;

  constructor(
    private manageMembersService: ManageMembersService,
    private userinfoService: UserinfoService,
    private route: ActivatedRoute,
    private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isAvailable = false;
      this.workspaceId = params.id;
      this.getManageMembersData(this.workspaceId);
    });
    this.workspaceHeaderService.updateCheckActiveTab('Manage Members');
    this.getRoleList();
    this.getPermissionList();
  }

  getManageMembersData(workspaceId) {
    this.manageMembersService.getWSMembers(workspaceId)
      .subscribe(res => {
        console.log(res);
        this.isAvailable = true;
        this.manageMembers = res;
        this.manageMemTable({ data: this.manageMembers });
        this.exisitingUserIds = [];
        this.manageMembers.forEach((member: MemberObject) => {
          if (member.workspaceRole.name === 'ROLE_OWNER') {
            this.ownerAlreadyExist = true;
          }
          this.exisitingUserIds.push(member.user.id);
        });
      });
  }

  deletemember(id) {
  this.deleteMemberId = id;
  }

  confirmDelete(): void {
    this.delProgress = true;
    this.manageMembersService.deleteManageMembersData({ userIds: [this.deleteMemberId] }, this.workspaceId).subscribe(res => {
      this.delProgress = false;
      if (res.success) {
        this.successMsg = res.data;
        // tr.remove(); // Removing the row.
        this.postDelete();
      } else {
        this.deleteNotif.show = true;
        this.errorMsg = res.errorMessage;
      }
    });
  }
  closeErrorMsg() {
    this.deleteNotif = new ErrorObject();
  }
  postDelete() {
    const close: HTMLButtonElement = document.querySelector('#confirmDelMemModal #dismissmodel');
    close.click();
    setTimeout(() => {
      document.getElementById('addperssmsg').click();
    }, 1000);
    this.getManageMembersData(this.workspaceId);
    this.extModifiedExistingUsers = [];
    this.extModifiedExistingUsers = this.exisitingUserIds;
    const index = this.exisitingUserIds.indexOf(this.deleteMemberId);
    this.exisitingUserIds.splice(index, 1);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getRoleList() {
    if (!this.wsRoleList || this.wsRoleList.length === 0) {
      this.manageMembersService.getwsRoleList().subscribe(res => {
        this.wsRoleList = res;
        console.log(this.wsRoleList);
      });
    }
  }
  getPermissionList() {
    if (!this.permissionList || this.permissionList.length === 0) {
      this.manageMembersService.getServiceActions().subscribe(res => {
        this.permissionList = res;
      });
    }
  }

  changerole(changerole, userid) {
    this.workspaceRoleId = changerole;
    this.userId = userid;
    document.getElementById('changeroles').click();
  }

  updateRole() {
    const params = {
      userId: this.userId,
      workspaceId: this.workspaceId,
      workspaceRoleId: this.workspaceRoleId
    };
    this.manageMembersService.updateRole(params).subscribe(res => {
      if (res) {
        this.successMsg = 'Change Role Successfully';
        document.getElementById('addmemssmsg').click();
      } else {
        this.errorMsg = res.errorMessage;
        document.getElementById('addmemermsg').click();
      }

    });
  }

  resetselectedValues() {
    this.getManageMembersData(this.workspaceId);
  }

  updatepermission(type, service, userid) {
    const params = {
      userId: userid,
      workspaceId: this.workspaceId,
      permissions: [{
        serviceId: service.serviceId,
        serviceActionType: type,
        enableService: service.enableService
      }],
    };
    this.manageMembersService.updateServiceActions(params).subscribe(res => {
      if (res) {
        this.successMsg = 'Update Successfully';
        document.getElementById('addperssmsg').click();
      } else {
        this.errorMsg = res.errorMessage;
        document.getElementById('addmemermsg').click();
      }
    });
  }

  manageMemTable(xData) {
    const thisComponent = this;
    if (this.table) {
      this.table.destroy();
    }
    this.table = $('#manage-members-table').DataTable({
      'ajax': function (data, callback, settings) { callback(xData); },
      'columns': [
        {
          'className': 'exp-coll tooltip-exp-coll archon-names-100',
          'orderable': false,
          'data': null,
          'defaultContent': `<div data-tooltip="Expand / Collapse" class="archon-names-100">
                              <i class="fa fa-plus-circle fa-lg archon-icon disp-bl"></i>
                            </div>
                            `,
          'title': ''
        },
        { 'data': 'user.name' },
        { 'data': 'workspaceRole.name' },
        {
          'render': function (data, type, full, meta) {
            return `<div data-tooltip="Delete" class="delete-user">
            <a data-toggle="modal" href="#confirmDelMemModal">
            <i class="fa fa-trash-o archon-icon disp-bl ${full.workspaceRole.name === 'ROLE_OWNER' ?
                'icon-disabled' : ''}"></i>
              </a>
            </div>`;
          }
        }
      ],
      'order': [[1, 'asc']]
    });
    $('#manage-members-table tbody').off('click', 'td.exp-coll').on('click', 'td.exp-coll', function () {
      const tr = $(this).closest('tr');
      const row = thisComponent.table.row(tr);
      if (row.child.isShown()) {
        // This row is already open - close it
        $(this).find('.fa-minus-circle').addClass('fa-plus-circle').removeClass('fa-minus-circle');
        row.child.remove();
      } else {
        // Open this row
        const rowDataObj = row.data();
        rowDataObj.roleList = thisComponent.wsRoleList;
        rowDataObj.permissionList = thisComponent.permissionList;
        const hidTbl = thisComponent.hiddenTable(rowDataObj);
        row.child(hidTbl).show();
        $(this).find('.fa-plus-circle').addClass('fa-minus-circle').removeClass('fa-plus-circle');
      }
    });
    $('#manage-members-table tbody').off('click', 'td .delete-user').on('click', 'td .delete-user', function () {
      if ($(this).find('.icon-disabled').length === 1) {
        return false;
      }
      const tr = $(this).closest('tr');
      const row = thisComponent.table.row(tr);
      const rowData: any = row.data();
      thisComponent.deleteMemberId = rowData.user.id;
      // thisComponent.onDelete(rowData.user.id, tr);
    });
    $('#manage-members-table tbody')
      .off('click', '.toggle-btn .role-edit, .toggle-btn .role-update')
      .on('click', '.toggle-btn .role-edit, .toggle-btn .role-update', function () {
        // true for owner, false for other roles, null for services-edit-btn
        if ($(this).hasClass('role-edit') && $(this).attr('owner') !== 'true') {
          thisComponent.toggleDropdown($(this), false);
        } else if ($(this).hasClass('role-update')) {
          thisComponent.toggleDropdown($(this), true);
        }
      });
  }
  toggleDropdown(_this, isUpdate) {
    const tr = _this.closest('tr');
    const isServiceClick = _this.hasClass('service-click');
    const _serviceActions = _this.closest('table').find('.toggle-child.service-actions');
    if (isUpdate) {
      if (isServiceClick) { // update Services functionality
        const permissions = [];
        for (let index = 0; index < _serviceActions.length; index++) {
          const _element = $(_serviceActions[index]);
          if (_element.hasClass('service-actions')) {
            const oldPermission = _element.find('.toggle-show').attr('old-permission');
            const newPermission = _element.find('.permissionList').val();
            if (oldPermission !== newPermission) {
              permissions.push({
                serviceId: _element.find('.toggle-show').attr('service-id'),
                serviceActionType: newPermission
              });
            }
          }
        }
        const params: AnyObject = { workspaceId: this.workspaceId, userId: $(tr).attr('user-id') };
        if (permissions.length > 0) { // only update when at least one permission is changed
          params.permissions = permissions;
          this.manageMembersService.updateServiceActions(params).subscribe(res => { // API params are still not confirmed
            // TODO: update data using res
            if (res && res.length > 0) {
              _serviceActions.removeClass('toggle');
            }
          });
        }
      } else { // update Roles functionality
        const oldRoleId = tr.find('.toggle-show').attr('old-permission');
        const newRoleId = tr.find('.roleList').val();
        if (oldRoleId !== newRoleId && newRoleId !== '0') {
          const params: AnyObject = {
            userId: tr.find('.toggle-show').attr('old-permission'),
            workspaceId: this.workspaceId,
            workspaceRoleId: newRoleId
          };
          this.manageMembersService.updateRole(params).subscribe(res => { // API params are still not confirmed
            // TODO: update row data / dataTable data  using res
            if (res && res.length > 0) {
              tr.removeClass('toggle');
            }
          });
        }
      }
    } else { // edit clicked
      tr.addClass('toggle');
      if (isServiceClick) {
        _serviceActions.addClass('toggle');
      }
    }
  }
  hiddenTable(wsAccess) {
    let roleDropdown = `<select class="roleList">
                          <option value="0">SELECT ROLES</option>
                        `;
    wsAccess.roleList.forEach(role => {
      roleDropdown += `
                        <option  value="${role.id}" ${role.roleName === 'ROLE_OWNER' ? 'disabled' : ''}>${role.roleName}</option>
                      `;
    });
    roleDropdown += `</select>`;
    const roleTr = `<tr class="toggle-child" user-id="${wsAccess.user.id}">
                      <th class="col-md-4 text-center tooltip-left-47 tooltip-btm-105">
                        <div data-tooltip="Role">
                          <span class="trim-text w-180">Role</span>
                        </div>
                      </th>
                      <td class="col-md-5">
                        <span class="toggle-show" old-role="${wsAccess.workspaceRole.id}">${wsAccess.workspaceRole.name}</span>
                        <span class="toggle-hide">
                          ${roleDropdown}
                        </span>
                      </td>
                      <td class="col-md-1 toggle-btn edit tooltip-left-37">
                        <div data-tooltip="Edit"  class="role-btn role-edit"
                           owner="${wsAccess.workspaceRole.name === 'ROLE_OWNER' ? 'true' : 'false'}">
                          <i class="fa fa-pencil archon-icon disp-bl ${wsAccess.workspaceRole.name === 'ROLE_OWNER' ?
        'icon-disabled' : ''}" ></i>
                        </div>
                        <div data-tooltip="Update" class="role-btn role-update">
                          <i class="fa fa-check archon-icon disp-bl" aria-hidden="true"></i>
                        </div>
                      </td>
                    </tr>`;
    let permissionDropdown = `<select class="permissionList">`;
    wsAccess.permissionList.forEach(permission => {
      permissionDropdown += `
                          <option value="${permission}">${permission}</option>
                        `;
    });
    permissionDropdown += `</select>`;
    let serviceTr = '';
    const serviceLen = wsAccess.serviceActions.length;
    wsAccess.serviceActions.forEach((service, index) => {
      const modifiedServiceName = service.serviceName.replace('SERVICE', '').replace(new RegExp('_', 'gm'), ' ');
      serviceTr += `<tr class="toggle-child service-actions" user-id="${wsAccess.user.id}">
                      <th class="col-md-4 text-center ${(modifiedServiceName.length < 12) ?
          'archon-names-100 tooltip-btm-105' :
          'archon-names-200 tooltip-left-25 tooltip-btm-105'}">
                        <div data-tooltip="${modifiedServiceName}">
                          <span class="trim-text w-250">${modifiedServiceName}</span>
                        </div>
                      </th>
                      <td class="col-md-5">
                        <span class="toggle-show" old-permission="${service.serviceActionType}"
                          service-id="${service.serviceId}">${service.serviceActionType}</span>
                        <span class="toggle-hide">
                          ${permissionDropdown}
                        </span>
                      </td>`;
      if (index === 0) {
        serviceTr += `<td rowspan="${serviceLen}" class="col-md-1 toggle-btn tooltip-left-37 edit">
                        <div data-tooltip="Edit" class="role-btn role-edit service-click">
                          <i class="fa fa-pencil archon-icon disp-bl"></i>
                        </div>
                        <div data-tooltip="Update" class="role-btn role-update service-click" old-role="${service.serviceActionType}">
                          <i class="fa fa-check archon-icon disp-bl" aria-hidden="true"></i>
                        </div>
                      </td>`;
      }
      serviceTr += `</tr>`;
    });
    const hiddenTableStyle = `<style>
                                .table {
                                  margin-bottom: 0;
                                }
                                .table>tbody>tr>td {
                                  vertical-align: middle;
                                }
                                th.disp-bl {
                                    display: table-column;
                                }
                                .toggle .toggle-show {
                                    display: none;
                                }
                                .toggle-hide {
                                  display: none;
                                }
                                .toggle .toggle-hide {
                                  display: block;
                                }
                                .role-btn {
                                  display: none;
                                }
                                .edit .role-edit {
                                  display: block;
                                }
                                .toggle .toggle-btn .role-edit {
                                  display: none;
                                }
                                .toggle .toggle-btn .role-update {
                                  display: block;
                                }
                              </style>`;
    const hiddenTableHtml = `<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-bordered mem-priv">
                                ${roleTr}
                                ${serviceTr}
                              </table>
                              ${hiddenTableStyle}
                              `;
    return hiddenTableHtml;
  }

  onUpdateExistingUsers(e) {
    if (e) {
      this.getManageMembersData(this.workspaceId);
    }
  }
}
