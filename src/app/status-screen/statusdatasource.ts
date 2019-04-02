import { DataSource } from '@angular/cdk/table';
import { StatusService } from './status.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class StatusDataSource implements DataSource<any> {

    totalScreen: number;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];

    constructor(private statusService: StatusService) { }

    connect(): Observable<any> {
        return this.adhocSubject.asObservable();
    }

    disconnect(): void {
        this.adhocSubject.complete();
    }

    getTable(selectedJobOrigin, selectedJobStatus, startIndex) {
        this.statusService.getJobList(selectedJobOrigin, selectedJobStatus, startIndex).subscribe((result) => {
            result.list.forEach((value, index) => {
                value.position = index + 1;
            });
            this.totalScreen = result.totalScreen;
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