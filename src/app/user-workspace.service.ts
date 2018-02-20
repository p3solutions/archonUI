import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { WorkspaceObject } from './workspace-objects';
import { UserinfoService } from './userinfo.service';
import { environment } from '../environments/environment';

@Injectable()
export class UserWorkspaceService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
    this.http = http;
  }

  private extractWorkspaces(res: any) {
    const data = res.data.workspaces;
    return data || [];
  }
  getUserWorkspaceUrl() {
    return this.apiUrl + 'workspaces?userId=' + this.userinfoService.getUserId();
  }

  getWorkspaceByOwnerIdUrl() {
    return this.apiUrl + 'workspaces?ownerId=' + this.userinfoService.getUserId();
  }

  getUserWorkspaceList(): Observable<WorkspaceObject[]> {
    return this.http.get<WorkspaceObject[]>(this.getUserWorkspaceUrl(), { headers: this.userinfoService.getHeaders()})
    .map(this.extractWorkspaces)
    .pipe(catchError(this.handleError<WorkspaceObject[]>('getUserWorkspaces')));
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
