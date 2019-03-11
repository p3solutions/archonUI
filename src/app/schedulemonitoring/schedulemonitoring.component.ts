import { Component, OnInit, OnDestroy, AfterViewInit, Renderer, TemplateRef, ElementRef, ViewChild } from '@angular/core';
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
  Status = ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'FAILED' , 'USER_OR_ADMIN_STOPPED'];
  tools = ['RDBMS_EXTRACTION'];
  @ViewChild('click') button: ElementRef;
  selectedTool = '';
  selectedJobStatus = '';
  message: any;
  updateNotif = false;
  updateSuccess = false;
  common;
  input;
  jobMessage;

  constructor(private router: Router, private renderer: Renderer, private service: ScheduleMonitoringService) {
  }


  ngOnInit(): void {
    this.getStatus();
  }

  ngAfterViewInit(): void {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.renderer.listenGlobal('document', 'click', (event) => {
    if (event.target.getAttribute('source') === 'Details') {
      this.service.getDetails(event.target.getAttribute('id')).subscribe(result => {
      this.common = result.common;
      this.input = result.input;
      this.jobMessage = result.message;
      });
      el.click();
    } else if (event.target.getAttribute('source') === 'Stop') {
      this.service.stopJob(event.target.getAttribute('id')).subscribe(result => {
       if (result.success) {
      this.updateSuccess = true;
      this.message = result.data;
      this.getStatus();
       } else if (result.status === 500) {
         this.updateNotif = true;
         this.message = result.message;
       }
      });
    }
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

  getStatus() {
    this.isAvailable = false;
    this.service.getJobStatuses(this.selectedTool, this.selectedJobStatus).subscribe(x => {
      this.output = x;
      this.isAvailable = true;
      this.renderTable();
    });
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
            if (full.status === 'COMPLETED') {
            return '<a data-tooltip="Success"><i class="fa fa-thumbs-o-up fa-2x"></i></a>';
            } else if (full.status === 'SCHEDULED') {
              return '<a data-tooltip="Scheduled"><i class="fa fa-clock-o fa-2x"></i></a>';
            } else if (full.status === 'IN_PROGRESS') {
              return '<a data-tooltip="In_Progress"><i class="fa fa-spinner fa-2x"></i></a>';
            } else if (full.status === 'FAILED') {
              return '<a data-tooltip="Failed"><i class="fa fa-thumbs-o-down fa-2x"></i></a>';
            } else if (full.status === 'USER_OR_ADMIN_STOPPED') {
              return '<a data-tooltip="Stopped"><i class="fa fa-ban fa-2x"></i></a>';
            }
          }
        },
        {
        title: 'Details',
        render: function (data: any, type: any, full: any) {
          return '<a data-tooltip="Details"><i class="fa fa-search fa-2x" id="' + full.scheduleId + '" source="Details"></i></a>';
        }
      },
      {
        title: 'Stop',
        render: function (data: any, type: any, full: any) {
          if (full.status !== 'USER_OR_ADMIN_STOPPED') {
            return '<a data-tooltip="Stop"><i class="fa fa-stop-circle fa-2x" id="' + full.scheduleId + '" source="Stop"></i></a>';
          } else {
            return '<a data-tooltip="Stopped"><i class="fa fa-stop-circle fa-2x" style="color: grey"></i></a>';
          }
        }
      }
    ]
    };
  }
}
