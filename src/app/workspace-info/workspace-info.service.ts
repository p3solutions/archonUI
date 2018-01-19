import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { UserinfoService } from '../userinfo.service';

import { WorkspaceInfo } from './workspace-info';
import { Router } from '@angular/router/src/router';
@Injectable()
export class WorkspaceInfoService {
  workspaceinfoUrl = 'http://13.58.89.64:9000/workspaces/';
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) { }
  getWorkSpaceInfo(id: string): Observable<WorkspaceInfo> {
    const URL = this.workspaceinfoUrl + id;
    return this.http.get<WorkspaceInfo>(URL, { headers: this.userinfoService.getHeaders() })
    .map(this.extractWorkspace)
    .pipe(catchError(this.handleError<WorkspaceInfo>('getworkinfo'))
    );
  }

  private extractWorkspace(res: any) {
    console.log(res);
    const data = res.data.workspace;
    return data || [];
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
