import { Component, OnInit, Input } from '@angular/core';
import { AddMembersService } from './add-members.service';
import { ActivatedRoute } from '@angular/router';
import { UserWorkspaceService } from '../user-workspace.service';
import { ManageMembersService } from '../manage-members/manage-members.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  userList = [];
  @Input() existingUsers: any;
  selectedUserIdList = [];
  workspaceId: string;
  wsRoleList = [];
  // isProgress: boolean;
  constructor(
    private route: ActivatedRoute,
    private addMembersService: AddMembersService,
    private manageMembersService: ManageMembersService
   ) { }

  ngOnInit() {
    // this.isProgress = false;
    console.log('existingUsers', this.existingUsers);
    this.getRoleList();
    this.getUserList();
    this.route.params.subscribe(params => {
      this.workspaceId = params.id;
    });
  }

  getUserList() {
    // this.isProgress = true;
    this.addMembersService.getAllUsers()
    .subscribe(res => {
      res.forEach((user: any) => {
        if (user.globalRoles[0].roleName === 'ROLE_MEMBER' || user.globalRoles[0].roleName === 'ROLE_ADMIN' ||
        user.globalRoles[0].roleName === 'ROLE_NOT_ASSIGNED') {
            let existingUserIndex;
            for (let i = 0; i < this.existingUsers.length; i++) {
              console.log(this.existingUsers[i] === user.id);
              if (this.existingUsers[i] === user.id) {
                existingUserIndex = i;
                break;
              }
            }
            if (existingUserIndex === undefined) {
              this.userList.push(user);
            }
            // console.log(this.userList.length);
          }
      });
      // this.isProgress = false;
    });
  }

  getRoleList() {
    this.manageMembersService.getwsRoleList().subscribe(res => {
      this.wsRoleList = res;
    });
  }

  addMembers() {
    const params = {};
    this.addMembersService.addMembers(params)
    .subscribe(res => {
      console.log(res);
    });
  }

  updateSelectList(id: string, e) {
    const checked = e.target.checked;
    if (checked) {
      this.selectedUserIdList.push(id);
    } else {
      const index = this.selectedUserIdList.indexOf(id);
      this.selectedUserIdList.splice(index, 1);
    }
    // console.log(this.selectedUserIdList);
  }

}
