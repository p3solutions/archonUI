import { Component, OnInit, Input, Output, SimpleChanges, OnChanges, EventEmitter, ViewChild } from '@angular/core';
import { AddMembersService } from './add-members.service';
import { ActivatedRoute } from '@angular/router';
import { ManageMembersService } from '../manage-members/manage-members.service';
import { ErrorObject } from '../error-object';
import { ManageUserRolesComponent } from '../manage-user-roles/manage-user-roles.component';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

export let lockeduser = [];

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})

export class AddMembersComponent implements OnInit, OnChanges {
  userList = [];
  @Input() existingUsers = [];
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
  dataSource = new MatTableDataSource<any>(this.userList);
  // displayedColumns: string[] = ['select', 'id', 'firstName', 'emailAddress', 'role'];
  displayedColumns: string[] = ['id', 'firstName', 'emailAddress', 'role'];
  columnlength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addmem: boolean;
  errorMsg: any;

  constructor(
    private route: ActivatedRoute,
    private addMembersService: AddMembersService,
    private spinner: NgxSpinnerService,
    private manageMembersService: ManageMembersService
   ) {
      this.route.params.subscribe(params => {
        this.workspaceId = params.id;
      });
    }

  ngOnInit() {
    this.getRoleList();
    // this.getUserList();
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
      res.usersList.forEach((user: any) => {
        this.isLoading = false;
        if (!this.existingUsers.includes(user.id) && !lockeduser.includes(user.id)) {
          this.userList.push(user);
        }
      });
      this.dataSource.data = this.userList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.columnlength = this.userList.length;
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
  setRoles (users, index, event) {
 for (const i of this.dataSource.data) {
   if (i.id === users.id) {
    index = users.id;
   }
 }
   let insert = 0;
    this.addmem = false;
    const user = {
        indexData: index,
        userId: users.id,
        workspaceId: this.workspaceId,
        workspaceRoleId: event
    };
    for (const i of this.selectedUserIdList) {
      if (i.indexData === index) {
        if (event === 'select') {
          const indexx = this.selectedUserIdList.indexOf(i);
          this.selectedUserIdList.splice(indexx, 1);
          insert = 1;
        } else {
          const indexx = this.selectedUserIdList.indexOf(i);
          this.selectedUserIdList.splice(indexx, 1);
        }
      }
    }
    if (insert === 0) {
      if (event !== 'select') {
        this.selectedUserIdList.push(user);
      }
    }
  }
  addMembers() {
    this.spinner.show();
    try {
      this.isProgress = true;
      const arrayLength = this.selectedUserIdList.length;
      this.selectedUserIdList.forEach((user, index) => {
        const params = {
          'userId': user.userId,
          'workspaceId': this.workspaceId,
          'workspaceRoleId': user.workspaceRoleId
        };
        this.addMembersService.addMembers(params)
        .subscribe((res) => {
          if (res) {
            if (arrayLength - 1 === index) {
              const close: HTMLButtonElement = document.querySelector('#addmemberspop #dismissmodel');
              close.click();
              this.updateExistingUsers.emit(true);
              this.spinner.hide();
            }
            this.isProgress = false;
            this.selectedUserIdList = [];
            this.errorObject = null;
          }
          this.spinner.hide();
      }, (err: HttpErrorResponse) => {
        this.spinner.hide();
        this.errorMsg = err.error.message;
        });
      });
    } catch {
      this.spinner.hide();
    }
  }

  setRole(user, event) {
    const checkbox: HTMLInputElement = event.target.parentNode.parentNode.childNodes[1].childNodes[0];
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  datasourceHasValue() {
    let isScreenPresent;
    this.dataSource.connect().subscribe(result => {
      if (result.length === 0) {
        isScreenPresent = true;
      } else {
        isScreenPresent = false;
      }
    });
    return isScreenPresent;
  }

  resetSelection() {
    this.selectedUserIdList = [];
     this.getUserList();
    // this.removeIndexValue = [];
    // this.updateenable = false;
    // this.onloadupdate = true;
  }

}
