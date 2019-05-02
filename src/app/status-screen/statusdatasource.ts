import { DataSource } from '@angular/cdk/table';
import { StatusService } from './status.service';
import { BehaviorSubject, Observable, combineLatest, merge, of } from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {_isNumberValue} from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';

export class StatusDataSource implements DataSource<any> {

    totalScreen = 50;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    indexValue;
    paginationRequired = false;

    constructor(private statusService: StatusService) { 
    }

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
          case 'jobName': return this.compare(a.jobName, b.jobName, isAsc);
          case 'Job Origin': return this.compare(a.jobOrigin, b.jobOrigin, isAsc);
          case 'jobInfo.scheduledTime': return this.compare(a.jobInfo.scheduledTime, b.jobInfo.scheduledTime, isAsc);
          case 'Start Time': return this.compare(a.jobInfo.startTime, b.jobInfo.startTime, isAsc);
          case 'End Time': return this.compare(a.jobInfo.endTime, b.jobInfo.endTimeTime, isAsc);
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

    getTable(selectedJobOrigin, selectedJobStatus, startIndex) {
        this.indexValue = startIndex;
        this.statusService.getJobList(selectedJobOrigin, selectedJobStatus, startIndex).subscribe((result) => {
            result.list.forEach((value, index) => {
                value.position = index + 1;
            });
            if (result.paginationRequired) {
                this.totalScreen = (this.indexValue + 1) * 50;
            }
            this.adhocSubject.next(result.list);
        });
    }

    filter(index, search) {
      this.statusService.getSearchResult(index, search).subscribe(result => {
          console.log(result, 'filter');
          result.list.forEach((value, index ) => {
            value.position = index + 1;
        });
        this.totalScreen = result.totalJobList;
        this.adhocSubject.next(result.list);
      });
    }
}
