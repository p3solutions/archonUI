import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WorkspaceObject, ConfiguredDB, AnyObject, CreateConfigDBObject } from './workspace-objects';
import { UserinfoService } from './userinfo.service';
import { EnvironmentService } from './environment/environment.service';

@Injectable()
export class UserWorkspaceService {
  userId = sessionStorage.getItem('userId');
  apiUrl = this.environment.apiUrl;
  private headers = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + localStorage.getItem(this.userId)
  });
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

  checkDBConnection(testDbParam: AnyObject, testServerParam: AnyObject, kerberosFile: File) {
    testDbParam.ownerId = this.userinfoService.getUserId();
    testDbParam.userName = testServerParam.userName;
    testDbParam.password = btoa(testServerParam.password);
    testDbParam.isEncoded = true;
    const formData: FormData = new FormData();
    kerberosFile === null ? formData.append('file', null) : formData.append('file', kerberosFile);
    formData.append('databaseCreatedto', JSON.stringify(testDbParam));
    return this.http.post(this.checkDbConnectionUrl, formData, { headers: this.userinfoService.getFileUploadHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('test-db-connection'))
    );
  }

  getUserWorkspaceUrl() {
    return this.apiUrl + 'workspaces/approvedWorkspaces?userId=' + this.userinfoService.getUserId();
  }

  getAuditWorkspaceUrl() {
    return this.apiUrl + 'workspaces/approvedWorkspaces';
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

  getAuditWorkspaceList(): Observable<WorkspaceObject[]> {
    return this.http.get<WorkspaceObject[]>(this.getAuditWorkspaceUrl(), { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspaces),
      catchError(this.handleError<WorkspaceObject[]>('getAuditWorkspaces'))
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
  createNewDBConfig(dbParam: AnyObject, testServerParam: AnyObject, kerberosFile: File) {
    dbParam.ownerId = this.userinfoService.getUserId();
    dbParam.userName = testServerParam.userName;
    dbParam.password = btoa(testServerParam.password);
    dbParam.isEncoded = true;
    const formData: FormData = new FormData();
    kerberosFile === null ? formData.append('file', null) : formData.append('file', kerberosFile);
    formData.append('databaseCreatedto', JSON.stringify(dbParam));
    return this.http.post<CreateConfigDBObject>(this.getConfigDBurl, formData,
      { headers: this.userinfoService.getFileUploadHeaders() }).pipe(
      map(this.extractData)
    );
  }

  createNewWorkspace(params: AnyObject) {
    params.ownerId = this.userinfoService.getUserId();
    return this.http.post<WorkspaceObject>(this.createNewWSurl, params, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractData));
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
