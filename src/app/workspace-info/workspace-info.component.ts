import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceInfoService } from './workspace-info.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { WorkspaceObject, MemberObject, ServiceActionsObject } from '../workspace-objects';
import { archonConfig } from '../config';

@Component({
  selector: 'app-workspace-info',
  templateUrl: './workspace-info.component.html',
  styleUrls: ['./workspace-info.component.css']
})
export class WorkspaceInfoComponent implements OnInit {
  workspaceInfoData = new WorkspaceObject();
  @Input() workspaceId: string;
  isAvailable: boolean;
  loggedUserId: string;
  showNavBar = false;
  wsIndiPageUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workspaceinfoservice: WorkspaceInfoService,
    private userinfoservice: UserinfoService
  ) {
  }

  ngOnInit() {
    console.log('visited WorkspaceInfoComponent');
    this.isAvailable = false;
    if (!this.workspaceId) {
      this.route.params.subscribe(params => {
        this.workspaceId = params.id;
        this.loggedUserId = this.userinfoservice.getUserId();
        this.getWorkspaceInfo(this.workspaceId);
        this.showNavBarComp();
      });
    } else {
      this.getWorkspaceInfo(this.workspaceId);
    }
  }
  showNavBarComp() {
    this.wsIndiPageUrl = '/workspace-info/' + this.workspaceId;
    this.showNavBar = window.location.pathname === this.wsIndiPageUrl;
  }
  getWorkspaceInfo(workspaceId) {
    console.log('workspace id : ', workspaceId);
    this.workspaceinfoservice.getWorkSpaceInfo(workspaceId).subscribe(data => {
      // console.log(data);
      this.isAvailable = true;
      this.workspaceInfoData = data;
      this.setLoggedInUserRole(this.workspaceInfoData.members);
    });
  }

  setLoggedInUserRole(membersArray: MemberObject[]) {
    const BreakException = {};
    try {
      membersArray.forEach(member => {
        if (member.user.id === this.loggedUserId) {
          this.workspaceInfoData.loggedInUserRole = member.workspaceRole;
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) {
        throw e;
      }
    }
  }

  gotoDashboard() {
    this.router.navigateByUrl(archonConfig.Urls.dashboardRoute);
  }
}
