import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from './audit.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserWorkspaceService } from '../user-workspace.service';
import { ScheduleMonitoringService } from '../schedulemonitoring/schedule-monitoring.service';
import { MatPaginator, MatSort } from '@angular/material';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuditDataSource } from './auditdatasource';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit, AfterViewInit {

  loadStatus = true;
  isAvailable = true;
  output;
  selectedWS = '';
  Events = [];
  Service = [];
  selectedEvent = 'LOGIN';
  selectedService = '';
  enddate = '';
  startdate = '';
  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig> = Object.assign({}, { containerClass: this.colorTheme });
  userWorkspaceArray;
  selectedWSId = '';
  jobMessage;
  input;
  common;
  jobOutput;
  @ViewChild('click') button: ElementRef;
  uniqueService;
  displayedColumns: string[] = ['User Name', 'WorkSpace Name', 'Related Job ID', 'Service Name',
    'Event Name', 'Event Desc', 'Event Details', 'Event Date', 'Download'];
  dataSource: AuditDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('search') search: ElementRef;
  eventName: any;


  constructor(private router: Router, private auditService: AuditService, private userWorkspaceService: UserWorkspaceService,
    private renderer: Renderer, private service: ScheduleMonitoringService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.paginator.pageIndex = 0;
    if (this.selectedEvent !== '' || this.selectedService !== '' || this.selectedWS !== '' || this.startdate !== '' || this.enddate !== '') {
      this.getAudit();
    } else {
      this.getAudit();
    }
    this.auditService.getEvetns().subscribe(x => {
      for (const i of x) {
        this.Events.push(i.eventName);
        this.Service.push(i.serviceId);
      }
      this.uniqueService = Array.from(new Set(this.Service));
    });
    this.userWorkspaceService.getAuditWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
    });
  }

  ngAfterViewInit(): void {
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.getAudit();
          this.spinner.hide();
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page)
      .pipe(
        tap(() => this.getAudit())
      )
      .subscribe();

  }

  sortData(sort) {
    this.dataSource.sortfn(sort);
  }



  openDetail(releatedJobId) {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.auditService.getJobDetails(releatedJobId).subscribe(result => {
      this.common = result.common;
      this.input = result.input;
      this.jobMessage = result.message;
      this.jobOutput = result.output;
      el.click();
    });
  }

  downloadJob(element) {
    this.eventName = element.eventName;
    this.auditService.downloadZip(element.releatedJobId).subscribe(result => {
      this.downloadFile(result);
    });
  }

  downloadFile(content) {
    const fileName = 'audit' + `-${this.eventName}.zip`;
    const type = 'zip';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getAudit() {
    let fromdate = '', todate = '';
    if (this.startdate !== '') {
      const from = new Date(this.startdate);
      fromdate = new Intl.DateTimeFormat().format(from);
    }
    if (this.enddate !== '') {
      const from = new Date(this.enddate);
      todate = new Intl.DateTimeFormat().format(from);
    }
    const params = {
      'userId': this.search.nativeElement.value,
      'workspaceId': this.selectedWSId,
      'serviceId': this.selectedService,
      'eventName': this.selectedEvent,
      'severityLevel': '',
      'fromDate': fromdate,
      'toDate': todate
    };
    this.isAvailable = false;
    this.dataSource = new AuditDataSource(this.auditService, this.spinner);
    this.dataSource.getTable(params, this.paginator.pageIndex + 1);

  }

  selectWorkspace(param) {
    this.selectedWS = param.workspaceName;
    if (param.id === undefined) {
      this.selectedWSId = '';
    } else {
      this.selectedWSId = param.id;
    }
  }

  selectEvent(e) {
    this.selectedEvent = e;
  }

  selectService(service) {
    this.selectedService = service;
  }
}
