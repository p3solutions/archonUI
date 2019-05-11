import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ScheduleJobService } from './schedule-job.service';


@Component({
  selector: 'app-schedule-job',
  templateUrl: './schedule-job.component.html',
  styleUrls: ['./schedule-job.component.css']
})
export class ScheduleJobComponent implements OnInit {

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>  = Object.assign({}, { containerClass: this.colorTheme });
  mytime: Date = new Date();
  enddate: Date = new Date();
  startdate: Date = new Date();
  restrict: Date = new Date();
  jobType;
  Frequency: any = 0;
  jobName = '';
  Server;
  Interval = 'Once';
  @ViewChild('Int') input: ElementRef;
  @Output() ObjectEmit = new EventEmitter<any>();
  @Input() insid: any;
  jobInstancesList = [];
  instances = '';
  eventTemp;

  constructor(
    private Schedulejobservice: ScheduleJobService,
  ) { }

  ngOnInit() {
    if (this.insid === 'ERT') {
      this.getErtInstance();
      } else {
        this.getRdbmsInstance();
      }
  }

  emitObject() {
    let scheduleNow = true;
    if (this.jobType === 'Schedule Later') {
    scheduleNow = false;
    }
    if (this.Frequency === 0) {
    this.Frequency = '';
    }
    const date = this.startdate.toDateString();
    const time = this.mytime.toTimeString();
    const comb = `${date} ${time}`;
    const Date1 = new Date(comb);
    const Obj = {
        'jobName': this.jobName,
        'scheduleNow': scheduleNow,
        'startDate': Date1.valueOf(),
        'frequency': this.Frequency,
        'endDate': this.enddate.setHours(23, 59, 59, 0),
        'interval': this.Interval,
        'ins' : this.instances
        };
  this.ObjectEmit.emit(Obj);
  }

  getErtInstance() {
    this.Schedulejobservice.getErtInstances().subscribe((res) => {
      this.jobInstancesList = res;
    });
  }
  getRdbmsInstance() {
    this.Schedulejobservice.getRdbmsInstances().subscribe((res) => {
      this.jobInstancesList = res;
    });
  }

  reset(jobtype) {
  if (jobtype.value === 'Schedule Now') {
  this.input.nativeElement.value = 'Once';
  this.Interval = 'Once';
  this.Frequency = 0;
  }
  }

  calculateRestriction(event) {
    this.eventTemp = event;
    if (event === 0) {
    this.restrict = new Date();
    } else if (this.Interval === 'Days') {
    this.restrict = new Date (new Date().getTime() + (event * 24 * 60 * 60 * 1000));
    } else if (this.Interval === 'Weeks') {
      event = 7 * event;
      this.restrict = new Date (new Date().getTime() + (event * 24 * 60 * 60 * 1000));
    } else if (this.Interval === 'Months') {
        const now = new Date();
        const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        event = days * event;
        this.restrict = new Date (new Date().getTime() + (event * 24 * 60 * 60 * 1000));
      }
  }

}
