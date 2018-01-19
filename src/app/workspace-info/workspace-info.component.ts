import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceInfoService } from './workspace-info.service';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private workspaceinfoservice: WorkspaceInfoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workspaceId = params.id;
      this.getWorkspaceInfo(this.workspaceId);
    });
  }
  getWorkspaceInfo(workspaceId: string) {
    this.workspaceinfoservice.getWorkSpaceInfo(workspaceId).subscribe(result => {
      // console.log(result);
      this.workspaceInfoData = result.data.workspace;
      this.setOwnerName();
      this.setMembers(this.workspaceInfoData['members']);
    });
  }
  setOwnerName() {
    this.workspaceInfoData.owner = this.workspaceInfoData['owner']['name'];
  }
  setMembers(data: any) {
    let i;
    let membersArray = new Array();
    for (i in data) {
      membersArray.push(data[i]['workspaceRole']['name'])
    }
    this.workspaceInfoData.members = membersArray.join(',');
  }
  
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}

