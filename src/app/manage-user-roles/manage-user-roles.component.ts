import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, tap } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';
import { GlobalRoles, UserInvite } from '../global-roles';
import { ChangeGlobalRole } from '../change-global-role';
import { Subject, merge } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: InviteUserDataSource;
  totalUser = 0;
  successMsg = '';
  displayedColumns: string[] = ['id', 'emailAddress', 'globalGroup', 'businessJustification',
    'createdAt', 'updatedAt'];
  disableInviteBtn = true;
  roleOfUser = '';
  userInviteInfo = new UserInvite();
  constructor(public dialog: MatDialog,
    private manageUserRolesService: ManageUserRolesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getInviteUsers();
    this.checkForEnableBtn();
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadUsers())
      )
      .subscribe();
  }

  loadUsers() {
    this.dataSource.getInviteUsers(this.paginator.pageIndex + 1);
    this.dataSource.totalUserSubject.subscribe(result => {
      this.totalUser = result;
    });
  }

  getGlobalGroup() {
    if (this.roleOfUser !== '') {
      this.manageUserRolesService.getGlobalGroup(this.roleOfUser).subscribe(result => {
        this.userInviteInfo.globalGroupList = result.data.globalRoles;
        console.log(this.userInviteInfo.globalGroupList);
      });
    }
  }

  getInviteUsers() {
    this.dataSource = new InviteUserDataSource(this.manageUserRolesService);
    this.loadUsers();
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
      if (item.roleName.toUpperCase().trim() === 'ROLE_ADMIN') {
        this.roleOfUser = 'admin';
        break;
      }
      if (item.roleName.toUpperCase().trim() === 'ROLE_SUPER') {
        this.roleOfUser = 'superadmin';
        break;
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
        this.getInviteUsers();
      });
    }
  }
}

