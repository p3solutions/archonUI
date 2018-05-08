import { Component, OnInit } from '@angular/core';
import { AddMembersService } from './add-members.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  userList = [];
  // isProgress: boolean;
  constructor( private addMembersService: AddMembersService ) { }

  ngOnInit() {
    // this.isProgress = false;
    this.getUserList();
  }

  getUserList() {
    // this.isProgress = true;
    this.addMembersService.getAllUsers()
    .subscribe(res => {
      res.forEach((user: any) => {
        if (user.globalRoles[0].roleName === 'ROLE_MEMBER' || user.globalRoles[0].roleName === 'ROLE_ADMIN' ||
            user.globalRoles[0].roleName === 'ROLE_NOT_ASSIGNED') {
            this.userList.push(user);
        }
      });
      // this.isProgress = false;
    });
  }

  addMembers() {
    //
  }
}
