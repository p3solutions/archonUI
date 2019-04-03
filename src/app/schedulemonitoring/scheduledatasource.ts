import { DataSource } from '@angular/cdk/table';
import { ScheduleMonitoringService } from './schedule-monitoring.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class ScheduleDataSource implements DataSource<any> {

    totalScreen: number;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];

    constructor(private service: ScheduleMonitoringService) { }

    connect(): Observable<any> {
        return this.adhocSubject.asObservable();
    }

    disconnect(): void {
        this.adhocSubject.complete();
    }

    getTable(selectedTool, selectedJobStatus, startIndex) {
        this.service.getJobStatuses(selectedTool, selectedJobStatus, startIndex).subscribe((result) => {
            result.scheduleJobList.forEach((value, index) => {
                value.position = index + 1;
            });
            this.totalScreen = result.totalScheduleJob;
            this.adhocSubject.next(result.scheduleJobList);
        });
    }

    filter(index, search) {
        this.service.getSearchResult(index, search).subscribe(result => {
            result.scheduleJobList.forEach((value, index ) => {
              value.position = index + 1;
          });
          this.totalScreen = result.totalScreen;
          this.adhocSubject.next(result.scheduleJobList);
        });
      }

}