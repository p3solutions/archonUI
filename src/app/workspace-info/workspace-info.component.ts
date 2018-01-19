import { Component, OnInit, Input } from '@angular/core';
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
  @Input() workspaceId: string;
  isAvailable: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workspaceinfoservice: WorkspaceInfoService
  ) { }

  ngOnInit() {
    this.isAvailable = false;
    if (!this.workspaceId) {
      this.route.params.subscribe(params => {
        this.workspaceId = params.id;
        this.getWorkspaceInfo(this.workspaceId);
      });
    } else {
      this.getWorkspaceInfo(this.workspaceId);
    }
  }

  getWorkspaceInfo(workspaceId) {
    this.workspaceinfoservice.getWorkSpaceInfo(workspaceId).subscribe(data => {
      this.isAvailable = true;
      this.workspaceInfoData = data;
      console.log('testing ', this.workspaceInfoData);
    });
  }
  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}

