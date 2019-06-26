import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { catchError, map } from 'rxjs/operators';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class EditRelationshipInfoService {
  columnListUrl = this.environment.apiUrl + 'metalyzer/table/columnList?tableId=';
  updateTableListUrl = this.environment.apiUrl + 'metalyzer/relationship?workspaceId=';

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  getColumnsByTableId(tableId) {
    return this.http.get<any[]>(this.columnListUrl + tableId, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractTables),
        catchError(this.handleError('getColumnsByTableId()', [])));
  }

  updateRealation(tableId, workspaceId, joinName, resultArray): Observable<any> {
    const url = this.updateTableListUrl + workspaceId + '&tableId=' + tableId;
    const param = { 'joinName': joinName, 'joinListInfo': resultArray };
    return this.http.put<any>(url, param, { headers: this.userinfoService.getHeaders() });
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
      return of(result);
    };
  }

  private log(message: string) {
  }

}
