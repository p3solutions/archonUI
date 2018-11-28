import { Component, OnInit } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceListService } from '../workspace-list/workspace-list.service';
import { Router } from '@angular/router';
import { WorkspaceObject } from '../workspace-objects';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userInfo: any;
  workspaceList: WorkspaceObject[];
  onUpdate: boolean;
  successMessage: boolean;

  constructor(
    private userinfoService: UserinfoService,
    private workspaceListService: WorkspaceListService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUserInfo();
  }
  getUserInfo() {
    this.onUpdate = true;
    const userData = localStorage.getItem('userId');
    if (userData) {
    this.userinfoService.getAllUsers().subscribe((data) => {
      for (let i = 0 ; i < data.data.users.length; i++) {
        if (data.data.users[i].id === userData) {
          this.userInfo = {
            id: data.data.users[i].id,
            email: data.data.users[i].emailAddress,
            name: data.data.users[i].name
          };

          this.getWorkspaceList(userData);
          if (data.data.users[i].globalRoles && data.data.users[i].globalRoles.length) {
                  this.workspaceListService.getListOfWorkspaceByUserId(this.userInfo.id).subscribe((wsList: WorkspaceObject[]) => {
                    this.userInfo.workspaceList = wsList;
                  });
          }
          this.userInfo.roleList = [];
          data.data.users[i].globalRoles.forEach(role => {
            this.userInfo.roleList.push(role.roleName);
          });
        }
      }
    });
  } else {
    this.userinfoService.getUserInfo().subscribe((res) => {
      if (res.data && res.success && res.data.user) {
        this.userInfo = {
          id: res.data.user.id,
          email: res.data.user.emailAddress,
          name: res.data.user.name
        };
        this.getWorkspaceList(this.userInfo.id);
        if (res.data.user.globalRoles && res.data.user.globalRoles.length) {
          this.workspaceListService.getListOfWorkspaceByUserId(this.userInfo.id).subscribe((wsList: WorkspaceObject[]) => {
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
  }

  focusOnInputBox() {
    this.successMessage = false;
    setTimeout(() => document.getElementById('userName').focus(), 500);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  onUpdateProfile(confirm: boolean) {
    if (confirm) {
      this.onUpdate = false;
      this.successMessage = true;
      this.getUserInfo();
    }
  }

  getWorkspaceList(userId) {
    this.workspaceListService.getListOfWorkspaceByUserId(userId).subscribe((res) => {
      this.workspaceList = res;
    });
  }

  setWorkspace(ws) {
    // this.workspaceHeaderService.setSelectedWorkspace(ws);
    console.log(ws);
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
