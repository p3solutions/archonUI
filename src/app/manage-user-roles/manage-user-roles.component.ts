import { Component, OnInit, ViewChild, Inject, ViewChildren, QueryList } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';
import { UserInvite, GlobalGroup } from '../global-roles';
import { merge } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { InviteUserDataSource } from './invite-user-data-source';


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
    console.log('close');
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
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
    'createdAt', 'updatedAt'];
  disableInviteBtn = true;
  lockedUserAction: string[] = ['Select Action', 'UnLock', 'Revoke Access'];
  revokedUserAction: string[] = ['Select Action', 'Grant Access', 'Delete'];
  filterOptionAction: string[] = ['', 'Invited', 'Active', 'Revoked', 'Locked'];
  roleOfUser = '';
  userInviteInfo = new UserInvite();
  globalGroupList: GlobalGroup[] = [];
  invited = null;
  revoked = null;
  locked = null;
  changeUserStatusUrl = '';
  param: any;
  confirmMessage = '';
  tempChangeGlobalGroupUrl = '';
  constructor(public dialog: MatDialog,
    private manageUserRolesService: ManageUserRolesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkForEnableBtn();
    this.getAllUsers(false, '', '');
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAllUsers(this.invited, this.revoked, this.locked))
      )
      .subscribe();
  }

  loadAllUsers(invited, revoked, locked) {
    this.dataSource.getAllUsers(this.paginator.pageIndex + 1, invited, revoked, locked);
    this.dataSource.totalUserSubject.subscribe(result => {
      this.totalUser = result;
    });
  }

  filter(filterValue) {
    switch (filterValue) {
      case 'Invited': {
        this.invited = true;
        this.revoked = '';
        this.locked = '';
        this.displayedColumns = ['id', 'emailAddress', 'globalGroupName', 'status', 'action', 'businessJustification',
          'createdBy', 'createdAt', 'updatedAt'];
        break;
      }
      case 'Active': {
        this.invited = false;
        this.revoked = false;
        this.locked = false;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
      case 'Revoked': {
        this.revoked = true;
        this.invited = false;
        this.locked = '';
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
      case 'Locked': {
        this.locked = true;
        this.invited = false;
        this.revoked = '';
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
      case '': {
        this.locked = '';
        this.invited = false;
        this.revoked = '';
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
    }
    this.getAllUsers(this.invited, this.revoked, this.locked);
  }



  getGlobalGroup() {
    if (this.roleOfUser !== '') {
      this.manageUserRolesService.getGlobalGroup(this.roleOfUser).subscribe(result => {
        this.userInviteInfo.globalGroupList = result.data.globalRoles;
        this.globalGroupList = result.data.globalRoles;
      });
    }
  }


  getAllUsers(invited, revoked, locked) {
    this.dataSource = new InviteUserDataSource(this.manageUserRolesService);
    this.loadAllUsers(invited, revoked, locked);
    this.getGlobalGroup();
  }

  checkForEnableBtn() {
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelperService = new JwtHelperService();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    const roles = token_data.roles;
    for (const item of roles) {
      if (item.roleName.toUpperCase().trim().includes('ADMIN')) {
        this.disableInviteBtn = false;
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
    this.getGlobalGroup();
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
        } else {
          this.successMsg = 'User Not Invited';
        }
        this.userInviteInfo = new UserInvite();
        this.getAllUsers(this.invited, this.revoked, this.locked);
      });
    }
  }

  changeUserStatus(userId, $event) {
    if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() !== 'selectaction' &&
    ($event.target.value).replace(/ /g, '').toLocaleLowerCase() !== 'delete') {
      document.getElementById('confirmDialog').click();
      if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'revokeaccess') {
      this.confirmMessage = 'Are sure to revoke the access for the user?';
        this.changeUserStatusUrl = userId + '&accessRevoked=' + true;
      } else if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'grantaccess') {
        this.changeUserStatusUrl = userId + '&accessRevoked=' + false +
          '&accountLocked=' + false;
          this.confirmMessage = 'Are sure to grant the access for the user?';
      } else if (($event.target.value).replace(/ /g, '').toLocaleLowerCase() === 'unlock') {
        this.changeUserStatusUrl = userId + '&accountLocked=' + false;
        this.confirmMessage = 'Are sure to unlock the user?';
      }
    }
  }

  revokeAccess(userId) {
    document.getElementById('confirmDialog').click();
    this.changeUserStatusUrl = userId + '&accessRevoked=' + true;
    this.confirmMessage = 'Are sure to revoke the access for the user?';
  }


  changeGlobalGroup(userId, globalGroupId) {
    document.getElementById('confirmChangeGlobalRole').click();
    if (this.roleOfUser = 'superadmin') {
      this.tempChangeGlobalGroupUrl = 'superadmin/' + userId + '/groups/global';
    } else if (this.roleOfUser = 'admin') {
      this.tempChangeGlobalGroupUrl = 'users/' + userId + '/groups/global';
    }
    this.param = {
      'userId': userId,
      'globalGroupId': globalGroupId
    };
  }

  confirmChangeUserStatus() {
    this.manageUserRolesService.changeUserStatus(this.changeUserStatusUrl).subscribe(response => {
      document.getElementById('success-popup-btn').click();
      if (response.httpStatus === 200) {
        this.successMsg = 'Status changed successfully';
      } else {
        this.successMsg = response.errorMessage;
      }
      this.getGlobalGroup();
      this.getAllUsers(this.invited, this.revoked, this.locked);
    });
  }

  confirmChangeGlobalGroupStatus() {
    this.manageUserRolesService.changeGlobalGroup(this.tempChangeGlobalGroupUrl, this.param).subscribe(response => {
      document.getElementById('success-popup-btn').click();
      console.log(response);
      if (response.httpStatus === 200) {
        this.successMsg = 'Global Group changed Successfully';
      } else {
        this.successMsg = 'Access is Denied';
      }
      this.getGlobalGroup();
      this.getAllUsers(this.invited, this.revoked, this.locked);
    });
  }


  getUserByEmailId(emailId) {
    let response;
    this.dataSource.filter = emailId.trim().toLowerCase();
    this.getGlobalGroup();
    if (this.invited === true && emailId !== '') {
      this.dataSource.connect().subscribe(result => {
        response = result;
      });
      this.dataSource._filterData(response);
    } else if (emailId !== '') {
      this.dataSource = new InviteUserDataSource(this.manageUserRolesService);
      this.dataSource.getUsersByEmailId(emailId);
    } else {
      this.getAllUsers(this.invited, this.revoked, this.locked);
    }
  }
}

