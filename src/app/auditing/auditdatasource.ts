import { DataSource } from '@angular/cdk/table';
import { AuditService } from './audit.service';
import { BehaviorSubject, Observable } from 'rxjs';

export class AuditDataSource implements DataSource<any> {

    totalScreen: number;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    output;
    indexValue: any;
    private readonly _filter = new BehaviorSubject<string>('');
    filteredData = [];

    constructor(private service: AuditService) { }

    connect(): Observable<any> {
        return this.adhocSubject.asObservable();
    }

    disconnect(): void {
        this.adhocSubject.complete();
    }

    getTable(params, startIndex) {
        this.indexValue = startIndex;
        this.service.getJobStatuses(params).subscribe(result => {
                result.responseModel.forEach((value, index) => {
                value.position = index + 1;
            });
            if (result.paginationRequired) {
                this.totalScreen = (this.indexValue + 1) * 50;
            }
            this.adhocSubject.next(result.responseModel);
        });
    }

    filterPredicate: ((data, filter: string) => boolean) = (data, filter: string): boolean => {
        const accumulator = (currentTerm, key) => currentTerm + data[key];
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
    }

    _filterData(dataSource) {
        this.filteredData =
            !this.filter ? dataSource : dataSource.filter(obj => this.filterPredicate(obj, this.filter));
        this.adhocSubject.next(this.filteredData);
        return this.filteredData;
    }



    get filter(): string { return this._filter.value; }
    set filter(filter: string) {
        this._filter.next(filter);
    }

}
