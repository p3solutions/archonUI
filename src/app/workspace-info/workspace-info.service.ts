import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http/* , Headers, Response */ } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { WorkspaceInfo } from './workspace-info';
import { Router } from '@angular/router/src/router';
@Injectable()
export class WorkspaceInfoService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  workspaceinfoUrl = 'http://13.58.89.64:9000/workspaces/access?workspaceId=';
  constructor(
    private http: HttpClient,
  ) { }
  getWorkSpaceInfo(id: string): Observable<WorkspaceInfo> {
    const URL = this.workspaceinfoUrl + id;
    return this.http.get<WorkspaceInfo>(URL, { headers: this.headers }).pipe(
      catchError(this.handleError<WorkspaceInfo>('getworkinfo'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
