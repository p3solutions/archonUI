import { Component, OnInit } from '@angular/core';
import { ErtService } from './ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { ManageMasterMetadataService } from '../manage-master-metadata/manage-master-metadata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ert-landing-page',
  templateUrl: './ert-landing-page.component.html',
  styleUrls: ['./ert-landing-page.component.css']
})
export class ErtLandingPageComponent implements OnInit {
  workspaceName = '';
  mmrVersion = '';
  workspaceId = '';
  jobName = '';
  jobType = '';
  constructor(private ertService: ErtService, private userInfoService: UserinfoService, private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService, private manageMetaService: ManageMasterMetadataService) { }

  ngOnInit() {
    this.workspaceName = this.workspaceHeaderService.getSelectedWorkspaceName();
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.manageMetaService.getMMRVersionList(this.workspaceId).subscribe((result) => {
      if (result.length > 0) {
        this.mmrVersion = result[0].versionNo;
      }
      this.ertService.setMMRVersion(this.mmrVersion);
    });
    this.ertService.jobName.subscribe(jobname => {
      this.jobName = jobname;
    });
    this.ertService.jobType.subscribe(jobType => {
      this.jobType = jobType;
    });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
