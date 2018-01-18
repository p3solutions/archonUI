import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceListInfo } from '../workspace-list/workspace-list-data';
import { WorkspaceListService } from '../workspace-list/workspace-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userInfo: any;
  workspaceListData: any;
  constructor(
    private userinfoService: UserinfoService,
    private workspaceListService: WorkspaceListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }
  atatus
  setWorkspaceList(data: any): any[] {
    let i;
    let list = new Array();
    for (i in data) {
      const obj = {
        id: data[i].id,
        name: data[i].workspaceName
      }
      list.push(obj);
    }
    return list;
  }
  getUserInfo() {
    this.userinfoService.getUserInfo().subscribe((res) => {
      console.log(res);
      if (res.data && res.success && res.data.user) {
        this.userInfo = {
          id: res.data.user.id,
          email: res.data.user.emailAddress,
          name: res.data.user.name
        };
        if (res.data.user.globalRoles && res.data.user.globalRoles.length) {
          this.workspaceListService.getListOfWorkspaceByUserId(this.userInfo.id).subscribe((res) => {
            this.workspaceListData = res.data.workspaces;
            this.userInfo.workspaceList = this.setWorkspaceList(this.workspaceListData);
          });
          this.userInfo.roleList = [];
          res.data.user.globalRoles.forEach(role => {
            this.userInfo.roleList.push(role.roleName);
          });
        }
        console.log(this.userInfo);
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
