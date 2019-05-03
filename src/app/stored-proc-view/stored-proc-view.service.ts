
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserinfoService } from '../userinfo.service';
import { SpvNameList, TableNameAndRelatingTable } from './stored-proc-view';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class StoredProcViewService {

  private addSPVValue = new BehaviorSubject(false);
  currentSPVValue = this.addSPVValue.asObservable();

  private apiUrl = this.environment.apiUrl;
  getSPVNameListUrl: string = this.apiUrl + 'metalyzer/spvanalysis/spvlist?workspaceId=';
  getRelatingTableNameListUrl = this.apiUrl + 'metalyzer/spvanalysis/spvlist/relatingtablelist?workspaceId=';
  createSPVAddJoinurl = this.apiUrl + 'metalyzer/spvanalysis/relationship';

  constructor(
    private http: HttpClient,
    private userInfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  getSPVNameList(workspaceId: string, tableName: string): Observable<SpvNameList> {
    return this.http.get<SpvNameList>(this.getSPVNameListUrl + workspaceId + '&tableName=' + tableName,
      { headers: this.userInfoService.getHeaders() }).pipe(map(this.extractData),
        catchError(this.handleError('getSPVNameList', []))
      );
  }

  getRelatingTableNameList(workspaceId: string, tableName: string, spvName: string): Observable<TableNameAndRelatingTable> {
    return this.http.get<TableNameAndRelatingTable>(this.getRelatingTableNameListUrl + workspaceId + '&tableName=' + tableName
      + '&spvName=' + spvName, { headers: this.userInfoService.getHeaders() }).pipe(map(this.extractData),
        catchError(this.handleError('getRelatingTableNameList', []))
      );
  }

  createSPVAddJoin(param: any): Observable<any> {
    return this.http.post<any>(this.createSPVAddJoinurl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('createSPVAddJoin', []))
      );
  }

  private extractData(res: any) {
    const body = res.data;
    return body || [];
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }

  changeSPVBooleanValue(message) {
    this.addSPVValue.next(message);
  }

}
