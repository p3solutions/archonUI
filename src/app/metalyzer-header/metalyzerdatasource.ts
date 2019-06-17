import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, combineLatest, merge, of } from 'rxjs';
import {MatSort, Sort} from '@angular/material/sort';
import {_isNumberValue} from '@angular/cdk/coercion';
import { map } from 'rxjs/operators';
import { MetalyzerHeaderService } from './metalyzer-header.service';

export class MetalyzerDataSource implements DataSource<any> {

    totalScreen = 50;
    private metalyzerSubject = new BehaviorSubject<any>([]);
    searchArray = [];
    indexValue;
    paginationRequired = false;

    constructor(private metalyzerHeaderService: MetalyzerHeaderService) { 
    }

    connect(): Observable<any> {
        return this.metalyzerSubject.asObservable();
    }

    disconnect(): void {
        this.metalyzerSubject.complete();
    }

    getAudit(workspaceID, userid, startIndex) {
      this.indexValue = startIndex;
      console.log(startIndex, 'index');
      
      const param = {
        'workspaceId': workspaceID,
        'userId': userid
      };
      this.metalyzerHeaderService.getAudit(param, startIndex).subscribe(result => {
        console.log(result, 'resu');
        
        result.model.forEach((value, index) => {
              value.position = index + 1;
        });
        if (result.isPaginationRequired) {
          this.totalScreen = (this.indexValue + 1) * 50;
        }
        this.metalyzerSubject.next(result.model);
      });
    }
}
