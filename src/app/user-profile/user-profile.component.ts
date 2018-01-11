import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfo: any;

  constructor(
    private userinfoService: UserinfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userinfoService.getUserInfo().subscribe((res) => {
      if (res.data && res.success && res.data.user) {
        this.userInfo = {
          id: res.data.user.id,
          email: res.data.user.emailAddress,
          name: res.data.user.name
        };
        if (res.data.user.globalRoles && res.data.user.globalRoles.length) {
          this.userInfo.roleList = [];
          res.data.user.globalRoles.forEach(role => {
            this.userInfo.roleList.push(role.roleName);
          });
        }
        // hard coded till we get it from BE API
        const obj = { name: 'workspace'};
        this.userInfo.workspaceList = [obj, obj, obj];
      }
    });
  }

  focusOnInputBox() {
    setTimeout(() => document.getElementById('userName').focus(), 500);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  onUpdateProfile(confirm: boolean) {
    if (confirm) {
      this.getUserInfo();
    }
  }
}
