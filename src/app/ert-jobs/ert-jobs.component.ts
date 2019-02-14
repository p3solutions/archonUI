import { Component, OnInit } from '@angular/core';
import { ErtService } from '../ert-landing-page/ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { ERTJobs } from '../ert-landing-page/ert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ert-jobs',
  templateUrl: './ert-jobs.component.html',
  styleUrls: ['./ert-jobs.component.css']
})
export class ErtJobsComponent implements OnInit {
  ertJobs: ERTJobs[];

  constructor(private ertService: ErtService, private userInfoService: UserinfoService,
    private workspaceHeaderService: WorkspaceHeaderService, private router: Router) { }

  ngOnInit() {
    this.getErtJobList();
  }
  getErtJobList() {
    const userId = this.userInfoService.getUserId();
    const workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getErtJob(userId, workspaceId).subscribe((result) => {
      this.ertJobs = result;
      console.log(this.ertJobs);
    });
  }

  gotoEditJob(jobId: string) {
    this.router.navigate(['/workspace/ert/ert-table/', jobId]);
  }
}
