import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from './status.service';
import { ErrorObject } from '../error-object';
import { AuditService } from '../auditing/audit.service';
import { StatusDataSource } from './statusdatasource';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit , AfterViewInit {
  jobList;
  jobOriginList = [];
  jobStatusList = [];
  selectedJobOrigin = '';
  selectedJobStatus = '';
  loadStatus = true;
  errorObject: ErrorObject;
  common: any;
  input: any;
  jobMessage: any;
  jobOutput: any;
  jobServerConfig: any;
  @ViewChild('click') button: ElementRef;
  startIndex = 1;
  displayedColumns: string[] = ['Job Name', 'Job Origin', 'Scheduled Time', 'Start Time',
    'End Time', 'Status', 'Details', 'Retry', 'Download'];
  dataSource: StatusDataSource;
  totalScreen: any = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;
  ObjTest;
  screenInfoList: any;

  constructor(
    private router: Router,
    private statusService: StatusService,
    private service: AuditService
  ) { }

  ngOnInit() {
    this.getJobOrigins();
    this.getJobStatuses();
    this.paginator.pageIndex = 0;
    this.getStart();
    this.ObjTest = new StatusDataSource(this.statusService);
  }


  ngAfterViewInit() {

    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getSearch();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.getTable(
      this.selectedJobOrigin,
      this.selectedJobStatus,
      this.paginator.pageIndex + 1);
  }

  getSearch() {
    this.dataSource.filter(this.paginator.pageIndex + 1, this.search.nativeElement.value);
    this.totalScreen = (this.paginator.pageIndex + 1) * 50;
    if (this.dataSource.paginationRequired) {
      this.totalScreen = this.totalScreen + 50;
    } else {
      if (this.paginator.pageIndex === 0) {
        this.totalScreen = this.screenInfoList.length;
      } else {
        this.totalScreen = (this.paginator.pageIndex) * 50 + this.screenInfoList.length;
      }
    }
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getStart() {
  this.dataSource = new StatusDataSource(this.statusService);
  this.dataSource.connect().subscribe(result => {
    this.screenInfoList = result;
    this.totalScreen = (this.paginator.pageIndex + 1) * 50;
    if (this.dataSource.paginationRequired) {
      this.totalScreen = this.totalScreen + 50;
    } else {
      if (this.paginator.pageIndex === 0) {
        this.totalScreen = this.screenInfoList.length;
      } else {
        this.totalScreen = (this.paginator.pageIndex) * 50 + this.screenInfoList.length;
      }
    }
  });
  this.dataSource.getTable(this.selectedJobOrigin, this.selectedJobStatus, this.paginator.pageIndex + 1);
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


  refreshStatusTable() {
    this.selectedJobOrigin = '';
    this.selectedJobStatus = '';
    this.getStart();
  }

  closeErrorMsg() {
    this.errorObject = null;
  }

  openDetail(id) {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.service.getJobDetails(id).subscribe(result => {
      this.common = result.common;
      this.input = result.input;
      this.jobMessage = result.message;
      this.jobOutput = result.output;
      this.jobServerConfig = result.serverConfiguration;
    });
    el.click();
  }

  retryJob(id) {
    this.statusService.setRetryStatus(id).subscribe(res => {
      if (res && res.success) {
        this.getStart();
      } else {
        this.errorObject = new ErrorObject;
        this.errorObject.message = res.errorMessage;
        this.errorObject.show = true;
      }
    });
  }

  downloadJob(releatedJobId) {
    this.statusService.downloadZip(releatedJobId).subscribe(result => {
      this.downloadFile(result);
    });
  }

    downloadFile(content) {
      const fileName = 'Status' + '-data.zip';
      const type = 'zip';
      const e = document.createEvent('MouseEvents');
      const a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(content);
      a.dataset.downloadurl = [type, a.download, a.href].join(':');
      e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }
}
