import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { AddMembersService } from './add-members.service';
import { ActivatedRoute } from '@angular/router';
import { UserWorkspaceService } from '../user-workspace.service';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { ErrorObject } from '../error-object';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit, OnChanges {
  userList = [];
  @Input() existingUsers: any;
  selectedUserIdList = [];
  workspaceId: string;
  wsRoleList = [];
  errorObject: ErrorObject;
  isOwnerExist: boolean;
  isProgress: boolean;
  isLoading = false;
  @Output() updateExistingUsers = new EventEmitter<boolean>(); // child to parent
  @Input() extModifiedExistingUsers: any;
  @Input() ownerAlreadyExist: boolean;

  constructor(
    private route: ActivatedRoute,
    private addMembersService: AddMembersService,
    private manageMembersService: ManageMembersService
   ) {
      this.route.params.subscribe(params => {
        this.workspaceId = params.id;
      });
    }

  ngOnInit() {
    this.getRoleList();
  }

  ngOnChanges(change: SimpleChanges) {
    if ((change.existingUsers && change.existingUsers.currentValue) ||
      (change.extModifiedExistingUsers && change.extModifiedExistingUsers.currentValue)) {
      this.existingUsers = change.existingUsers ? change.existingUsers.currentValue : change.extModifiedExistingUsers.currentValue;
      this.getUserList();
    }
  }

  getUserList() {
    this.isLoading = true;
    this.userList = [];
    this.addMembersService.getAllUsers()
    .subscribe((res: any) => {
      console.log(res);
      res.usersList.forEach((user: any) => {
        this.isLoading = false;
        this.userList.push(user);
        // if (user.globalRoles[0].roleName === 'ROLE_MEMBER' || user.globalRoles[0].roleName === 'ROLE_ADMIN' ||
        // user.globalRoles[0].roleName === 'ROLE_NOT_ASSIGNED') {
        //     let existingUserIndex;
        //     for (let i = 0; i < this.existingUsers.length; i++) {
        //       if (this.existingUsers[i] === user.id) {
        //         existingUserIndex = i;
        //         break;
        //       }
        //     }
        //     if (existingUserIndex === undefined) {
        //       this.userList.push(user);
        //     }
        //   }
      });
    });
  }

  getRoleList() {
    this.manageMembersService.getwsRoleList().subscribe(res => {
      this.wsRoleList = res;
    });
  }

  isAddMemberReady() {
    this.errorObject = new ErrorObject;
    if (this.selectedUserIdList.length === 0) {
      this.errorObject.message = 'No user is selected.';
      this.errorObject.show = true;
    } else {
      this.selectedUserIdList.forEach(user => {
        if (!user.roleId || user.roleId === 'Select') {
          this.errorObject.message = 'A role is not assigned.';
          this.errorObject.show = true;
        }
      });
    }
    return !this.errorObject.show;
  }
  addMembers() {
    if (this.isAddMemberReady()) {
      this.isProgress = true;
      this.selectedUserIdList.forEach(user => {
        const params = {
          'userId': user.id,
          'workspaceId': this.workspaceId,
          'workspaceRoleId': user.roleId
        };
        this.addMembersService.addMembers(params)
        .subscribe(res => {
          if (res.success) {
            this.isProgress = false;
            this.selectedUserIdList = [];
            this.errorObject = null;
            this.updateExistingUsers.emit(true);
          }
        });
      });
    }
  }

  setRole(user, event) {
    // depends on the html structure order
    const checkbox: HTMLInputElement = event.target.parentNode.parentNode.childNodes[1].childNodes[0];
    // checkbox.click();
    const index = this.selectedUserIdList.indexOf(user);
    const roleId = event.target.value;
    if (index !== -1) {
      this.selectedUserIdList[index].roleId = roleId;
    }
  }
  updateSelectList(user: any, event) {
    const checked = event.target.checked;
    if (checked) {
      user.roleId = event.target.parentNode.parentNode.children[2].children[0].value; // depends on the html structure order
      this.selectedUserIdList.push(user);
      if (this.errorObject) {
        this.errorObject = null;
      }
    } else {
      const index = this.selectedUserIdList.indexOf(user);
      this.selectedUserIdList.splice(index, 1);
    }
  }
  closeErrorMsg() {
    this.errorObject = null;
  }

  // role selection check before adding members
  // owner can be selected only once for a WS, if it already exist, disable owner option in dropdown
}
