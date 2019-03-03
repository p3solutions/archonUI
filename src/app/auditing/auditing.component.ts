import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuditService } from './audit.service';

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
  
  constructor(private router: Router, private auditService: AuditService) { }

  ngOnInit() {
    this.renderTable();
    this.auditService.getJobStatuses().subscribe(x => {
      console.log(x);
    });

  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
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
        title: 'Download',
        render: function (data: any, type: any, full: any) {
          return '<button class="btn btn-danger" view-person-id="' + full.jobName + '">Stop</button>';
        }
      }
    ]
    };
  }

}
