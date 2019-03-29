import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';
import { GlobalRoles, UserInvite } from '../global-roles';
import { ChangeGlobalRole } from '../change-global-role';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'app-user-invite-dialog',
  templateUrl: 'user-invite-popup.html',
})
export class CreateUserInviteDialogComponent {

  constructor(
    public createUserInviteInfoDialogRef: MatDialogRef<CreateUserInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userInviteInfo: UserInvite) { }

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
  displayedColumns: string[] = ['userId', 'emailAddress', 'globalGroup', 'bussinessJustification',
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
        //   if (this.dtElement && this.dtElement.dtInstance) {
        //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        //     // Destroy the table first
        //     dtInstance.destroy();
        //     // Call the dtTrigger to rerender again
        //     // this.dtTrigger.next();
        //   });
        // }
        // $('#manage-user-role-info-table').html('');
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

  // ngOnDestroy() {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  onconfirm(confirm: boolean) {
    if (confirm) {
      // document.getElementById('manage-user-role-info-table').innerHTML = '';
      // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // dtInstance.ajax.reload();
      // });
      this.isAvailable = false;
      //   setTimeout(() => {
      //   this.getManageUserRolesData();
      // }, 200);
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
    const dialogScreenRef = this.dialog.open(CreateUserInviteDialogComponent, {
      width: '550px',
      data: this.userInviteInfo,
      panelClass: 'create-user-invite-dialog'
    });

    dialogScreenRef.afterClosed().subscribe(result => {
      this.inviteUser(this.userInviteInfo);
    });
  }

  inviteUser(userInviteInfo) {
    console.log(userInviteInfo);
  }
}

