import { DataSource } from '@angular/cdk/table';
import { Adhoc, ParentScreenInfo, SessionAdhoc, ResultFields } from '../adhoc-landing-page/adhoc';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';

export class ScreenDataSource implements DataSource<Adhoc> {

    paginationRequired = false;
    private adhocSubject = new BehaviorSubject<Adhoc[]>([]);

    constructor(private adhocService: AdhocService) { }

    connect(): Observable<Adhoc[]> {
        return this.adhocSubject.asObservable();
    }

    disconnect(): void {
        this.adhocSubject.complete();
    }

    getScreen(startIndexOfScreen, workspaceId, screenId) {
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
        });
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
