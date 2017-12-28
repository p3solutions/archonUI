import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { WorkSpaceHeaderInfo } from './WorkSpaceHeaderInfo';

@Injectable()
export class UserWorkspaceService {

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  userWorkspaceUrl = 'api/workspaceList';
  currentWorkspaceUrl = 'api/currentWorkspace';

  // getUserWorkspaces(): Observable<WorkSpaceHeaderInfo[]> {
  //   return this.http.get<WorkSpaceHeaderInfo[]>(this.userWorkspaceUrl).
  //   pipe( catchError(this.handleError<WorkSpaceHeaderInfo[]>('getUserWorkspaces')) );
  // }
  getUserWorkspaceList(): Observable<WorkSpaceHeaderInfo[]> {
    return this.http.get<WorkSpaceHeaderInfo[]>(this.userWorkspaceUrl).
      pipe(catchError(this.handleError<WorkSpaceHeaderInfo[]>('getUserWorkspaces')));
  }

  getCurrentWorkspace(): Observable<WorkSpaceHeaderInfo> {
    return this.http.get<WorkSpaceHeaderInfo>(this.currentWorkspaceUrl).
      pipe(catchError(this.handleError<WorkSpaceHeaderInfo>('getUserWorkspaces')));
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
