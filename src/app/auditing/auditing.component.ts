import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from './audit.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { UserWorkspaceService } from '../user-workspace.service';

@Component({
  selector: 'app-auditing',
  templateUrl: './auditing.component.html',
  styleUrls: ['./auditing.component.css']
})
export class AuditingComponent implements OnInit {

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
  bsConfig: Partial<BsDatepickerConfig>  = Object.assign({}, { containerClass: this.colorTheme });
  userWorkspaceArray;
  selectedWSId = '';

  constructor(private router: Router, private auditService: AuditService, private userWorkspaceService: UserWorkspaceService) { }

  ngOnInit() {
    this.getAudit();
    this.auditService.getEvetns().subscribe(x => {
      for (const i of x) {
      this.Events.push(i.eventName);
      this.Service.push(i.serviceId);
      }
    });
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      console.log(this.userWorkspaceArray);
    });
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
      'serviceId' : this.selectedService,
      'eventName' : this.selectedEvent,
      'severityLevel' : '',
      'fromDate': fromdate,
      'toDate' : todate
    };
    this.isAvailable = false;
    this.auditService.getJobStatuses(params).subscribe(x => {
      console.log(x);
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
      columns : [
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
          data: 'releatedJobId'
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
          return '<a data-tooltip="Download"><i class="fa fa-download fa-2x" id="' + full.releatedJobId + '" source="Downloads"></i></a>';
        }
        }
    ]
    };
  }

}
