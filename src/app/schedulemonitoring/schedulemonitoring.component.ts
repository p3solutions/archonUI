import { Component, OnInit, OnDestroy, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleMonitoringService } from './schedule-monitoring.service';

@Component({
  selector: 'app-schedulemonitoring',
  templateUrl: './schedulemonitoring.component.html',
  styleUrls: ['./schedulemonitoring.component.css']
})
export class SchedulemonitoringComponent implements OnInit, AfterViewInit {

  loadStatus = true;
  isAvailable = false;
  dtOptions: DataTables.Settings = {};
  output;

  constructor(private router: Router, private renderer: Renderer, private service: ScheduleMonitoringService) {
  }


  ngOnInit(): void {
    this.getStatus();
  }

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      console.log(event);
    });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  getStatus() {
    this.service.getJobStatuses().subscribe(x => {
      this.output = x;
      this.isAvailable = true;
      this.renderTable();
    });
  }

  renderTable() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      scrollX: true,
      autoWidth: true,
      data: this.output,
      columns : [
        {
          title: 'Job Type',
          data: 'jobType'
        },
        {
          title: 'Tool',
          data: 'tool'
        },
        {
          title: 'User',
          data: 'user'
        },
        {
          title: 'jobName',
          data: 'jobName'
        },
        {
          title: 'jobRuns',
          data: 'jobRun'
        },
        {
          title: 'Schedule Time',
          data: 'scheduledDate'
        },
        {
          title: 'Start Time',
          data: 'scheduledDate'
        },
        {
          title: 'End Time',
          data: 'endDate'
        },
        {
          title: 'Last Run Time',
          data: 'lastRuntime'
        },
        {
          title: 'Next Start Time',
          data: 'nextStartTime'
        },
        {
          title: 'Status',
          render: function (data: any, type: any, full: any) {
            console.log(full.status);
            return '<button class="btn btn-success" view-person-id="' + full.jobName + '">Success</button>';
          }
        },
        {
        title: 'Details',
        render: function (data: any, type: any, full: any) {
          return '<button class="btn btn-primary" view-person-id="' + full.jobName + '">Details</button>';
        }
      },
      {
        title: 'Stop',
        render: function (data: any, type: any, full: any) {
          return '<button class="btn btn-danger" view-person-id="' + full.jobName + '">Stop</button>';
        }
      }
    ]
    };
  }

}
