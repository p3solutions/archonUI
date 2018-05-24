import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { ServiceActionsObject } from '../workspace-objects';
// import * as  $ from 'jquery';
import { StatusService } from './status.service';
import { statusArray } from '../hardcoded-collection';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit {
  statusList: any;
  jobOriginList = [];
  jobStatusList = [];
  selectedJobOrigin = '';
  selectedJobStatus = '';
  selectedJD: any = {};
  statusTable: any;
  currentTableId = '#status-table';
  dataTableApi: any;
  loadStatus= false;
  searchBoxText = '';
  refreshClick = false;

  constructor(
    private router: Router,
    private workspaceService: WorkspaceServicesService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.getJobOrigins();
    this.getJobStatuses();
    this.getStatusList();
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getStatusList() {
    this.statusList = [];
    const _thisComponent = this;
    this.statusService.getStatusList().subscribe(res => {
      console.log(res);
      this.statusList = res;
      setTimeout(function () {
        _thisComponent.loadStatus = true;
        _thisComponent.createStatusTable();
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
      const searchKeyword = `${this.selectedJobOrigin} ${this.selectedJobStatus} ${this.searchBoxText}`;
      console.log(searchKeyword, 'searchKeyword');
      if ((searchKeyword).trim().length > 0) {
        this.statusTable.table(this.currentTableId).search(searchKeyword).draw();
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
  searchText(_event) {
    const selectedItem = _event.target.value;
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
    console.log(this.selectedJD);
  }

  createStatusTable() {
    const thisComponent = this;
    if (this.statusTable) {
      this.statusTable.destroy();
    }
    this.statusTable = $(this.currentTableId).DataTable(
      {
      'order': [[0, 'asc']]
    });
    if (document.querySelector('#status-table_wrapper #status-table_filter')) {
      document.querySelector('#status-table_wrapper #status-table_filter').classList.add('vis-hide');
    }
  }
  refreshStatusTable() {
    this.refreshClick = true;
    (<HTMLInputElement>document.querySelector('#job-search-box')).value = '';
    document.getElementById('job-origin-all').click();
    document.getElementById('job-status-all').click();
    this.searchBoxText = '';
    this.selectedJobOrigin = '';
    this.selectedJobStatus = '';
    this.getStatusList();
  }
}
