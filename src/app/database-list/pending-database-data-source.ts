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
}
