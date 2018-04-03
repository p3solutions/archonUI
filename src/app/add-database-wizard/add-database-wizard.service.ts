import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
// import { WorkspaceObject, ConfiguredDB, AnyObject } from './workspace-objects';
import { UserinfoService } from '../userinfo.service';
import { environment } from '../../environments/environment';
import { UserObject, AnyObject, ConfiguredDB, WorkspaceObject } from '../workspace-objects';


@Injectable()
export class AddDatabaseWizardService {

  apiUrl = environment.apiUrl;
  getConfiguredDBurl = `${this.apiUrl}dbs/configured`;
  createNewWSurl = `${this.apiUrl}workspaces`;
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
    this.http = http;
  }

  // getUserWorkspaceUrl() {
  //   return this.apiUrl + 'workspaces?userId=' + this.userinfoService.getUserId();
  // }

  getWorkspaceByOwnerIdUrl() {
    return this.apiUrl + 'workspaces?ownerId=' + this.userinfoService.getUserId();
  }

  createNewWorkspace(params: AnyObject) {
    params.ownerId = this.userinfoService.getUserId();
    return this.http.post<WorkspaceObject>(this.createNewWSurl, params, { headers: this.userinfoService.getHeaders() })
      .map(this.extractData)
      .pipe(catchError(this.handleError<WorkspaceObject>('createNewWorkspace')));
  }
  // createNewWorkspace(params: AnyObject) {
  //   params.ownerId = this.userinfoService.getUserId();
  //   return this.http.post<WorkspaceObject>(this.createNewWSurl, params, { headers: this.userinfoService.getHeaders() })
  //     .map(this.extractData)
  //     .pipe(catchError(this.handleError<WorkspaceObject>('createNewWorkspace')));
  // }

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
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
