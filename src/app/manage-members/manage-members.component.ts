import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ManageMembers } from '../manage-members';
import { ManageMembersService } from './manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceRolesObject, RoleObject, AnyObject } from '../workspace-objects';
import { UserinfoService } from '../userinfo.service';
import { ManageUserRoles } from '../manage-user-roles';

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
  showMemPriv = false;
  varArray = [];
  @Input() passedWSRoleList: any;
  @Output() passedWSRoleListChange = new EventEmitter<WorkspaceRolesObject[]>();
  table: any;
  wsRoleList: WorkspaceRolesObject[];
  permissionList: string[];

  constructor(
    private manageMembersService: ManageMembersService,
    private userinfoService: UserinfoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.isAvailable = false;
      this.workspaceId = params.id;
      this.getManageMembersData(this.workspaceId);
    });
    this.getRoleList();
    this.getPermissionList();
  }

  setPassedWSRoleList(passedValue) {
    this.passedWSRoleList = passedValue; // re-use the passed value in child component
  }

  generatePrivVariables(len) {
    for (let i = 0; i < len; i++) {
      this.varArray[i] = false;
    }
  }
  getManageMembersData(workspaceId) {
    this.manageMembersService.getWSMembers(workspaceId)
    .subscribe(res => {
      this.isAvailable = true;
      this.generatePrivVariables(res.length);
      this.manageMembers = res;
      this.manageMemTable({data: this.manageMembers});
      });
  }

  onDelete(id: any, tr): void {
    this.manageMembersService.deleteManageMembersData({id: id}).subscribe( res => {
      if (res && res.length > 0) {
        tr.remove(); // on success delete the entire row
      }
    });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  hideElementById(id) {
    const e = document.getElementById(id);
    e.style.display = 'none';
  }
  showElementById(id) {
    const e = document.getElementById(id);
    e.style.display = 'block';
  }
  showPermission(i, _event, wsAccess) {
    _event.stopPropagation();
    this.hideElementById('showPermission-' + i);
    this.varArray[i] = true;
  }
  hidePermission(i, _event, wsAccess) {
    _event.stopPropagation();
    this.showElementById('showPermission-' + i);
    this.varArray[i] = false;
  }

  getRoleList() {
    if (!this.wsRoleList || this.wsRoleList.length === 0) {
      this.manageMembersService.getwsRoleList().subscribe(res => {
        this.wsRoleList = res;
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
          'className': 'col-md-1',
          'orderable': false,
          'data': null,
          'defaultContent': `<div data-tooltip="Delete" class="delete-user">
                              <i class="fa fa-trash-o archon-icon disp-bl"></i>
                            </div>`,
          'title': 'Delete'
        }
      ]
      // 'order': [[0, 'asc']]
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
        console.log('aadjjrtgjrtjgbrtngvjensfjcse jgv ref', row.child(hidTbl));
        row.child(hidTbl).show();
        $(this).find('.fa-plus-circle').addClass('fa-minus-circle').removeClass('fa-plus-circle');
      }
    });
    $('#manage-members-table tbody').off('click', 'td .delete-user').on('click', 'td .delete-user', function () {
      const tr = $(this).closest('tr');
      const row = thisComponent.table.row(tr);
      const rowData: any = row.data();
      thisComponent.onDelete(rowData.id, tr);
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
            console.log('updateServiceActions returns', res);
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
              console.log('updateRole returns', res);
              if (res && res.length > 0) {
                tr.removeClass('toggle');
              }
            });
        }
      }
    } else { // edit clicked
      console.log('edit clicked');
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
                      <th class="col-md-4 archon-names archon-names-100">
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
                      <td class="col-md-1 toggle-btn edit">
                        <div data-tooltip="Edit"  class="role-btn role-edit"
                           owner="${wsAccess.workspaceRole.name === 'ROLE_OWNER' ? 'true' : 'false'}">
                          <i class="fa fa-pencil archon-icon disp-bl
                           ${wsAccess.workspaceRole.name === 'ROLE_OWNER' ? 'icon-disabled' : ''}" ></i>
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
      serviceTr += `<tr class="toggle-child service-actions" user-id="${wsAccess.user.id}">
                      <th class="col-md-4 archon-names ${(service.serviceName.length < 12) ? 'archon-names-100' : ''}">
                        <div data-tooltip="${service.serviceName}">
                          <span class="trim-text w-180">${service.serviceName}</span>
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
        serviceTr += `<td rowspan="${serviceLen}" class="col-md-1 toggle-btn tooltip-left-45 edit">
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
                              // console.log(hiddenTableHtml);
    return hiddenTableHtml;
  }
}
