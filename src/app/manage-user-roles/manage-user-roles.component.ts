import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { ManageUserRolesService } from './manage-user-roles.service';
import { ManageUserRoles } from '../manage-user-roles';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router/src/config';
import { GlobalRoles } from '../global-roles';
import { ChangeGlobalRole } from '../change-global-role';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';


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
  // dtTrigger: Subject<any> = new Subject();

  constructor(
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
    this.successMessage = false;
    this.selectedUserId = id;
    this.preSelectedRole = roleName;
    this.userName = userName;
    document.getElementById('selected-role').innerHTML = this.preSelectedRole;
  }

  gotoManagementPanel() {
    this.router.navigate(['workspace/management-panel']);
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
}

