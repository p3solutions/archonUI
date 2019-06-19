import { DataSource } from '@angular/cdk/table';
import { AuditService } from './audit.service';
import { BehaviorSubject, Observable, combineLatest, merge, of } from 'rxjs';
import { MatSort, Sort } from '@angular/material/sort';
import { _isNumberValue } from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

export class AuditDataSource implements DataSource<any> {

    totalScreen: number;
    private adhocSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    output;
    indexValue: any;
    private readonly _filter = new BehaviorSubject<string>('');
    filteredData = [];

    constructor(private service: AuditService, private spinner: NgxSpinnerService) { }

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
                case 'User Name': return this.compare(a.userName.toLowerCase(), b.userName.toLowerCase(), isAsc);
                case 'WorkSpace Name': return this.compare(a.workspaceName.toLowerCase(), b.workspaceName.toLowerCase(), isAsc);
                case 'Related Job ID': return this.compare(a.releatedJobId, b.releatedJobId, isAsc);
                case 'Service Name': return this.compare(a.serviceId, b.serviceId, isAsc);
                case 'Event Name': return this.compare(a.eventName.toLowerCase(), b.eventName.toLowerCase(), isAsc);
                case 'Event Desc': return this.compare(a.eventDescription.toLowerCase(), b.eventDescription.toLowerCase(), isAsc);
                case 'Event Details': return this.compare(a.eventDetails.toLowerCase(), b.eventDetails.toLowerCase(), isAsc);
                case 'Event Date': return this.compare(a.eventDate, b.eventDate, isAsc);
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

    getTable(params, startIndex) {
        this.indexValue = startIndex;
        this.spinner.show();
        this.service.getJobStatuses(params).subscribe(result => {
            try {
                result.responseModel.forEach((value, index) => {
                    value.position = index + 1;
                });
                if (result.paginationRequired) {
                    this.totalScreen = (this.indexValue + 1) * 50;
                }
                this.adhocSubject.next(result.responseModel);
                this.spinner.hide();
            } catch {
                this.spinner.hide();
            }
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
