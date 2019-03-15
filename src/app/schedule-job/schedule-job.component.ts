import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

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
  jobType;
  Frequency;
  jobName;
  Server;
  Interval;

  @Output() ObjectEmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitObject() {
    let scheduleNow = true;
    if (this.jobType === 'Schedule Later') {
    scheduleNow = false;
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
        'endDate': this.enddate.valueOf(),
        'interval': this.Interval
        };
  this.ObjectEmit.emit(Obj);
  }

}
