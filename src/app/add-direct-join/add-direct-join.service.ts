import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';
import { UserinfoService } from '../userinfo.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AddDirectJoinService {

  private apiUrl = this.environment.apiUrl;

  private columnListUrl = this.apiUrl + 'metalyzer/table/columnList?tableId=';
  private addNewJoinUrl = this.apiUrl + 'metalyzer/relationship';
  private clearSessionUrl = this.apiUrl + 'dataAnalyzer/stateManagement/closeSession?jobId=';

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  getColumnsByTableId(tableId) {
    return this.http.get<any[]>(this.columnListUrl + tableId, { headers: this.userinfoService.getHeaders() })
      .pipe(map(this.extractTables),
        catchError(this.handleError('getColumnsByTableId()', [])));
  }

  addNewJoin(param): Observable<any> {
    return this.http.post<any>(this.addNewJoinUrl, param, { headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError('addNewJoin()', [])));
  }

  clearSession(jobId): Observable<any> {
    return this.http.put<any>(this.clearSessionUrl + jobId, '', { headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError<any>('ClearSession()')));
  }

  private extractTables(res: any) {
    const data = res.data.tableColumnList.columnDetails;
    return data || [];
  }

  private handleError<T>(operation = 'getColumnsByTableId()', result?: T) {
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
