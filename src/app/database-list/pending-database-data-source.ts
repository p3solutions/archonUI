import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { PendingWorkspaceList, ApprovalWorkspaceList } from '../workspace-objects';
import { DatabaseListService } from './database-list.service';

export class PendingDatabaseDataSource implements DataSource<ApprovalWorkspaceList> {

    paginationRequired = false;
    private pendingWorkspaceSubject = new BehaviorSubject<ApprovalWorkspaceList[]>([]);
    public totalCountSubject = new BehaviorSubject<number>(0);
    private readonly _filter = new BehaviorSubject<string>('');

    constructor(private spinner: NgxSpinnerService, private configDBListService: DatabaseListService) { }

    connect(): Observable<ApprovalWorkspaceList[]> {
        return this.pendingWorkspaceSubject.asObservable();
    }

    disconnect(): void {
        this.pendingWorkspaceSubject.complete();
    }

    getPendingWorkspace(startIndex, itemsPerPage, search) {
        this.configDBListService.getPending(startIndex, itemsPerPage, search).subscribe((result) => {
            try {
                this.pendingWorkspaceSubject.next(result.workspaceList);
                this.totalCountSubject.next(result.totalCount);
            } catch {
            }
        });
    }

    sortfn(sort) {
        const data = this.pendingWorkspaceSubject.getValue().slice();
        if (!sort.active || sort.direction === '') {
            const data1 = this.pendingWorkspaceSubject.getValue();
            this.pendingWorkspaceSubject.next(data1);
            return;
        }
        const sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'dbProfileName': return this.compare(a.dbProfileName.toLowerCase(), b.dbProfileName.toLowerCase(), isAsc);
                case 'workspaceName': return this.compare(a.workspaceName.toLowerCase(), b.workspaceName.toLowerCase(), isAsc);
                case 'workspaceOwnerName': return this.compare(a.workspaceOwnerName.toLowerCase(),
                    b.workspaceOwnerName.toLowerCase(), isAsc);
                default: return 0;
            }
        });
        this.pendingWorkspaceSubject.next(sortedData);
    }

    compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
}
