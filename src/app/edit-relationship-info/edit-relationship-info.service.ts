import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Headers} from '@angular/http';

@Injectable()
export class EditRelationshipInfoService {
  columnListUrl = environment.apiUrl + '/table/columnList?tableId=';
  updateTableListUrl = environment.apiUrl + '/meta/relationship?workspaceId=';

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) { }

  getColumnsByTableId(tableId) {
    return this.http.get<any[]>(this.columnListUrl + tableId, {headers: this.userinfoService.getHeaders()})
    .map(this.extractTables)
    .pipe(catchError(this.handleError('getColumnsByTableId()', [])));
  }

  updateRealation(tableId, workspaceId, joinName , resultArray): Observable<any> {
    const url = this.updateTableListUrl +  workspaceId + '&tableId=' + tableId;
    const param  = {'joinName': joinName, 'joinListInfo': resultArray};
    return this.http.put<any>(url, param, {headers: this.userinfoService.getHeaders()})
      .pipe(catchError(this.handleError<any>('updateRelation')));
  }

  private extractTables(res: any) {
    const data = res.data.tableColumnList.columnDetails;
    return data || [];
  }

  private handleError<T>(operation = 'updateRelation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
