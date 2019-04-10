import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  jobType;
  Frequency = '';
  jobName = '';
  Server;
  Interval = 'Once';

  @Output() ObjectEmit = new EventEmitter<any>();
  @Input() insid: any;
  jobInstancesList = [];
  instances = '';

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

}
