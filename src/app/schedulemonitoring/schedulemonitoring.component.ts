import { Component, OnInit, OnDestroy, AfterViewInit, Renderer, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleMonitoringService } from './schedule-monitoring.service';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScheduleDataSource } from './scheduledatasource';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-schedulemonitoring',
  templateUrl: './schedulemonitoring.component.html',
  styleUrls: ['./schedulemonitoring.component.css']
})
export class SchedulemonitoringComponent implements OnInit, AfterViewInit {
  loadStatus = true;
  isAvailable = false;
  output;
  Status = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'USER_OR_ADMIN_STOPPED'];
  tools = ['RDBMS_EXTRACTION', 'ERT_EXTRACTION'];
  @ViewChild('click') button: ElementRef;
  @ViewChild('notification') notification1: ElementRef;
  @ViewChild('errornotification') errornotification1: ElementRef;
  selectedTool = '';
  selectedJobStatus = '';
  message: any;
  updateNotif = false;
  updateSuccess = false;
  common;
  input;
  jobMessage;
  jobOutput: any;
  displayedColumns: string[] = ['Job Name', 'User', 'Job Origin', 'Job Type',
    'Job Runs', 'Schedule Time', 'Start Time', 'End Time', 'Last Run Time', 'Next Start Time', 'Status', 'Details', 'Stop'];
  dataSource: ScheduleDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;
  @ViewChild('terminateconfirmation') terminate: ElementRef;
  terminateJobID;

  constructor(private router: Router, private renderer: Renderer, private spinner: NgxSpinnerService,
    private service: ScheduleMonitoringService) {
  }


  ngOnInit(): void {
    this.paginator.pageIndex = 0;
    this.getStart();
  }

  ngAfterViewInit(): void {

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
    this.dataSource.getTable(
      this.selectedTool,
      this.selectedJobStatus,
      this.paginator.pageIndex + 1);
  }

  getStart() {
    this.dataSource = new ScheduleDataSource(this.service, this.spinner);
    this.dataSource.getTable(this.selectedTool, this.selectedJobStatus, this.paginator.pageIndex + 1);
  }

  openDetail(id) {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.service.getDetails(id).subscribe(result => {
      this.common = result.common;
      this.input = result.input;
      this.jobMessage = result.message;
      this.jobOutput = result.output;
      el.click();
    });
  }
  stop() {
    const elNotification: HTMLElement = this.notification1.nativeElement as HTMLElement;
    const elErrNotification: HTMLElement = this.errornotification1.nativeElement as HTMLElement;
    this.service.stopJob(this.terminateJobID).subscribe(result => {
      if (result) {
        this.updateSuccess = true;
        this.message = result.data;
        elNotification.click();
        this.getStart();
      }
    }, (err: HttpErrorResponse) => {
      this.updateNotif = true;
      this.message = err.error.message;
      elErrNotification.click();
    });
  }

  selectTool(tool) {
    this.selectedTool = tool;
  }

  selectJobStatus(status) {
    this.selectedJobStatus = status;
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getSearch() {
    this.dataSource.filter(this.paginator.pageIndex + 1, this.search.nativeElement.value);
  }

  terminateConfirmation(id) {
    this.terminateJobID = id;
    const el: HTMLElement = this.terminate.nativeElement as HTMLElement;
    el.click();
   }

}
