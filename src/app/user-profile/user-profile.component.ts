import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceListInfo } from '../workspace-list/workspace-list-data';
import { WorkspaceListService } from '../workspace-list/workspace-list.service';
import { Router } from '@angular/router';
import { WorkspacePojo } from '../WorkspacePojo';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  workspaceList: WorkspacePojo[];

  constructor(
    private userinfoService: UserinfoService,
    private workspaceListService: WorkspaceListService,
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
        this.getWorkspaceList(this.userInfo.id);
        if (res.data.user.globalRoles && res.data.user.globalRoles.length) {
          this.workspaceListService.getListOfWorkspaceByUserId(this.userInfo.id).subscribe((wsList: WorkspacePojo[]) => {
            this.userInfo.workspaceList = wsList;
          });
          this.userInfo.roleList = [];
          res.data.user.globalRoles.forEach(role => {
            this.userInfo.roleList.push(role.roleName);
          });
        }
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

  getWorkspaceList(userId) {
    this.workspaceListService.getListOfWorkspaceByUserId(userId).subscribe((res) => {
      this.workspaceList = res;
    });
  }
}
