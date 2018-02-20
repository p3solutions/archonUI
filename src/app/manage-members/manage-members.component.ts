import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ManageMembers } from '../manage-members';
import { ManageMembersService } from './manage-members.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceRolesObject, RoleObject } from '../workspace-objects';
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
  exampleData = {
    data: [
      {
        id: '1',
        name: 'Tiger Nixon',
        position: 'System Architect',
        salary: '$320,800',
        start_date: '2011/04/25',
        office: 'Edinburgh',
        extn: '5421'
      },
      {
        id: '2',
        name: 'Garrett Winters',
        position: 'Accountant',
        salary: '$170,750',
        start_date: '2011/07/25',
        office: 'Tokyo',
        extn: '8422'
      },
      {
        id: '2',
        name: 'Garrett Winters',
        position: 'Accountant',
        salary: '$170,750',
        start_date: '2011/07/25',
        office: 'Tokyo',
        extn: '8422'
      },
      {
        id: '2',
        name: 'Garrett Winters',
        position: 'Accountant',
        salary: '$170,750',
        start_date: '2011/07/25',
        office: 'Tokyo',
        extn: '8422'
      }
    ]
  };
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
      console.log(res);
      });
  }

  onDelete(id: any): void {
    console.log('need to delete data with id:', id);
    // this.manageMembers = this.manageMembers.filter(h => h !== this.manageMembers[e]);
    // this.manageMembersService.deleteManageMembersData(e).subscribe();
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
    /* this.memberPrivilegeParam = {
      id: this.userinfoService.getUserId(),
      userId: wsAccess.user.id,
      workspaceId: this.workspaceId,
      roleId: wsAccess.workspaceRole.id
    }; */
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
    console.log('passed xData', xData);
    this.table = $('#manage-members-table').DataTable({
      'ajax': function (data, callback, settings) { callback(xData); },
      'columns': [
        {
          'className': 'fa fa-plus-circle fa-lg archon-icon disp-bl',
          'orderable': false,
          'data': null,
          'defaultContent': '',
          'title': 'View More'
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
      ],
      'order': [[1, 'asc']]
    });
    $('#manage-members-table tbody').off('click', 'td.archon-icon').on('click', 'td.archon-icon', function () {
      const tr = $(this).closest('tr');
      const row = thisComponent.table.row(tr);
      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        $(this).removeClass('fa-minus-circle').addClass('fa-plus-circle');
        // $(this).attr('data-tooltip', 'Expand');
      } else {
        // Open this row
        const rowDataObj = row.data();
        rowDataObj.roleList = thisComponent.wsRoleList;
        rowDataObj.permissionList = thisComponent.permissionList;
        const hidTbl = thisComponent.hiddenTable(rowDataObj);
        row.child(hidTbl).show();
        tr.addClass('shown');
        $(this).removeClass('fa-plus-circle').addClass('fa-minus-circle');
        // $(this).attr('data-tooltip', 'Collapse');
      }
    });
    $('#manage-members-table tbody').off('click', 'td .delete-user').on('click', 'td .delete-user', function () {
      const tr = $(this).closest('tr');
      const row = thisComponent.table.row(tr);
      const rowData: any = row.data();
      console.log(rowData);
      thisComponent.onDelete(rowData.id);
    });
  }

  hiddenTable(wsAccess) {
    // /*
    let roleDropdown = `<select id="roleList">`;
    wsAccess.roleList.forEach(role => {
      roleDropdown += `
                        <option value="${role.id}">${role.roleName}</option>
                      `;
    });
    roleDropdown += `</select>`;
    const roleTr = `<tr class="toggle-child">
                      <th class="col-md-4 archon-names archon-names-100">
                        <div data-tooltip="Role">
                          <span class="trim-text w-180">Role</span>
                        </div>
                      </th>
                      <td class="col-md-5">
                        <span class="toggle-show">${wsAccess.workspaceRole.name}</span>
                        <span class="toggle-hide">
                          ${roleDropdown}
                        </span>
                      </td>
                      <td class="col-md-1">
                        <div *ngIf="(wsAccess.workspaceRole.id !== '5a587bd090689754178847c1') && !showRoleDropdown">
                          <i class="fa fa-pencil archon-icon disp-bl icon-disabled"></i>
                        </div>
                        <div *ngIf="(wsAccess.workspaceRole.id !== '5a587bd090689754178847c1') && !showRoleDropdown"
                        (click)="toggleRoleDropdown()" data-tooltip="Edit">
                          <i class="fa fa-pencil archon-icon disp-bl"></i>
                        </div>
                        <div *ngIf="showRoleDropdown && !roleUpdated" (click)="updateRole()" data-tooltip="Update">
                          <i class="fa fa-check-circle archon-icon disp-bl" aria-hidden="true"></i>
                        </div>
                        <div  *ngIf="roleUpdated" (click)="toggleRoleDropdown()" data-tooltip="Saved">
                          <i class="fa fa-check archon-icon disp-bl" aria-hidden="true"></i>
                        </div>
                      </td>
                    </tr>`;
    let permissionDropdown = `<select id="roleList">`;
    wsAccess.permissionList.forEach(permission => {
      permissionDropdown += `
                          <option value="${permission}">${permission}</option>
                        `;
    });
    permissionDropdown += `</select>`;
    let serviceTr;
    const serviceLen = wsAccess.serviceActions.length;
    wsAccess.serviceActions.forEach((service, index) => {
      serviceTr += `<tr class="toggle-child">
                      <th class="col-md-4 archon-names ${(service.serviceName.length < 12) ? 'archon-names-100' : ''}">
                        <div data-tooltip="${service.serviceName}">
                          <span class="trim-text w-180">${service.serviceName}</span>
                        </div>
                      </th>
                      <td class="col-md-5">
                        <span class="toggle-show">${service.serviceActionType}</span>
                        <span class="toggle-hide">
                          ${permissionDropdown}
                        </span>
                      </td>`;
      console.log(serviceLen, index);
      if (index === 0) {
        serviceTr += `<td rowspan="${serviceLen}" class="col-md-1 tooltip-left-45">
                        <div  (click)="toggleServiceDropdown()" data-tooltip="Edit">
                          <i class="fa fa-pencil archon-icon disp-bl"></i>
                        </div>
                        <div (click)="assignPermission()" data-tooltip="Update">
                          <i class="fa fa-check-circle archon-icon disp-bl" aria-hidden="true"></i>
                        </div>
                        <div *ngIf="permitUpdated" data-tooltip="Saved">
                          <i class="fa fa-check archon-icon disp-bl" aria-hidden="true"></i>
                        </div>
                      </td>`;
      }
      serviceTr += `</tr>`;
    });

    const hiddenTableHtml = `<table cellpadding="5" cellspacing="0" border="0" class="table table-hover table-bordered mem-priv">
                                ${roleTr}
                                ${serviceTr}
                              </table>`;
    console.log(hiddenTableHtml);
    // */
    // `d` is the original data object for the row
   /*
    return `<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">
      <tr>
      <td>Full name:</td>
      <td> ${wsAccess.name} </td>
      </tr>
      <tr>
      <td>Extension number:</td>
      <td> ${wsAccess.extn} </td>
      </tr>
      <tr>
      <td>Extra info:</td>
      <td>And any further details here (images etc)...</td>
      </tr>
      </table>`;
      */
    return hiddenTableHtml;
  }
  toggleRoleDropdown() {
    console.log('clicked');
  }
}
