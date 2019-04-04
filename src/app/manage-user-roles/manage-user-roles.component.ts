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
  // @ViewChild('matPagintor2') paginator1: MatPaginator;
  // @ViewChild('matSort2') sort1: MatSort;
  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  dataSource: InviteUserDataSource;
  dataSource1: InviteUserDataSource;
  totalUser = 0;
  successMsg = '';
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
    'createdAt', 'updatedAt'];
  // InviteDisplayedColumns: string[] = ['id', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
  //   'createdBy', 'createdAt', 'updatedAt'];
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
  showInviteTable = false;
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
    // this.sort1.sortChange.subscribe(() => this.paginator1.pageIndex = 0);

    // merge(this.sort1.sortChange, this.paginator1.page)
    //   .pipe(
    //     tap(() => this.loadAllUsers1(this.invited, this.revoked, this.locked))
    //   )
    //   .subscribe();
  }

  loadAllUsers(invited, revoked, locked) {
    this.dataSource.getAllUsers(this.paginator.pageIndex + 1, invited, revoked, locked);
    this.dataSource.totalUserSubject.subscribe(result => {
      this.totalUser = result;
    });
  }
  // loadAllUsers1(invited, revoked, locked) {
  //   this.dataSource1.getAllUsers(this.paginator1.pageIndex + 1, invited, revoked, locked);
  //   this.dataSource1.totalUserSubject.subscribe(result => {
  //     this.totalUser = result;
  //   });
  // }
  filter(filterValue) {
    switch (filterValue) {
      case 'Invited': {
        this.invited = true;
        this.revoked = '';
        this.locked = '';
        this.displayedColumns = ['id', 'emailAddress', 'globalGroupName', 'status', 'action', 'businessJustification',
        'createdBy', 'createdAt', 'updatedAt'];
        this.showInviteTable = true;
        break;
      }
      case 'Active': {
        this.invited = false;
        this.revoked = false;
        this.locked = false;
        this.showInviteTable = false;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
      case 'Revoked': {
        this.revoked = true;
        this.invited = false;
        this.locked = false;
        this.showInviteTable = false;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
      case 'Locked': {
        this.locked = true;
        this.invited = false;
        this.revoked = false;
        this.showInviteTable = false;
        this.displayedColumns = ['id', 'firstName', 'lastName', 'emailAddress', 'globalGroup', 'status', 'action', 'businessJustification',
          'createdAt', 'updatedAt'];
        break;
      }
      case '': {
        this.locked = '';
        this.invited = false;
        this.revoked = '';
        this.showInviteTable = false;
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
    for (const item of roles) {
      if (item.roleName.toUpperCase().trim() === 'ROLE_SUPER') {
        this.roleOfUser = 'superadmin';
        break;
      }
      if (item.roleName.toUpperCase().trim() === 'ROLE_ADMIN') {
        this.roleOfUser = 'admin';
        break;
      }
    }
    this.getGlobalGroup();
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
}

