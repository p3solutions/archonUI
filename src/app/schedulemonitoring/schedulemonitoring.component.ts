import { Component, OnInit, OnDestroy, AfterViewInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedulemonitoring',
  templateUrl: './schedulemonitoring.component.html',
  styleUrls: ['./schedulemonitoring.component.css']
})
export class SchedulemonitoringComponent implements OnInit, AfterViewInit {

  loadStatus = true;
  dtOptions: DataTables.Settings = {};
  date = new Date();
  persons = [{
  'Job Type': 'Scheduled Once',
  'Tool': 'RDBMS',
  'User': 'Satheesh',
  'jobName' : 'RDBMS',
  'jobRuns': 0,
  'Schedule Time': new Date(),
  'Start Time' : new Date(),
  'End Time': '',
  'Last Run Time': '',
  'Next Start Time': new Date()
  }];

  output = [
    {
      'jobType': 'Scheduled Once',
      'tool': 'RDBMS_EXTRACTION',
      'user': '5ac5dc652e6c990861830977',
      'jobName': 'RDBMS_TEST',
      'scheduledDate': '2019-03-01T10:50:56',
      'endDate': '2019-03-01T10:50:56',
      'lastRuntime': '2019-03-01T10:50:56',
      'nextStartTime': '2019-03-02T10:50:56',
      'jobRun': '1',
      'status': 'COMPLETED'
  },
  {
    'jobType': 'Scheduled Once',
    'tool': 'RDBMS_EXTRACTION',
    'user': '5ac5dc652e6c990861830977',
    'jobName': 'RDBMS_TEST',
    'scheduledDate': '2019-03-01T10:32:54',
    'endDate': '2019-03-01T10:32:54',
    'lastRuntime': '2019-03-01T10:32:54',
    'nextStartTime': '2019-03-02T10:32:54',
    'jobRun': '1',
    'status': 'COMPLETED'
}
  ];

  constructor(private router: Router, private renderer: Renderer) { }


  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.renderer.listenGlobal('document', 'click', (event) => {
      console.log(event);
    });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

}
