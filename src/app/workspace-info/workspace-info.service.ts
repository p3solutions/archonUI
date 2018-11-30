import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserinfoService } from '../userinfo.service';
import { Router } from '@angular/router/src/router';
import { WorkspaceObject } from '../workspace-objects';
import { environment } from '../../environments/environment';
@Injectable()
export class WorkspaceInfoService {
  workspaceinfoUrl = environment.apiUrl + 'workspaces/';
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) { }
  getWorkSpaceInfo(id: string): Observable<WorkspaceObject> {
    const URL = this.workspaceinfoUrl + id;
    return this.http.get<WorkspaceObject>(URL, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspace),
      catchError(this.handleError<WorkspaceObject>('getworkinfo'))
    );
  }
  private extractWorkspace(res: any) {
    const data = res.data.workspaces;
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
