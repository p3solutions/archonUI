import { Component, OnInit, OnDestroy, AfterViewInit, Renderer, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleMonitoringService } from './schedule-monitoring.service';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScheduleDataSource } from './scheduledatasource';

@Component({
  selector: 'app-schedulemonitoring',
  templateUrl: './schedulemonitoring.component.html',
  styleUrls: ['./schedulemonitoring.component.css']
})
export class SchedulemonitoringComponent implements OnInit, AfterViewInit {
  loadStatus = true;
  isAvailable = false;
  output;
  Status = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED' , 'USER_OR_ADMIN_STOPPED'];
  tools = ['RDBMS_EXTRACTION', 'ERT_EXTRACTION'];
  @ViewChild('click') button: ElementRef;
  selectedTool = '';
  selectedJobStatus = '';
  message: any;
  updateNotif = false;
  updateSuccess = false;
  common;
  input;
  jobMessage;
  jobOutput: any;
  displayedColumns: string[] = ['Job Type', 'Tool', 'User', 'Job Name',
    'Job Runs', 'Schedule Time', 'Start Time', 'End Time', 'Last Run Time', 'Next Start Time', 'Status', 'Details', 'Stop'];
  dataSource: ScheduleDataSource;
  totalScreen = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;

  constructor(private router: Router, private renderer: Renderer, private service: ScheduleMonitoringService) {
  }


  ngOnInit(): void {
    this.paginator.pageIndex = 0;
    this.getStart();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.getTable(
      this.selectedTool,
       this.selectedJobStatus,
      this.paginator.pageIndex + 1);
  }

  getStart() {
    this.dataSource = new ScheduleDataSource(this.service);
    this.dataSource.getTable(this.selectedTool, this.selectedJobStatus, this.paginator.pageIndex + 1);
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

}
