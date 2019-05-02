import { DataSource } from '@angular/cdk/table';
import { StatusService } from './status.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { StatusScreenComponent } from './status-screen.component';

export class StatusDataSource implements DataSource<any> {

    totalScreen = 50;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    indexValue;
    paginationRequired = false;

    constructor(private statusService: StatusService) { 
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