import { DataSource } from '@angular/cdk/table';
import { AuditService } from './audit.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class AuditDataSource implements DataSource<any> {

    totalScreen: number;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    output;

    constructor(private service: AuditService) { }

    connect(): Observable<any> {
        return this.adhocSubject.asObservable();
    }

    disconnect(): void {
        this.adhocSubject.complete();
    }

    getTable(params) {
        this.service.getJobStatuses(params).subscribe(result => {
           console.log(result);
            result.responseModel.forEach((value, index) => {
                value.position = index + 1;
            });
            this.totalScreen = result.totalResponse;
            this.adhocSubject.next(result.responseModel);
        });
    }

    // filter(index, search) {
    //     this.service.getSearchResult(index, search).subscribe(result => {
    //         console.log(result, 'filder');
    //         result.responseModel.forEach((value, index ) => {
    //           value.position = index + 1;
    //       });
    //       this.totalScreen = result.totalResponse;
    //       this.adhocSubject.next(result.responseModel);
    //     });
    //   }

}
