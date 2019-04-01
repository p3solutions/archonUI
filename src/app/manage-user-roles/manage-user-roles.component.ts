import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    @Inject(MAT_DIALOG_DATA) public userInviteInfo: UserInvite) { }

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
  isAvailable = false;
  isProgress: boolean;
  message: string;
  successMessage = false;
  errorMessage = false;
  manageUserRolesRequestData: ManageUserRoles[];
  selectedUserId: string;
  userName: string;
  preSelectedRole: any;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  successMsg = '';
  displayedColumns: string[] = ['userId', 'emailAddress', 'globalGroup', 'bussinessJustification', 'invitedByUser',
    'createdAt', 'updatedAt'];
  // dtTrigger: Subject<any> = new Subject();
  userInviteInfo = new UserInvite();
  constructor(public dialog: MatDialog,
    private manageUserRolesService: ManageUserRolesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getManageUserRolesData();
    this.isProgress = true;
    this.dtOptions = {
      stateSave: false,
      paging: true,
      pageLength: 10,
      pagingType: 'full_numbers',
      destroy: true
    };
    this.getInviteUsers();
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
    this.totalUser = this.dataSource.totalUser;
  }

  getInviteUsers() {
    this.dataSource = new InviteUserDataSource(this.manageUserRolesService);
    this.loadUsers();
  }

  receiveSuccessMessage($event) {
    if (true === $event) {
      this.successMessage = true;
    } else {
      this.errorMessage = true;
    }
  }

  getManageUserRolesData() {
    this.manageUserRolesService.getManageMembersDetails()
      .subscribe(res => {
        this.manageUserRolesRequestData = res;
        this.isAvailable = true;
        this.isProgress = false;
      });
  }
  getUserId(id, roleName, userName) {
    this.errorMessage = false;
    this.successMessage = false;
    this.selectedUserId = id;
    this.preSelectedRole = roleName;
    this.userName = userName;
    document.getElementById('selected-role').innerHTML = this.preSelectedRole;
  }

  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }


  onconfirm(confirm: boolean) {
    if (confirm) {
      this.isAvailable = false;
      this.getManageUserRolesData();
    }
  }


  getUserProfile(userobj) {
    localStorage.setItem('userId', userobj.id);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  openUserInviteDialog(): void {
    this.userInviteInfo = new UserInvite();
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
      });
    }
  }
}

