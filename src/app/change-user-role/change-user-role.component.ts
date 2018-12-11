import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ChangeUserRoleService } from './change-user-role.service';
import { GlobalRoles } from '../global-roles';

@Component({
  selector: 'app-change-user-role',
  templateUrl: './change-user-role.component.html',
  styleUrls: ['./change-user-role.component.css']
})
export class ChangeUserRoleComponent implements OnInit {

  @Input() selectedUserId: string;
  @Input() preSelectedRole: string;
  @Input() userName: string;
  @Output() onconfirm = new EventEmitter<boolean>();
  @Output() messageSuccessEvent = new EventEmitter<string>();
  @Output() messageErrorEvent = new EventEmitter<string>();
  globalRoleId: string;
  successMessage: any;
  errorMessage: any;
  responseData: any;
  globalRolesRequestData: GlobalRoles[];
  constructor(
    private changeUserRoleService: ChangeUserRoleService
  ) { }

  ngOnInit() {
    this.getGlobalRoleData();
  }

  getGlobalRoleData() {
    this.changeUserRoleService.getGlobalRoleDetails()
      .subscribe(res => {
        this.globalRolesRequestData = res;
      });
  }

  getGlobalId(roleId) {
    this.globalRoleId = roleId;
  }

  changeOnConfirm() {
    this.changeUserRoleService.changeGlobalRoleDetails(this.selectedUserId, this.globalRoleId)
    .subscribe(data => {
      this.onconfirm.emit(true);
      this.responseData = data;
      if (this.responseData) {
        this.sendSuccessMessage();
        }
    });
    // this.manageUserRolesRequestData[this.index]['globalRoles'][0]['roleName'] = this.choosedRole;
  }
  sendSuccessMessage() {
    if (this.responseData.httpStatus === 200) {
      this.successMessage = true;
    } else {
      this.successMessage = false;
    }
    this.messageSuccessEvent.emit(this.successMessage);
    }
}
