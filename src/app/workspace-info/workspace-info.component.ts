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
      this.workspaceId = '5a5f2e645912217634613dbe';
      this.getWorkspaceInfo(this.workspaceId);
    });
  }
  getWorkspaceInfo(workspaceId: string) {
    this.workspaceinfoservice.getWorkSpaceInfo(workspaceId).subscribe(data => {
      this.workspaceInfoData = data;
      console.log('testing ', this.workspaceInfoData);
    });
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}

