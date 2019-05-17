import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkspaceObject, ConfiguredDB, AnyObject, CreateConfigDBObject } from './workspace-objects';
import { UserinfoService } from './userinfo.service';
import { EnvironmentService } from './environment/environment.service';

@Injectable()
export class UserWorkspaceService {
  apiUrl = this.environment.apiUrl;
  getConfiguredDBurl = `${this.apiUrl}dbs/configured/schemaReadyDbs`;
  getConfigDBurl = `${this.apiUrl}dbs/configured`;
  createNewWSurl = `${this.apiUrl}workspaces`;
  getAppConfigUrl = `${this.apiUrl}application/config`;
  checkDbConnectionUrl = `${this.apiUrl}dbs/configured/connection`;
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) {
    this.http = http;
  }

  checkDBConnection(testDbParam: AnyObject, testServerParam: AnyObject ) {
    testDbParam.ownerId = this.userinfoService.getUserId();
    testDbParam.userName = testServerParam.userName;
    testDbParam.password = testServerParam.password;
    return this.http.post(this.checkDbConnectionUrl, testDbParam, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('test-db-connection'))
    );
  }

  getUserWorkspaceUrl() {
    return this.apiUrl + 'workspaces/approvedWorkspaces?userId=' + this.userinfoService.getUserId();
  }

  getWorkspaceByOwnerIdUrl() {
    return this.apiUrl + 'workspaces?ownerId=' + this.userinfoService.getUserId();
  }

  getUserWorkspaceList(): Observable<WorkspaceObject[]> {
    return this.http.get<WorkspaceObject[]>(this.getUserWorkspaceUrl(), { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspaces),
      catchError(this.handleError<WorkspaceObject[]>('getUserWorkspaces'))
    );
  }

  getSupportedDBList() {
    return this.http.get<ConfiguredDB[]>(this.getConfiguredDBurl, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractConfiguredDatabases),
      catchError(this.handleError<ConfiguredDB[]>('getSupportedDBList'))
    );
  }


  // get all supported database server name in drop down
  getAllSupportedDBServer() {
    return this.http.get(this.getAppConfigUrl, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError<ConfiguredDB[]>('getSupportedDBList'))
    );
  }

  // Create new Database Configuration service api
  createNewDBConfig(dbParam: AnyObject, testServerParam: AnyObject) {
    dbParam.ownerId = this.userinfoService.getUserId();
    dbParam.userName = testServerParam.userName;
    dbParam.password = btoa(testServerParam.password);
    dbParam.isEncoded = true;
    return this.http.post<CreateConfigDBObject>(this.getConfigDBurl, dbParam, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError<WorkspaceObject>('createNewDBConfig'))
    );
  }

  createNewWorkspace(params: AnyObject) {
    params.ownerId = this.userinfoService.getUserId();
    return this.http.post<WorkspaceObject>(this.createNewWSurl, params, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError<WorkspaceObject>('createNewWorkspace'))
    );
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
