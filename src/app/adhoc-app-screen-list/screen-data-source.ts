import { DataSource } from '@angular/cdk/table';
import { Adhoc, ParentScreenInfo, SessionAdhoc, ResultFields } from '../adhoc-landing-page/adhoc';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { CollectionViewer } from '@angular/cdk/collections';

export class ScreenDataSource implements DataSource<Adhoc> {

    totalScreen: number;
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
                }
            });
            this.totalScreen = result.totalScreen;
            this.adhocSubject.next(result.list);
        });
    }

    getSearchScreen(startIndexOfScreen, value, appId) {

        this.adhocService.getSearchScreen(startIndexOfScreen,
            value, appId).subscribe((result) => {
              // this.screenInfoList = result;
              // this.addPosition();
              // this.dataSource.data = this.screenInfoList;
              // if (this.dataSource.paginator) {
              //   this.dataSource.paginator.firstPage();
              // }
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
                }
            });
            this.totalScreen = result.totalScreen;
            this.adhocSubject.next(result.list);
        });
    }
}
