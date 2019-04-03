import { DataSource } from '@angular/cdk/table';
import { StatusService } from './status.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class StatusDataSource implements DataSource<any> {

    totalScreen = 50;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    indexValue;

    constructor(private statusService: StatusService) { }

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
          result.list.forEach((value, index ) => {
            value.position = index + 1;
        });
        this.totalScreen = result.totalScreen;
        this.adhocSubject.next(result.list);
      });
    }

}