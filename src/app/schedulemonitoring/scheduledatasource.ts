import { DataSource } from '@angular/cdk/table';
import { ScheduleMonitoringService } from './schedule-monitoring.service';
import { BehaviorSubject, Observable, combineLatest, merge, of } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { _isNumberValue } from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

export class ScheduleDataSource implements DataSource<any> {
  private adhocSubject = new BehaviorSubject<any>([]);
  searchArray = [];
  indexValue;
  totalScreen: any;

  constructor(private service: ScheduleMonitoringService, private spinner: NgxSpinnerService) { }

  sortfn(sort) {
    const data = this.adhocSubject.getValue().slice();
    console.log(sort, data);
    if (!sort.active || sort.direction === '') {
      const data1 = this.adhocSubject.getValue();
      this.adhocSubject.next(data1);
      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Job Type': return this.compare(a.jobType.toLowerCase(), b.jobType.toLowerCase(), isAsc);
        case 'Tool': return this.compare(a.tool.toLowerCase(), b.tool.toLowerCase(), isAsc);
        case 'User': return this.compare(a.user.toLowerCase(), b.user.toLowerCase(), isAsc);
        case 'Job Name': return this.compare(a.jobName.toLowerCase(), b.jobName.toLowerCase(), isAsc);
        case 'Job Runs': return this.compare(a.jobRun, b.jobRun, isAsc);
        case 'Schedule Time': return this.compare(a.scheduledDate, b.scheduledDate, isAsc);
        case 'Start Time': return this.compare(a.startTime, b.startTime, isAsc);
        case 'End Time': return this.compare(a.endDate, b.endDate, isAsc);
        case 'Last Run Time': return this.compare(a.lastRuntime, b.lastRuntime, isAsc);
        case 'Next Start Time': return this.compare(a.nextStartTime, b.nextStartTime, isAsc);
        default: return 0;
      }
    });
    this.adhocSubject.next(sortedData);
  }

  compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  connect(): Observable<any> {
    return this.adhocSubject.asObservable();
  }

  disconnect(): void {
    this.adhocSubject.complete();
  }

  getTable(selectedTool, selectedJobStatus, startIndex, itemPerPage, jobName) {
    this.indexValue = startIndex;
    this.spinner.show();
    this.service.getJobStatuses(selectedTool, selectedJobStatus, startIndex, itemPerPage, jobName).subscribe((result) => {
      try {
        result.scheduleJobList.forEach((value, index) => {
          value.position = index + 1;
        });
        // if (result.paginationRequired) {
        //   this.totalScreen = (this.indexValue + 1) * 50;
        // }
        this.totalScreen = result.totalCount;
        this.adhocSubject.next(result.scheduleJobList);
        this.spinner.hide();
      } catch {
        this.spinner.hide();
      }
    });
  }

  filter(index, search) {
    this.service.getSearchResult(index, search).subscribe(result => {
      result.scheduleJobList.forEach((value, index) => {
        value.position = index + 1;
      });
      this.totalScreen = result.totalJobList;
      this.adhocSubject.next(result.scheduleJobList);
    });
  }

}
