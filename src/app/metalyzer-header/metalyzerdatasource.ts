import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, combineLatest, merge, of } from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {_isNumberValue} from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';
import { MetalyzerHeaderService } from './metalyzer-header.service';
import { NgxSpinnerService } from 'ngx-spinner';

export class MetalyzerDataSource implements DataSource<any> {

    totalScreen = 50;
    private metalyzerSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    indexValue;
    paginationRequired = false;

    constructor(private metalyzerHeaderService: MetalyzerHeaderService,
      private spinner: NgxSpinnerService) {
    }

    connect(): Observable<any> {
        return this.metalyzerSubject.asObservable();
    }

    disconnect(): void {
        this.metalyzerSubject.complete();
    }

    getAudit(workspaceID, userid, startIndex, itemperpage) {
      this.spinner.show();
      try {
        this.indexValue = startIndex;
        const param = {
          'workspaceId': workspaceID,
          'userId': userid
        };
        this.metalyzerHeaderService.getAudit(param, startIndex, itemperpage).subscribe(result => {
          result.model.forEach((value, index) => {
                value.position = index + 1;
          });
          // if (result.isPaginationRequired) {
          //   this.totalScreen = (this.indexValue + 1) * 50;
          // }
          this.totalScreen = result.totalCount;
          this.metalyzerSubject.next(result.model);
          this.spinner.hide();
        });
      } catch {
        this.spinner.hide();
      }
}
}
