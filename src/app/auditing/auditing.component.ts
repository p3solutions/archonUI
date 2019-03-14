import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Renderer, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from './audit.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserWorkspaceService } from '../user-workspace.service';
import { ScheduleMonitoringService } from '../schedulemonitoring/schedule-monitoring.service';

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit, AfterViewInit {

  loadStatus = true;
  isAvailable = true;
  dtOptions: DataTables.Settings = {};
  output;
  selectedWS = '';
  Events = [];
  Service = [];
  selectedEvent = '';
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
  @ViewChild('click') button: ElementRef;
  uniqueService;

  constructor(private router: Router, private auditService: AuditService, private userWorkspaceService: UserWorkspaceService,
    private renderer: Renderer, private service: ScheduleMonitoringService) { }

  ngOnInit() {
    this.getAudit();
    this.auditService.getEvetns().subscribe(x => {
      for (const i of x) {
        this.Events.push(i.eventName);
        this.Service.push(i.serviceId);
      }
      this.uniqueService = Array.from(new Set(this.Service));
    });
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
    });
  }

  ngAfterViewInit(): void {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.getAttribute('source') === 'Details') {
        this.auditService.getJobDetails(event.target.getAttribute('id')).subscribe(result => {
          this.common = result.common;
          this.input = result.input;
          this.jobMessage = result.message;
          console.log(this.common, this.input, this.jobMessage);
        });
        el.click();
      } else if (event.target.getAttribute('source') === 'Downloads') {
        this.auditService.downloadZip(event.target.getAttribute('id')).subscribe(result => {
          this.downloadFile(result);
        });
      }
    });
  }

  downloadFile(content) {
    const fileName = 'audit' + '-data.zip';
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
      'userId': '',
      'workspaceId': this.selectedWSId,
      'serviceId': this.selectedService,
      'eventName': this.selectedEvent,
      'severityLevel': '',
      'fromDate': fromdate,
      'toDate': todate
    };
    this.isAvailable = false;
    this.auditService.getJobStatuses(params).subscribe(x => {
      this.output = x;
      this.isAvailable = true;
      this.renderTable();
    });
  }

  selectWorkspace(param) {
    this.selectedWS = param.workspaceName;
    this.selectedWSId = param.id;
  }

  selectEvent(e) {
    this.selectedEvent = e;
  }

  selectService(service) {
    this.selectedService = service;
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      autoWidth: true,
      data: this.output,
      columns: [
        {
          title: 'User Name',
          data: 'userName'
        },
        {
          title: 'WorkSpace Name',
          data: 'workspaceName'
        },
        {
          title: 'Related Job ID',
          render: function (data: any, type: any, full: any) {
            if (full.releatedJobId !== null) {
              // tslint:disable-next-line: max-line-length
              return '<a data-tooltip="View Job Details"><i class="fa fa-info-circle fa-2x" id="' + full.releatedJobId + '" source="Details"></i></a>';
            } else {
              return '<a data-tooltip="No Job Details" style="color: grey"><i class="fa fa-info-circle fa-2x"></i></a>';
            }
          }
        },
        {
          title: 'Service Name',
          data: 'serviceId'
        },
        {
          title: 'Event Name',
          data: 'eventName'
        },
        {
          title: 'Event Desc',
          data: 'eventDescription'
        },
        {
          title: 'Event Details',
          data: 'eventDetails'
        },
        {
          title: 'Download',
          render: function (data: any, type: any, full: any) {
            if (full.releatedJobId !== null) {
              return '<a data-tooltip="Download"><i class="fa fa-download fa-2x" id="' + full.releatedJobId + '" source="Downloads"></i></a>';
            } else {
              return '<a data-tooltip="Not Available"><i class="fa fa-download fa-2x" style="color: grey"></i></a>';
            }
          }
        }
      ]
    };
  }

}
