import { Component, OnInit } from '@angular/core';
import { ErtService } from '../ert-landing-page/ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { ERTJobs, ErtJobParams, ExtractDataConfigInfo } from '../ert-landing-page/ert';
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
    this.ertService.ertJobParams = new ErtJobParams();
    this.ertService.selectedList = [];
    this.ertService.extractDataConfigInfo = new ExtractDataConfigInfo();
    this.ertService.schemaResultsTableCount = 0;
    this.ertService.mmrVersion = '';
    this.getErtJobList();
  }
  getErtJobList() {
    const userId = this.userInfoService.getUserId();
    const workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getErtJob(userId, workspaceId).subscribe((result) => {
      this.ertJobs = result;
    });
  }

  gotoEditJob(ertJobId: string) {
    const ertJobTitle = this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobTitle;
    const ertJobMode = this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobMode;
    this.ertService.setErtJobParams({ ertJobMode: ertJobMode, ertJobTitle: ertJobTitle });
    this.router.navigate(['/workspace/ert/ert-table/', ertJobId]);
  }

  deleteErtJob(ertJobId: string) {
    this.ertService.deleteErtJob(ertJobId).subscribe(result => {
      this.getErtJobList();
    });
  }

  runJob(ertJobId, jobStatus) {
    if (jobStatus === 'READY') {
      this.ertService.runJob(ertJobId).subscribe(result => {
        if (result.httpStatus === 200) {
          alert('job Has Started');
        }
      });
    }
  }

   gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
