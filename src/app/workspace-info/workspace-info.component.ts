import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceInfoService } from './workspace-info.service';
import { UserinfoService } from '../userinfo.service';
import { HttpClientModule } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { WorkspacePojo, MemberPojo } from '../WorkspacePojo';

@Component({
  selector: 'app-workspace-info',
  templateUrl: './workspace-info.component.html',
  styleUrls: ['./workspace-info.component.css']
})
export class WorkspaceInfoComponent implements OnInit {
  workspaceInfoData = new WorkspacePojo();
  @Input() workspaceId: string;
  isAvailable: boolean;
  loggedUserId: string;
  wsIndiPageUrl: string;
  showNavBar = false;

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
    this.workspaceinfoservice.getWorkSpaceInfo(workspaceId).subscribe(data => {
      this.isAvailable = true;
      this.workspaceInfoData = data;
      this.setLoggedInUserRole(this.workspaceInfoData.members);
    });
  }

  setLoggedInUserRole(membersArray: MemberPojo[]) {
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
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}

