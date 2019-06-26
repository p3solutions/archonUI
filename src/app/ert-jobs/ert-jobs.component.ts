import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ErtService } from '../ert-landing-page/ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { UserinfoService } from '../userinfo.service';
import { ERTJobs, ErtJobParams, ExtractDataConfigInfo, IngestionDataConfig } from '../ert-landing-page/ert';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ert-jobs',
  templateUrl: './ert-jobs.component.html',
  styleUrls: ['./ert-jobs.component.css']
})
export class ErtJobsComponent implements OnInit {
  ertJobs: ERTJobs[];
  scheduledeErtJobId = '';
  isSuccessMsg: boolean;
  successMsg: string;
  @ViewChild('click') button: ElementRef;
  ertJobDetail = new ERTJobs();
  ertJobId = '';
  ERT = 'ERT';
  scheduleNow: boolean;
  instanceId: any;
  ertJobslist: boolean;
  errorMessage = '';

  constructor(public ertService: ErtService, private userInfoService: UserinfoService, private spinner: NgxSpinnerService,
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
    this.spinner.show();
    this.ertService.updateJobName('');
    this.ertService.updatejobType('');
    const workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getErtJob(userId, workspaceId).subscribe((result) => {
      try {
        this.ertJobs = result;
        if (this.ertJobs.length === 0) {
          this.ertJobslist = true;
        } else {
          for (const item of this.ertJobs) {
            if (item.jobStatus === 'READY' || item.jobStatus === 'COMPLETED' || item.jobStatus === 'FAILED') {
              item.madeDisable = false;
            } else {
              item.madeDisable = true;
            }
            if (item.jobStatus.trim().toUpperCase() === 'IN_PROGRESS' || item.jobStatus.trim().toUpperCase() === 'SCHEDULED') {
              item.madeEditDisable = true;
            } else {
              item.madeEditDisable = false;
            }
          }
        }
        this.spinner.hide();
      } catch {
        this.spinner.hide();
      }
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        this.spinner.hide();
        this.ertJobslist = true;
        // document.getElementById('warning-popup-btn').click();
        // this.errorMessage = err.error.message;
      }
    });
  }

  gotoEditJob(ertJobId: string, jobStatus: string) {
    if (jobStatus.trim().toUpperCase() !== 'IN_PROGRESS' && jobStatus.trim().toUpperCase() !== 'SCHEDULED') {
      const ertJobTitle = this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobTitle;
      const ertJobMode = this.ertJobs.filter(a => a.jobId === ertJobId)[0].jobMode;
      this.ertService.updateJobName(ertJobTitle);
      this.ertService.updatejobType(ertJobMode);
      this.ertService.setErtJobParams({ ertJobMode: ertJobMode, ertJobTitle: ertJobTitle });
      if (ertJobMode === 'DATA_RECORD') {
        this.router.navigate(['/workspace/ert/ert-table/', ertJobId], { queryParams: { from: 'data-record' } });
      } else if (ertJobMode === 'SIP') {
        this.router.navigate(['/workspace/ert/ert-table/', ertJobId], { queryParams: { from: 'SIP' } });
      } else {
        this.router.navigate(['/workspace/ert/ert-table/', ertJobId], { queryParams: { from: 'TABLE' } });
      }
    } else {
      document.getElementById('warning-popup-btn').click();
      this.errorMessage = 'In progress and scheduled job can not be edit.';
    }
  }

  deleteErtJob() {
    this.ertService.deleteErtJob(this.ertJobId).subscribe(result => {
      this.getErtJobList();
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        this.getErtJobList();
        document.getElementById('warning-popup-btn').click();
        this.errorMessage = err.error.message;
      }
    });
  }

  openScheduleModel(ertJobId, jobStatus) {
    if (jobStatus === 'READY' || jobStatus === 'COMPLETED' || jobStatus === 'FAILED') {
      this.scheduledeErtJobId = ertJobId;
      document.getElementById('openScheduleModel').click();
    }
  }

  runJob(scheduleObject) {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.scheduleNow = scheduleObject.scheduleNow;
    if (scheduleObject.ins === 'Local') {
      this.instanceId = '';
    } else {
      this.instanceId = scheduleObject.ins;
    }
    const param: any = {
      'ertJobId': this.scheduledeErtJobId,
      'scheduledConfig': scheduleObject,
      'instanceId': this.instanceId
    };
    delete param.scheduledConfig['ins'];
    this.ertService.runJob(param).subscribe(result => {
      if (result.httpStatus === 200) {
        el.click();
        this.isSuccessMsg = true;
        this.successMsg = 'Your Job has Started';
      } else {
        this.isSuccessMsg = false;
        document.getElementById('warning-popup-btn').click();
        this.errorMessage = 'Unable to Process Your Job';
      }
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        document.getElementById('warning-popup-btn').click();
        this.errorMessage = err.error.message;
      }
    });
  }
  close() {
    if (this.isSuccessMsg) {
      if (this.scheduleNow) {
        this.router.navigate(['/activity/status']);
      } else {
        this.router.navigate(['/activity/schedule-monitoring']);
      }
    } else {
      this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
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
