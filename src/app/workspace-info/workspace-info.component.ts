import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceinfoService } from '../workspaceinfo.service';
import { Workspaceinfo } from '../workspaceinfo';
import {HttpClientModule} from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-workspace-info',
  templateUrl: './workspace-info.component.html',
  styleUrls: ['./workspace-info.component.css']
})
export class WorkspaceInfoComponent implements OnInit {
  // workspaceinfo = new Workspaceinfo('', '', '');
  workspaceInfoData: Workspaceinfo;

  constructor(
    private httpClient: HttpClient,
    // private router: Router,
    private workspaceinfoservice: WorkspaceinfoService
  ) { this.getWorkspaceInfo(); }

  ngOnInit() {
  }

  getWorkspaceInfo() {
    this.workspaceinfoservice.getworkinfo().subscribe(data => {
      this.workspaceInfoData = data;
      console.log('testing ', this.workspaceInfoData);
    });
  }


  // this.memberRequestService.getMemberRequestDetails()
  // .subscribe(data => {
  //   this.memberRequestData = data;
  //   this.isAvailable = true;
  // });

}

