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
  @Output() onConfirm = new EventEmitter<boolean>();
  globalRoleId: string;
  globalRolesRequestData: GlobalRoles[];
  preSelectedUserRole = '';


  constructor(
    private changeUserRoleService: ChangeUserRoleService,

  ) { }

  ngOnInit() {
    console.log('selected role', document.getElementById('preSelectedRoles')
  )
    this.getGlobalRoleData();
  }

  getGlobalRoleData() {
    this.changeUserRoleService.getGlobalRoleDetails()
      .subscribe(res => {
        this.globalRolesRequestData = res;
        console.log(this.selectedUserId,'get global role data',this.globalRolesRequestData);
      });
  }

  getGlobalId(roleId) {
    this.globalRoleId = roleId;
  }

  changeOnConfirm() {
    this.changeUserRoleService.changeGlobalRoleDetails(this.selectedUserId, this.globalRoleId)
    .subscribe((res) => {
      this.onConfirm.emit(true);
    });
    // this.manageUserRolesRequestData[this.index]['globalRoles'][0]['roleName'] = this.choosedRole;
  }

}
