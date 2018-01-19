import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceInfoService } from './workspace-info.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceInfo } from './workspace-info';
import { HttpClientModule } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-workspace-info',
  templateUrl: './workspace-info.component.html',
  styleUrls: ['./workspace-info.component.css']
})
export class WorkspaceInfoComponent implements OnInit {
  workspaceInfoData: WorkspaceInfo;
  workspaceId: string;
  loggedUserId: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workspaceinfoservice: WorkspaceInfoService,
    private userinfoservice: UserinfoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workspaceId = params.id;
      this.loggedUserId = this.userinfoservice.getUserId();
      this.getWorkspaceInfo(this.workspaceId);
    });
  }
  getWorkspaceInfo(workspaceId: string) {
    this.workspaceinfoservice.getWorkSpaceInfo(workspaceId).subscribe(result => {
      // console.log(result);
      this.workspaceInfoData = result.data.workspace;
      this.setOwnerName();
      this.setMembers(this.workspaceInfoData['members']);
      //Hard coded Approvers data 
      this.workspaceInfoData.approvers = "NULL";
    });
  }
  setOwnerName() {
    this.workspaceInfoData.owner = this.workspaceInfoData['owner']['name'];
  }
  setMembers(data: any) {
    let i;
    let membersArray = new Array();
    for (i in data) {
      membersArray.push(data[i]['user']['name']);
      console.log('hai chandru', data[i]['user']['id'], this.loggedUserId);
      if (this.loggedUserId == data[i]['user']['id']) {
        console.log('Hai chandru');
        this.workspaceInfoData.your_role = data[i]['workspaceRole']['name'];
      }
    }
    this.workspaceInfoData.members = membersArray.join(', ');
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}

