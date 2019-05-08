import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserinfoService } from '../userinfo.service';
import { ConfiguredDB, DatabaseObject } from '../workspace-objects';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class DatabaseListService {

  accessToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();

  private apiUrl = this.environment.apiUrl;
  private configDBListUrl = this.apiUrl + 'dbs/configured';
  private getAllApproval = this.apiUrl + 'workspaces/approvalPending';
  private postdecision = this.apiUrl + 'workspaces/approvalEntry';

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) {
  }
  getListOfConfigDatabases(): Observable<ConfiguredDB[]> {
    return this.http.get<ConfiguredDB[]>(this.configDBListUrl, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractConfigDB),
        catchError(this.handleError('database-getList()', []))
      );
  }

  getDBInfoByID(databaseId: string): Observable<ConfiguredDB> {
    return this.http.get<ConfiguredDB>(this.configDBListUrl + '/' + databaseId, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractConfigDB),
        catchError(this.handleError('getDBInfoByID', []))
      );
  }

  deleteDB(databaseId: string): Observable<ConfiguredDB> {
    return this.http.delete<ConfiguredDB>(this.configDBListUrl + '/' + databaseId, { headers: this.userinfoService.getHeaders() })
    .pipe(
      map(this.deletedatabase)
    );
  }

 updateDB(DBupdateId: string, params: any): Observable<ConfiguredDB> {
    return this.http.patch<ConfiguredDB>(this.configDBListUrl + '/' + DBupdateId, params, { headers: this.userinfoService.getHeaders() })
    .pipe(
      map(this.updatedatabase)
    );
  }
  private extractConfigDB(res: any) {
    const data = res.data.configuredDatabases;
    return data || [];
  }

  private deletedatabase(res: any) {
    const data = res.data;
    return data || [];
  }

  private updatedatabase(res: any) {
    const data = res.data;
    return data || [];
  }


  getPending(): Observable<any> {
    return this.http.get<any>(this.getAllApproval, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractApprove),
        catchError(this.handleError('getPending', []))
      );
  }

  private extractApprove(res: any) {
    const data = res.data.pendingWorkspace;
    return data || [];
  }

  postDecision(body): Observable<any> {
    return this.http.post<any>(this.postdecision, body, { headers: this.userinfoService.getHeaders() })
      .pipe(
        catchError(this.handleError('postDecision', []))
      );
  }


  // * Handle HttpClient operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result
  // */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }


}
