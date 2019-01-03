import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile/user-profile.service';
import { UserinfoService } from '../userinfo.service';
import { archonConfig } from '../config';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceObject, ServiceActionsObject } from '../workspace-objects';
import { WorkspaceDashboardService } from './workspace-dashboard.service';
import { Router } from '@angular/router';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

@Component({
  selector: 'app-workspace-dashboard',
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.css']
})
export class WorkspaceDashboardComponent implements OnInit {
  noWorkspace = false;
  userWorkspaceArray: WorkspaceObject[];
  constructor(
    private userWorkspaceService: UserWorkspaceService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getUserWorkspaceList();
  }
  getUserWorkspaceList() {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      if (this.userWorkspaceArray.length === 0) {
        this.noWorkspace = true;
      }
    });
  }
}
