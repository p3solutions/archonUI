import { Component, OnInit } from '@angular/core';
import { ErtService } from '../ert-landing-page/ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { ERTJobs, ErtJobParams, ExtractDataConfigInfo, IngestionDataConfig } from '../ert-landing-page/ert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ert-jobs',
  templateUrl: './ert-jobs.component.html',
  styleUrls: ['./ert-jobs.component.css']
})
export class ErtJobsComponent implements OnInit {
  ertJobs: ERTJobs[];
  ertJobDetail = new ERTJobs();
  ertJobId = '';

  constructor(private ertService: ErtService, private userInfoService: UserinfoService,
    private workspaceHeaderService: WorkspaceHeaderService, private router: Router) { }

  ngOnInit() {
    this.ertService.ertJobParams = new ErtJobParams();
    this.ertService.selectedList = [];
    this.ertService.extractDataConfigInfo = new ExtractDataConfigInfo();
    this.ertService.ingestionDataConfig = new IngestionDataConfig();
    this.ertService.schemaResultsTableCount = 0;
    this.getErtJobList();
  }
  getErtJobList() {
    const userId = this.userInfoService.getUserId();
    const workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getErtJob(userId, workspaceId).subscribe((result) => {
      this.ertJobs = result;
      for (const item of this.ertJobs) {
        if (item.jobStatus === 'READY' || item.jobStatus === 'COMPLETED' || item.jobStatus === 'FAILED') {
          item.madeDisable = false;
        } else {
          item.madeDisable = true;
        }
      }
    });
  }

  gotoEditJob(ertJobId: string) {
    const ertJobTitle = this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobTitle;
    const ertJobMode = this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobMode;
    this.ertService.setErtJobParams({ ertJobMode: ertJobMode, ertJobTitle: ertJobTitle });
    if (ertJobMode === 'DATA_RECORD') {
      this.router.navigate(['/workspace/ert/ert-table/', ertJobId], { queryParams: { from: 'data-record' } });
    } else if (ertJobMode === 'SIP') {
      this.router.navigate(['/workspace/ert/ert-table/', ertJobId], { queryParams: { from: 'SIP' } });
    } else {
      this.router.navigate(['/workspace/ert/ert-table/', ertJobId]);
    }
  }

  deleteErtJob() {
    this.ertService.deleteErtJob(this.ertJobId).subscribe(result => {
      this.getErtJobList();
    });
  }

  runJob(ertJobId, jobStatus) {
    if (jobStatus === 'READY' || jobStatus === 'COMPLETED' || jobStatus === 'FAILED') {
      this.ertService.runJob(ertJobId).subscribe(result => {
        if (result.httpStatus === 200) {
          alert('Job has Started');
          this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobStatus = 'In PROGRESS';
          this.ertJobs.filter(a => a.jobId === ertJobId)[0].madeDisable = true;
        }
      });
    }
  }


  setJobId(ertJobId: string) {
    this.ertJobId = ertJobId;
  }

  showJobDetails(jobId: string) {
    this.ertJobDetail = this.ertJobs.filter(a => a.jobId === jobId)[0];
    document.getElementById('opneDetailPopup').click();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
