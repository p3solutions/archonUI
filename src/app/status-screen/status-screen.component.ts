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
  selectedJD: any;
  statusTable: any;
  currentTableId = '#status-table';
  dataTableApi: any;
  loadStatus= false;
  searchBoxText = '';

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
    this.statusList = statusArray;
    const _this = this;
    setTimeout(function () {
      _this.loadStatus = true;
      _this.createStatusTable();
    }, 500);
  }

  getJobOrigins() {
    this.statusService.getJobOrigins().subscribe((res) => {
      this.jobOriginList = res;
      // console.log(res);
    });
  }
  getJobStatuses() {
    this.statusService.getJobStatuses().subscribe((res) => {
      this.jobStatusList = res;
      // console.log(res);
    });
  }
  searchTable() {
    const searchKeyword = `${this.selectedJobOrigin} ${this.selectedJobStatus} ${this.searchBoxText}`;
    console.log(searchKeyword, 'searchKeyword');
    if ((searchKeyword).trim().length > 0) {
      this.statusTable.table(this.currentTableId).search(searchKeyword).draw();
    } else {
      this.statusTable.table(this.currentTableId).search('').columns().search('').draw();
    }
  }
  // filter for services
  selectJobOrigin(selectedItem) {
    this.selectedJobOrigin = selectedItem;
    this.searchTable();
  }
  // filter for job status
  selectJobStatus(selectedItem) {
    this.selectedJobStatus = selectedItem;
    this.searchTable();
  }
  searchText(_event) {
    this.searchBoxText = _event.target.value;
    this.searchTable();
  }

  showStatusInfo(status, jobId, jobDetails) {
    this.selectedJD = jobDetails;
    this.selectedJD.job_id = jobId;
    this.selectedJD.status = status;
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
    document.querySelector('#status-table_wrapper #status-table_filter').classList.add('vis-hide');
  }
  refreshStatusTable() {
    (<HTMLInputElement>document.querySelector('#job-search-box')).value = '';
    document.getElementById('job-origin-all').click();
    document.getElementById('job-status-all').click();
    this.getStatusList();
  }
}
