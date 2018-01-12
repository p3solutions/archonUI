import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { WorkspacePojo } from './WorkspacePojo';
import { UserinfoService } from './userinfo.service';

@Injectable()
export class UserWorkspaceService {

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
    this.http = http;
  }

  currentWorkspaceUrl = 'api/currentWorkspace';

  private extractData(res: any) {
    console.log('extracting', res);
    const data = res.data.workspaces;
    return data || [];
  }
  getUserWorkspaceUrl() {
    return 'http://13.58.89.64:9000/workspaces?userId=' + this.userinfoService.getUserId();
  }

  getWorkspaceByOwnerIdUrl() {
    return 'http://13.58.89.64:9000/workspaces?ownerId=' + this.userinfoService.getUserId();
  }

  getUserWorkspaceList(): Observable<WorkspacePojo[]> {
    // need to call getUserWorkspaceUrl()
    console.log('getUserWorkspaceUrl', this.getWorkspaceByOwnerIdUrl());
    return this.http.get<WorkspacePojo[]>(this.getWorkspaceByOwnerIdUrl(), { headers: this.userinfoService.getHeaders()})
    .map(this.extractData)
    .pipe(catchError(this.handleError<WorkspacePojo[]>('getUserWorkspaces')));
  }

  getCurrentWorkspace(): Observable<WorkspacePojo> {
    return this.http.get<WorkspacePojo>(this.currentWorkspaceUrl).
      pipe(catchError(this.handleError<WorkspacePojo>('getUserWorkspaces')));
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
