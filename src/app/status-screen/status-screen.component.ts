import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { StatusService } from './status.service';
import { CommonUtilityService } from '../common-utility.service';
import { ErrorObject } from '../error-object';
import { AuditService } from '../auditing/audit.service';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit , AfterViewInit {
  dtOptions: DataTables.Settings = {};
  jobList;
  jobOriginList = [];
  jobStatusList = [];
  selectedJobOrigin = '';
  selectedJobStatus = '';
  loadStatus = false;
  errorObject: ErrorObject;
  common: any;
  input: any;
  jobMessage: any;
  jobOutput: any;
  @ViewChild('click') button: ElementRef;

  constructor(
    private router: Router,
    private workspaceService: WorkspaceServicesService,
    private statusService: StatusService,
    private commonUtilityService: CommonUtilityService,
    private service: AuditService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.getJobOrigins();
    this.getJobStatuses();
    this.getJobList();
  }


  ngAfterViewInit(): void {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.getAttribute('source') === 'Status-Details') {
        this.service.getJobDetails(event.target.getAttribute('id')).subscribe(result => {
          this.common = result.common;
          this.input = result.input;
          this.jobMessage = result.message;
          this.jobOutput = result.output;
        });
        el.click();
      } else if (event.target.getAttribute('source') === 'Retry-Job') {
        this.statusService.setRetryStatus(event.target.getAttribute('id')).subscribe(res => {
          if (res && res.success) {
            this.loadStatus = false;
            this.getJobList();
          } else {
            this.errorObject = new ErrorObject;
            this.errorObject.message = res.errorMessage;
            this.errorObject.show = true;
          }
        });
      }
    });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getJobList() {
    this.statusService.getJobList().subscribe(res => {
    this.jobList = res;
    const _this = this;
    setTimeout(function () {
      _this.loadStatus = true;
      _this.renderTable();
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

  selectJobStatus(e) {
  this.selectedJobStatus = e;
  }

  selectJobOrigin(origin) {
    this.selectedJobOrigin = origin;
  }

  renderTable() {
    const _this = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      autoWidth: true,
      data: this.jobList,
      columns: [
        {
          title: 'Job Name',
          data: 'jobName'
        },
        {
          title: 'Job Origin',
          data: 'jobOrigin'
        },
        {
          'title': 'Scheduled Time',
          'render': function (data, type, rowData) {
            return _this.commonUtilityService.getDisplayTime(rowData.jobInfo.scheduledTime);
          }
        },
        {
          'title': 'Start Time',
          'render': function (data, type, rowData) {
            return _this.commonUtilityService.getDisplayTime(rowData.jobInfo.startTime);
          }
        },
        {
          'title': 'End Time',
          'render': function (data, type, rowData) {
            return _this.commonUtilityService.getDisplayTime(rowData.jobInfo.endTime);
          }
        },
        {
          'title': 'Status',
          'orderable': false,
          'render': function (data, type, rowData) {
            let html = '';
            if (rowData.jobInfo.jobStatus === 'SUCCESS') {
              html = `<a data-tooltip="Success"><i class="fa fa-thumbs-o-up fa-2x"></i></a>`;
            } else if (rowData.jobInfo.jobStatus === 'IN_PROGRESS') {
              html = `<a data-tooltip="In_Progress"><i class="fa fa-spinner fa-2x"></i></a>`;
            } else if (rowData.jobInfo.jobStatus === 'FAILED') {
              html = `<a data-tooltip="Failed"><i class="fa fa-thumbs-o-down fa-2x"></i></a>`;
            } else if (rowData.jobInfo.jobStatus === 'SCHEDULED') {
              html = `<a data-tooltip="Scheduled"><i class="fa fa-clock-o fa-2x"></i></a>`;
            }
            return html;
          },
        },
        {
          'title': 'Details',
          'orderable': false,
          'render': function (data, type, rowData) {
            if (rowData.id !== null) {
              return '<a data-tooltip="View Job Details"><i class="fa fa-info-circle fa-2x" id="' + rowData.id + '" source="Status-Details"></i></a>';
            } else {
              return '<a data-tooltip="No Job Details" style="color: grey"><i class="fa fa-info-circle fa-2x"></i></a>';
            }
          }
        },
        {
          'title': 'Retry',
          'orderable': false,
          'render': function (data, type, rowData) {
            if (rowData.jobInfo.jobStatus === 'FAILED') {
              return '<a data-tooltip="Retry"><i class="fa fa-repeat col-orange fa-2x" id="' + rowData.id + '" source="Retry-Job"></i></a>';
            } else {
              return '<a data-tooltip="Nope" style="color: grey"><i class="fa fa-repeat fa-2x"></i></a>';
            }
          }
        }
      ]
    };
  }

  refreshStatusTable() {
    this.loadStatus = false;
    this.selectedJobOrigin = '';
    this.selectedJobStatus = '';
    this.getJobList();
  }

  closeErrorMsg() {
    this.errorObject = null;
  }
}
