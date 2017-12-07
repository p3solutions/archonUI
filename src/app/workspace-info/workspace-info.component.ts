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
  results: string;
  info: Workspaceinfo;
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private workspaceinfoservice: WorkspaceinfoService
  ) { }

  ngOnInit(): void {
    this.getWorkspaceInfo();
    // Make the HTTP request:
  }
  getWorkspaceInfo(): void {
    this.workspaceinfoservice.getworkinfo(this.workspaceinfoservice.workspaceinfoUrl).subscribe(info => {
      this.info = info;
      console.log(JSON.stringify(this.info));
      this.results = JSON.stringify(this.info);

    });
  }

}
