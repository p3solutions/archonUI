import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from './status.service';
import { ErrorObject } from '../error-object';
import { AuditService } from '../auditing/audit.service';
import { StatusDataSource } from './statusdatasource';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-status-screen',
  templateUrl: './status-screen.component.html',
  styleUrls: ['./status-screen.component.css']
})
export class StatusScreenComponent implements OnInit, AfterViewInit {
  jobList;
  jobOriginList = [];
  jobStatusList = [];
  selectedJobOrigin = '';
  selectedJobStatus = '';
  loadStatus = true;
  errorObject: ErrorObject;
  @ViewChild('click') button: ElementRef;
  @ViewChild('click1') button1: ElementRef;
  startIndex = 1;
  displayedColumns: string[] = ['jobName', 'userid', 'Job Origin', 'jobInfo.startTime', 'Start Time',
    'End Time', 'Status', 'Details', 'Retry', 'Stop', 'Download'];
  dataSource: StatusDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;
  responsemsg;
  jobArray: { common: any, input: any, message: any, output: any, serverConfiguration: any }[] = [];
  expandDefault = false;

  constructor(
    private router: Router,
    private statusService: StatusService,
    private service: AuditService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getJobOrigins();
    this.getJobStatuses();
    this.paginator.pageIndex = 0;
    this.getStart();
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

    merge(this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  sortData(sort) {
    this.dataSource.sortfn(sort);
  }

  loadPage() {
    this.spinner.show();
    this.dataSource.getTable(
      this.selectedJobOrigin,
      this.selectedJobStatus,
      this.paginator.pageIndex + 1);
  }

  getSearch() {
    this.dataSource.filter(this.paginator.pageIndex + 1, this.search.nativeElement.value);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getStart() {
    this.dataSource = new StatusDataSource(this.statusService, this.spinner);
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
    this.expandDefault = false;
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.service.getStatusJobDetails(id).subscribe(result => {
      this.jobArray = result;
      if (this.jobArray.length === 1) {
      this.expandDefault = true;
      }
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

  stopJob(id) {
    const el: HTMLElement = this.button1.nativeElement as HTMLElement;
    this.statusService.terminateJob(id).subscribe((result: any) => {
      if (result) {
        this.responsemsg = result.data;
      }
    }, (err: HttpErrorResponse) => {
      this.responsemsg = err.error.message;
    });
    el.click();
  }
}
