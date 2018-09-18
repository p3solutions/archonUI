import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { WorkspaceObject, ConfiguredDB, AnyObject, CreateConfigDBObject } from './workspace-objects';
import { UserinfoService } from './userinfo.service';
import { environment } from '../environments/environment';

@Injectable()
export class UserWorkspaceService {
  apiUrl = environment.apiUrl;
  getConfiguredDBurl = `${this.apiUrl}dbs/configured`;
  createNewWSurl = `${this.apiUrl}workspaces`;
  getAppConfigUrl = `${this.apiUrl}application/config`;
  checkDbConnectionUrl = `${this.apiUrl}dbs/configured/connection`;
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
    this.http = http;
  }

  checkDBConnection(testDbParam: AnyObject) {
    testDbParam.ownerId = this.userinfoService.getUserId();
    return this.http.post(this.checkDbConnectionUrl, testDbParam, { headers: this.userinfoService.getHeaders() })
    .map(this.extractData)
      .pipe(catchError(this.handleError<WorkspaceObject>('createNewWorkspace')));
  }

  

  getUserWorkspaceUrl() {
    return this.apiUrl + 'workspaces?userId=' + this.userinfoService.getUserId();
  }

  getWorkspaceByOwnerIdUrl() {
    return this.apiUrl + 'workspaces?ownerId=' + this.userinfoService.getUserId();
  }

  getUserWorkspaceList(): Observable<WorkspaceObject[]> {
    return this.http.get<WorkspaceObject[]>(this.getUserWorkspaceUrl(), { headers: this.userinfoService.getHeaders() })
      .map(this.extractWorkspaces)
      .pipe(catchError(this.handleError<WorkspaceObject[]>('getUserWorkspaces')));
  }

  getSupportedDBList() {
    return this.http.get<ConfiguredDB[]>(this.getConfiguredDBurl, { headers: this.userinfoService.getHeaders() })
      .map(this.extractConfiguredDatabases)
      .pipe(catchError(this.handleError<ConfiguredDB[]>('getSupportedDBList')));
  }

  // get all supported database server name in drop down
  getAllSupportedDBServer() {
    return this.http.get(this.getAppConfigUrl, { headers: this.userinfoService.getHeaders() })
      .map(this.extractData)
      .pipe(catchError(this.handleError<ConfiguredDB[]>('getSupportedDBList')));
  }

  // Create new Database Configuration service api
  createNewDBConfig(dbParam: AnyObject) {
    dbParam.ownerId = this.userinfoService.getUserId();
    return this.http.post<CreateConfigDBObject>(this.getConfiguredDBurl, dbParam, { headers: this.userinfoService.getHeaders() })
      .map(this.extractData)
      .pipe(catchError(this.handleError<WorkspaceObject>('createNewDBConfig')));
  }

  createNewWorkspace(params: AnyObject) {
    params.ownerId = this.userinfoService.getUserId();
    return this.http.post<WorkspaceObject>(this.createNewWSurl, params, { headers: this.userinfoService.getHeaders() })
      .map(this.extractData)
      .pipe(catchError(this.handleError<WorkspaceObject>('createNewWorkspace')));
  }

  private extractData(res: any) {
    const data = res.data;
    return data || [];
  }
  private extractWorkspaces(res: any) {
    const data = res.data.workspaces;
    return data || [];
  }
  private extractConfiguredDatabases(res: any) {
    const data = res.data.configuredDatabases;
    return data || [];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
