import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { ServiceActionsObject } from '../workspace-objects';
import { StatusService } from './status.service';
import { CommonUtilityService } from '../common-utility.service';
import { ErrorObject } from '../error-object';
import { ScheduleMonitoringService } from '../schedulemonitoring/schedule-monitoring.service';
import { AuditService } from '../auditing/audit.service';
// import * as $ from 'jquery';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit {
  jobList: any = [];
  jobOriginList = [];
  jobStatusList = [];
  selectedJobOrigin = '';
  selectedJobStatus = '';
  selectedJD: any = {};
  statusTable: any = null;
  currentTableId = '#status-table';
  loadStatus = false;
  searchBoxText = '';
  refreshClick = false;
  jobRetry = false;
  retryLoader = false;
  errorObject: ErrorObject;
  searchKeyword: any = '';
  common: any;
  input: any;
  jobMessage: any;

  constructor(
    private router: Router,
    private workspaceService: WorkspaceServicesService,
    private statusService: StatusService,
    private commonUtilityService: CommonUtilityService,
    private service: AuditService
  ) { }

  ngOnInit() {
    this.getJobOrigins();
    this.getJobStatuses();
    this.getJobList();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getJobList() {
    this.jobList = [];
    const _thisComponent = this;
    this.statusService.getJobList().subscribe(res => {
      res.forEach(element => {
        _thisComponent.jobList.push(element);
      });
      setTimeout(function () {
        _thisComponent.loadStatus = true;
        _thisComponent.createStatusTable({ 'data': _thisComponent.jobList });
      }, 100);
    });
  }

  getJobOrigins() {
    this.statusService.getJobOrigins().subscribe((res) => {
      this.jobOriginList = res;
    });
  }
  getJobStatuses() {
    this.statusService.getJobStatuses().subscribe((res) => {
      this.jobStatusList = res;
    });
  }
  searchTable() {
    if (!this.refreshClick) {
      this.searchKeyword = `${this.selectedJobOrigin} ${this.selectedJobStatus} ${this.searchBoxText}`;
      if ((this.searchKeyword).trim().length > 0) {
        this.statusTable.table(this.currentTableId).search(this.searchKeyword).draw();
      } else {
        this.statusTable.table(this.currentTableId).search('').columns().search('').draw();
      }
    }
  }
  // filter for services
  selectJobOrigin(selectedItem) {
    if (selectedItem !== '') {
      this.refreshClick = false;
    }
    this.selectedJobOrigin = selectedItem;
    this.searchTable();
  }
  // filter for job status
  selectJobStatus(selectedItem) {
    if (selectedItem !== '') {
      this.refreshClick = false;
    }
    this.selectedJobStatus = selectedItem;
    this.searchTable();
  }
  searchText(selectedItem) {
    if (selectedItem !== '') {
      this.refreshClick = false;
    }
    this.searchBoxText = selectedItem;
    this.searchTable();
  }

  showStatusDetails(jobId, status, jobDetails, inputs) {
    this.selectedJD = {};
    this.selectedJD.id = jobId;
    if (jobDetails.length > 0) {
      const lastIndex = jobDetails.length - 1;
      this.selectedJD.jobId = jobId + ' ~ ' + jobDetails[lastIndex].runAttempt;
    }
    this.selectedJD.status = status;
    this.selectedJD.jobDetails = jobDetails;
    this.selectedJD.inputs = inputs;
    // added for jobDetails
    this.service.getJobDetails(jobId).subscribe(result => {
      this.common = result.common;
      this.input = result.input;
      this.jobMessage = result.message;
    });
  }

  createStatusTable(xData) {
    const thisComponent = this;
    if (this.statusTable) {
      this.statusTable.destroy();
    }
    this.statusTable = $(this.currentTableId).DataTable(
      {
        'ajax': function (data, callback, settings) { callback(xData); },
        'columns': [
          {
            'title': 'Job ID',
            'data': 'id'
          },
          {
            'title': 'Job Origin',
            'data': 'jobOrigin'
          },
          {
            'title': 'Scheduled Time',
            'render': function (data, type, rowData) {
              return thisComponent.commonUtilityService.getDisplayTime(rowData.jobInfo.scheduledTime);
            }
          },
          {
            'title': 'Start Time',
            'render': function (data, type, rowData) {
              return thisComponent.commonUtilityService.getDisplayTime(rowData.jobInfo.startTime);
            }
          },
          {
            'title': 'End Time',
            'render': function (data, type, rowData) {
              return thisComponent.commonUtilityService.getDisplayTime(rowData.jobInfo.endTime);
            }
          },
          {
            'title': 'Status',
            'render': function (data, type, rowData) {
              let html = '';
              if (rowData.jobInfo.jobStatus === 'SUCCESS') {
                html = `<i class="fa fa-check-circle col-green fa-lg" aria-hidden="true"></i>
                                <span class="hide">success</span>`;
              } else if (rowData.jobInfo.jobStatus === 'FAILED') {
                html = `<i class="fa fa-times-circle col-red fa-lg" aria-hidden="true"></i>
                                <span class="hide">FAILED failed</span>`;
              } else if (rowData.jobInfo.jobStatus === 'IN_PROGRESS') {
                html = `<i class="fa fa-circle-o-notch fa-spin col-yellow fa-lg" aria-hidden="true"></i>
                                <span class="hide">in_progress in progress</span>`;
              } else if (rowData.jobInfo.jobStatus === 'SCHEDULED') {
                html = `<i class="fa fa-clock-o col-archon-blue fa-lg" aria-hidden="true"></i>
                                <span class="hide">scheduled</span>`;
              }
              return html;
            },
          },
          {
            'title': 'Details',
            'orderable': false,
            'render': function (data, type, rowData) {
              let html = '';
              if (rowData.jobDetails && rowData.jobDetails.length > 0) {
                html = `<i class="job-details fa fa-info-circle  fa-lg col-archon-blue cur-p"
                                  aria-hidden="true" title="Click to see more"></i>`;
              } else {
                html = `<i class="fa fa-info-circle fa-lg icon-disabled cur-p"
                                 aria-hidden="true" title="No job details tot see"></i>`;
              }
              return html;
            }
          },
          {
            'title': 'Retry',
            'render': function (data, type, rowData) {
              let html = '';
              if (rowData.jobInfo.jobStatus === 'FAILED') {
                html = `<i class="job-repeat job-details fa fa-repeat col-orange fa-lg cur-p" aria-hidden="true"></i>
                                  <span class="hide">retry, repeat</span>`;
              }
              return html;
            }
          }
        ],
        'order': [[0, 'asc']]
      });
    if (document.querySelector('#status-table_wrapper #status-table_filter')) {
      document.querySelector('#status-table_wrapper #status-table_filter').classList.add('vis-hide');
    }
    $(this.currentTableId)
      .off('click', '.job-details')
      .on('click', '.job-details', function () {
        thisComponent.jobRetry = false;
        const index = $(this).closest('tr').index();
        const rowData = thisComponent.statusTable.row(index).data();
        const jobId = rowData.id;
        const status = rowData.jobInfo.jobStatus;
        const jobDetails = rowData.jobDetails;
        const inputs = rowData.inputs;
        if ($(this).hasClass('job-repeat')) {
          thisComponent.jobRetry = true;
        }
        thisComponent.showStatusDetails(jobId, status, jobDetails, inputs);
        $('#job-details-modal').click();
      });
  }
  refreshStatusTable() {
    this.refreshClick = true;
    this.loadStatus = false;
    (<HTMLInputElement>document.querySelector('#job-search-box')).value = '';
    document.getElementById('job-origin-all').click();
    document.getElementById('job-status-all').click();
    this.searchBoxText = '';
    this.selectedJobOrigin = '';
    this.selectedJobStatus = '';
    this.getJobList();
  }

  retryJob() {
    this.retryLoader = true;
    this.statusService.setRetryStatus(this.selectedJD.id).subscribe(res => {
      this.retryLoader = false;
      if (res && res.success) {
        this.jobRetry = false;
        this.getJobList(); // not executing this.refreshStatusTable(); such that current search state is maintained
        const cancelBtn: HTMLButtonElement = document.querySelector('#jobDetailsModal .cancel');
        cancelBtn.click();
      } else {
        this.errorObject = new ErrorObject;
        this.errorObject.message = res.errorMessage;
        this.errorObject.show = true;
      }
    });
  }

  closeErrorMsg() {
    this.errorObject = null;
  }
}
