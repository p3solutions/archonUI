import { Component, OnInit, ViewChild, Inject, ViewChildren, QueryList } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { UserInvite, GlobalGroup } from '../global-roles';
import { merge } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { InviteUserDataSource } from './invite-user-data-source';
import { HttpErrorResponse } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { lockeduser } from '../add-members/add-members.component';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-user-invite-dialog',
  templateUrl: 'user-invite-popup.html',
})
export class CreateUserInviteDialogComponent {

  constructor(
    public createUserInviteInfoDialogRef: MatDialogRef<CreateUserInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userInviteInfo: UserInvite) {
  }

  onNoClick(): void {
    this.createUserInviteInfoDialogRef.close();
  }

}

@Component({
  selector: 'app-manage-user-roles',
  templateUrl: './manage-user-roles.component.html',
  styleUrls: ['./manage-user-roles.component.css']
})
export class ManageUserRolesComponent implements OnInit {
  @ViewChild('matPagintor1') paginator: MatPaginator;
  @ViewChild('matSort1') sort: MatSort;
  dataSource: InviteUserDataSource;
  dataSource1: InviteUserDataSource;
  totalUser = 0;
  successMsg = '';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
    'createdAt', 'updatedAt'];
  disableInviteBtn = true;
  lockedUserAction: string[] = ['Select Action', 'UnLock', 'Revoke Access'];
  revokedUserAction: string[] = ['Select Action', 'Grant Access', 'Delete'];
  filterOptionAction: string[] = ['Active', 'Revoked', 'Locked', 'Invited'];
  roleOfUser = '';
  userInviteInfo = new UserInvite();
  globalGroupList: GlobalGroup[] = [];
  invited = false;
  revoked = false;
  locked = false;
  changeUserStatusUrl = '';
  param: any;
  confirmMessage = '';
  tempChangeGlobalGroupUrl = '';
  userAction = '';
  cancelInviteAndDeleteUserUrl = '';
  selectedFilterOption = 'Active';
  userinfoId: any;
  globalGroupIds: string[] = [];
  screenfilter = '';
  loginUserGlobalgroup = '';
  itemPerPage = 50;
  constructor(public dialog: MatDialog,
    private manageUserRolesService: ManageUserRolesService,
    private router: Router,
    private userInfoService: UserinfoService,
    private spinner: NgxSpinnerService
  ) {
    this.userinfoId = this.userInfoService.getUserId();
  }

  ngOnInit() {
    this.checkForEnableBtn();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadAllUsers(this.invited, this.revoked, this.locked))
      )
      .subscribe();
  }

  loadAllUsers(invited, revoked, locked) {
    this.dataSource.emptyUser();
    this.dataSource.getAllUsers(this.paginator.pageIndex + 1, invited, revoked, locked, this.screenfilter, this.paginator.pageSize);
    this.dataSource.totalUserSubject.subscribe(result => {
      this.totalUser = result;
    });
  }
  sortData(sort) {
    this.dataSource.sortfn(sort);
  }

  filter(filterValue) {
    this.screenfilter = '';
    switch (filterValue) {
      case 'Invited': {
        this.invited = true;
        this.revoked = null;
        this.locked = null;
        this.displayedColumns = ['emailAddress', 'globalGroupName', 'status', 'businessJustification',
          'createdBy', 'createdAt', 'updatedAt'];
        break;
      }
      case 'Active': {
        this.invited = false;
        this.revoked = false;
        this.locked = false;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
          'createdAt', 'updatedAt'];
        if (this.roleOfUser === 'superadmin') {
          this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
            'action', 'createdAt', 'updatedAt'];
        }
        break;
      }
      case 'Revoked': {
        this.revoked = true;
        this.invited = false;
        this.locked = null;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
          'createdAt', 'updatedAt'];
        if (this.roleOfUser === 'superadmin') {
          this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
            'action', 'createdAt', 'updatedAt'];
        }
        break;
      }
      case 'Locked': {
        this.locked = true;
        this.invited = false;
        this.revoked = null;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
          'createdAt', 'updatedAt'];
        if (this.roleOfUser === 'superadmin') {
          this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
            'action', 'createdAt', 'updatedAt'];
        }
        break;
      }
      case '': {
        this.locked = false;
        this.invited = null;
        this.revoked = null;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
    }
    this.dataSource.globalGroupIds = this.globalGroupList.map(function (item) { return item['id']; });
    this.getAllUsers(this.invited, this.revoked, this.locked);
  }

  getGlobalGroupForInvite() {
    if (this.roleOfUser !== '') {
      this.manageUserRolesService.getGlobalGroup(this.roleOfUser).subscribe(result => {
        this.userInviteInfo.globalGroupList = result.data.globalRoles;
        this.globalGroupList = result.data.globalRoles;
      });
    }
  }

  disabledGroup() {
    this.userInfoService.getUserInfo().subscribe(res => {
      if (res.data && res.success && res.data.user) {
        this.loginUserGlobalgroup = res.data.groupName;
        // if (this.loginUserGlobalgroup.trim().toUpperCase() === 'GROUP_DB_ADMIN') {
        //   this.globalGroupList.forEach(a => a.disabled = true);
        //   this.globalGroupList.filter(a => a.groupName.trim().toUpperCase() === 'GROUP_DB_ADMIN')[0].disabled = ;
        // }
        if (this.loginUserGlobalgroup.trim().toUpperCase() === 'GROUP_ADMIN') {
          this.globalGroupList.filter(a => a.groupName.trim().toUpperCase() === 'GROUP_DB_ADMIN')[0].disabled = true;
        }
      }
    });
  }


  getGlobalGroup() {
    if (this.roleOfUser !== '') {
      this.manageUserRolesService.getGlobalGroup(this.roleOfUser).subscribe(result => {
        this.userInviteInfo.globalGroupList = result.data.globalRoles;
        this.globalGroupList = result.data.globalRoles;
        this.globalGroupIds = this.globalGroupList.map(function (item) { return item['id']; });
        this.getAllUsers(false, false, false);
        this.disabledGroup();
      });
    }
  }


  getAllUsers(invited, revoked, locked) {
    this.dataSource = new InviteUserDataSource(this.manageUserRolesService, this.globalGroupIds, this.spinner);
    this.dataSource.connect().subscribe(result => {
      result.forEach((value: any) => {
        if (value.status === 'Locked') {
          lockeduser.push(value.id);
        }
      });
    });
    this.loadAllUsers(invited, revoked, locked);
  }

  checkForEnableBtn() {
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelperService = new JwtHelperService();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    const roles = token_data.roles;
    for (const item of roles) {
      if (item.roleName.toUpperCase().trim().includes('SUPER')) {
        this.disableInviteBtn = false;
        this.displayedColumns = ['id', 'firstName', 'lastName',
          'emailAddress', 'globalGroup', 'status', 'businessJustification', 'action', 'createdAt', 'updatedAt'];
        break;
      }
    }
    this.findRoleOFUser();
    this.getGlobalGroup();
  }

  findRoleOFUser() {
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelperService = new JwtHelperService();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    const roles = token_data.roles;
    for (const item of roles) {
      if (item.roleName.toUpperCase().trim() === 'ROLE_SUPER') {
        this.roleOfUser = 'superadmin';
      }
      if (item.roleName.toUpperCase().trim() === 'ROLE_ADMIN') {
        this.roleOfUser = 'admin';
      }
    }
  }


  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }


  openUserInviteDialog(): void {
    this.userInviteInfo = new UserInvite();
    this.getGlobalGroupForInvite();
    const dialogScreenRef = this.dialog.open(CreateUserInviteDialogComponent, {
      width: '550px',
      data: this.userInviteInfo,
      panelClass: 'create-user-invite-dialog'
    });

    dialogScreenRef.afterClosed().subscribe(result => {
      this.inviteUser(result);
    });

  }

  inviteUser(userInviteInfo) {
    if (userInviteInfo !== undefined) {
      this.manageUserRolesService.inviteUser(userInviteInfo).subscribe(response => {
        document.getElementById('success-popup-btn').click();
        if (response.httpStatus === 200) {
          this.successMsg = 'User Invited Successfully';
        }
        this.userInviteInfo = new UserInvite();
        this.getAllUsers(this.invited, this.revoked, this.locked);
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
          } else {
            document.getElementById('error-popup').click();
            this.successMsg = err.error.message.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + err.error.message.slice(1);
            this.userInviteInfo = new UserInvite();
            this.getAllUsers(this.invited, this.revoked, this.locked);
          }
        });
    }
  }

  changeUserStatus(userId, $event) {
    if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() !== 'selectaction' &&
      ($event.target.value).replace(/ /g, '').toLocaleLowerCase() !== 'delete') {
      document.getElementById('confirmDialog').click();
      if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'revokeaccess') {
        this.confirmMessage = 'Are you sure to revoke the access for the user?';
        this.changeUserStatusUrl = userId + '&accessRevoked=' + true;
      } else if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'grantaccess') {
        this.changeUserStatusUrl = userId + '&accessRevoked=' + false +
          '&accountLocked=' + false;
        this.confirmMessage = 'Are you sure to grant the access for the user?';
      } else if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'unlock') {
        this.changeUserStatusUrl = userId + '&accountLocked=' + false;
        this.confirmMessage = 'Are you sure to unlock the user?';
      }
    } else if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'delete') {
      this.cancelInviteAndDeleteUserUrl = 'users/deleteUser?userId=' + userId;
      this.confirmMessage = 'Are you sure to delete the user?';
      this.userAction = 'delete';
      document.getElementById('confirmCancelInvite').click();
    }
  }

  revokeAccess(userId) {
    document.getElementById('confirmDialog').click();
    this.changeUserStatusUrl = userId + '&accessRevoked=' + true;
    this.confirmMessage = 'Are you sure to revoke the access for the user?';
  }

  cancelInvite(userId) {
    this.cancelInviteAndDeleteUserUrl = 'users/cancelInvite?invitedUserId=' + userId;
    this.confirmMessage = 'Are you sure to cancel the invitation?';
    this.userAction = 'cancelinvite';
    document.getElementById('confirmCancelInvite').click();
  }

  confirmCancelInviteAndDeleteUser() {
    this.manageUserRolesService.cancelInvite(this.cancelInviteAndDeleteUserUrl).subscribe(response => {
      document.getElementById('success-popup-btn').click();
      if (response.httpStatus === 200) {
        if (this.userAction === 'cancelinvite') {
          this.successMsg = 'Invitation cancel successfully.';
        } else if (this.userAction === 'delete') {
          this.successMsg = 'User deleted successfully.';
        }
      }
      this.getAllUsers(this.invited, this.revoked, this.locked);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else {
          document.getElementById('error-popup').click();
          this.successMsg = err.error.message;
          this.getAllUsers(this.invited, this.revoked, this.locked);
        }
      });
  }

  changeGlobalGroup(userId, globalGroupId) {
    if (userId.trim() === this.userInfoService.getUserId().trim()) {
      document.getElementById('error-popup').click();
      this.successMsg = 'You are not allowed to change your group.';
    } else {
      document.getElementById('confirmChangeGlobalRole').click();
      if (this.roleOfUser === 'superadmin') {
        this.tempChangeGlobalGroupUrl = 'superadmin/' + this.userinfoId + '/groups/global';
      } else if (this.roleOfUser === 'admin') {
        this.tempChangeGlobalGroupUrl = 'users/' + this.userinfoId + '/groups/global';
      }
      this.param = {
        'userId': userId,
        'globalGroupId': globalGroupId
      };
    }
  }

  confirmChangeUserStatus() {
    this.manageUserRolesService.changeUserStatus(this.changeUserStatusUrl).subscribe(response => {
      if (response.httpStatus === 200) {
        document.getElementById('success-popup-btn').click();
        this.successMsg = 'Status changed successfully';
      }
      this.getAllUsers(this.invited, this.revoked, this.locked);
    }, (err) => {
      document.getElementById('error-popup').click();
      this.successMsg = err.error.message;
    });
  }

  confirmChangeGlobalGroupStatus() {
    this.manageUserRolesService.changeGlobalGroup(this.tempChangeGlobalGroupUrl, this.param).subscribe(response => {
      if (response.httpStatus === 200) {
        document.getElementById('success-popup-btn').click();
        this.successMsg = 'Global Group changed Successfully';
      } else {
        document.getElementById('error-popup').click();
        this.successMsg = 'Access is Denied. Please Check Permission Level.';
      }
      this.getAllUsers(this.invited, this.revoked, this.locked);
    });
  }

  noGroupChange() {
    this.getAllUsers(this.invited, this.revoked, this.locked);
  }

  getUserByEmailId(emailId, status: string) {
    let response;
    this.dataSource.filter = emailId.trim().toLowerCase();
    if (this.invited === true && emailId !== '') {
      this.dataSource.connect().subscribe(result => {
        response = result;
      });
      this.dataSource.totalUserSubject.subscribe(result => {
        this.totalUser = result;
      });
      this.dataSource._filterData(this.dataSource.tempInviteUser);
    } else
      if (emailId !== '') {
        this.paginator.pageIndex = 0;
        this.dataSource = new InviteUserDataSource(this.manageUserRolesService, this.globalGroupIds, this.spinner);
        this.dataSource.getAllUsers(this.paginator.pageIndex + 1, this.invited, this.revoked, this.locked, emailId,
          this.paginator.pageSize);
        this.dataSource.inviteUsersSubject.subscribe(result => {
          this.totalUser = result.length;
        });
      } else {
        this.getAllUsers(this.invited, this.revoked, this.locked);
      }
  }
}

