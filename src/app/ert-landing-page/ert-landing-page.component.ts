import { Component, OnInit } from '@angular/core';
import { ErtService } from './ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { ManageMasterMetadataService } from '../manage-master-metadata/manage-master-metadata.service';

@Component({
  selector: 'app-ert-landing-page',
  templateUrl: './ert-landing-page.component.html',
  styleUrls: ['./ert-landing-page.component.css']
})
export class ErtLandingPageComponent implements OnInit {
  workspaceName = '';
  mmrVersion = '';
  workspaceId = '';
  constructor(private ertService: ErtService, private userInfoService: UserinfoService,
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
  }
}
