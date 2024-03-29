import { DataSource } from '@angular/cdk/table';
import { StatusService } from './status.service';
import { BehaviorSubject, Observable, combineLatest, merge, of } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { _isNumberValue } from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

export class StatusDataSource implements DataSource<any> {

  totalScreen = 50;
  private adhocSubject = new BehaviorSubject<any>([]);
  searchArray = [];
  indexValue;
  paginationRequired = false;

  constructor(private statusService: StatusService, private spinner: NgxSpinnerService) {
  }

  sortfn(sort) {
    const data = this.adhocSubject.getValue().slice();
    if (!sort.active || sort.direction === '') {
      const data1 = this.adhocSubject.getValue();
      this.adhocSubject.next(data1);
      return;
    }
    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'jobName': return this.compare(a.jobName.toLowerCase(), b.jobName.toLowerCase(), isAsc);
        case 'Job Origin': return this.compare(a.jobOrigin.toLowerCase(), b.jobOrigin.toLowerCase(), isAsc);
        case 'jobInfo.startTime': return this.compare(a.jobInfo.scheduledTime, b.jobInfo.scheduledTime, isAsc);
        case 'Start Time': return this.compare(a.jobInfo.startTime, b.jobInfo.startTime, isAsc);
        case 'End Time': return this.compare(a.jobInfo.endTime, b.jobInfo.endTime, isAsc);
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

  getTable(selectedJobOrigin, selectedJobStatus, startIndex, itemPerPage, jobName) {
    this.indexValue = startIndex;
    this.spinner.show();
    this.statusService.getJobList(selectedJobOrigin, selectedJobStatus, startIndex, itemPerPage, jobName).subscribe((result) => {
      try {
        result.list.forEach((value, index) => {
          value.position = index + 1;
        });
        // if (result.paginationRequired) {
        //   this.totalScreen = (this.indexValue + 1) * 50;
        // }
        this.totalScreen = result.totalJobList;
        this.adhocSubject.next(result.list);
        this.spinner.hide();
      } catch {
        this.spinner.hide();
      }
    });
  }

  filter(index, search, jobOrigin, jobStatus) {
    this.statusService.getSearchResult(index, search, jobOrigin, jobStatus).subscribe(result => {
      result.list.forEach((value, index) => {
        value.position = index + 1;
      });
      this.totalScreen = result.totalJobList;
      this.adhocSubject.next(result.list);
    });
  }
}
