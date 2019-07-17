import { DataSource } from '@angular/cdk/table';
import { Adhoc, ParentScreenInfo, SessionAdhoc, ResultFields } from '../adhoc-landing-page/adhoc';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class ScreenDataSource implements DataSource<Adhoc> {

    paginationRequired = false;
    private adhocSubject = new BehaviorSubject<Adhoc[]>([]);

    constructor(private adhocService: AdhocService, private spinnner: NgxSpinnerService) { }

    sortfn(sort) {
        const data = this.adhocSubject.getValue().slice();
        if (!sort.active || sort.direction === '') {
            const data1 = this.adhocSubject.getValue();
            this.adhocSubject.next(data1);
            return;
        }
        const sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'position': return this.compare(a.position, b.position, isAsc);
                case 'screenName': return this.compare(a.screenName.toLowerCase(), b.screenName.toLowerCase(), isAsc);
                case 'screenDesc': return this.compare(a.screenDesc.toLowerCase(), b.screenDesc.toLowerCase(), isAsc);
                case 'updatedBy': return this.compare(a.lastModifiedBy.toLowerCase(), b.lastModifiedBy.toLowerCase(), isAsc);
                case 'updatedDate': return this.compare(a.updatedAt, b.updatedAt, isAsc);
                case 'parentScreenInfo.screenName': return this.compare(a.parentScreenInfo.screenName.toLowerCase(),
                    b.parentScreenInfo.screenName.toLowerCase(), isAsc);
                default: return 0;
            }
        });
        this.adhocSubject.next(sortedData);
    }

    compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    connect(): Observable<Adhoc[]> {
        return this.adhocSubject.asObservable();
    }

    disconnect(): void {
        this.adhocSubject.complete();
    }

    getScreen(startIndexOfScreen, workspaceId, screenId) {
        this.spinnner.show();
        try {
            this.adhocService.getScreen(startIndexOfScreen, workspaceId, screenId).subscribe((result) => {
                result.list.forEach((value, index) => {
                    value.position = index + 1;
                    if (value.parentScreenInfo === null) {
                        value.parentScreenInfo = new ParentScreenInfo();
                    }
                    if (value.childScreenInfo === null) {
                        value.childScreenInfo = [];
                    }
                    if (value.sessionAdhocModel === null) {
                        value.sessionAdhocModel = new SessionAdhoc();
                        value.madeDownlaodDisabled = true;
                    }
                    if (value.childScreenInfo !== null) {
                        value.link = true;
                    }
                });
                this.paginationRequired = result.paginatiomRequired;
                this.adhocSubject.next(result.list);
                this.spinnner.hide();
            });
        } catch{
            this.spinnner.hide();
        }
    }

    getSearchScreen(startIndexOfScreen, value, appId) {

        this.adhocService.getSearchScreen(startIndexOfScreen,
            value, appId).subscribe((result) => {
                result.list.forEach((value, index) => {
                    value.position = index + 1;
                    if (value.parentScreenInfo === null) {
                        value.parentScreenInfo = new ParentScreenInfo();
                    }
                    if (value.childScreenInfo === null) {
                        value.childScreenInfo = [];
                    }
                    if (value.sessionAdhocModel === null) {
                        value.sessionAdhocModel = new SessionAdhoc();
                        value.madeDownlaodDisabled = true;
                    }
                });
                this.paginationRequired = result.paginatiomRequired;
                this.adhocSubject.next(result.list);
            });
    }
}
