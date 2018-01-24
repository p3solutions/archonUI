import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { JwtHelper } from 'angular2-jwt';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceInfo } from '../workspace-info/workspace-info';
import { WorkspacePojo } from '../WorkspacePojo';

@Injectable()
export class WorkspaceListService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  URL = 'http://13.58.89.64:9000/workspaces?ownerId=';
  wSListByUidUrl = 'http://13.58.89.64:9000/workspaces?userId=';
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) { }

  getList(id: string): Observable<WorkspacePojo[]> {
    const URL = this.URL + id;
    return this.http.get<WorkspacePojo[]>(URL, { headers: this.userinfoService.getHeaders() })
      .map(this.extractWorkspaces)
    .pipe(catchError(this.handleError('workspace-getList()', []))
    );
  }

  getListOfWorkspaceByUserId(id: string): Observable<WorkspacePojo[]> {
    this.wSListByUidUrl = this.URL + id;
    return this.http.get<WorkspacePojo[]>(this.wSListByUidUrl, { headers: this.userinfoService.getHeaders() })
      .map(this.extractWorkspaces)
      .pipe(catchError(this.handleError('workspace-getList()', []))
    );
  }

  private extractWorkspaces(res: any) {
    const data = res.data.workspaces;
    return data || [];
  }


  // * Handle Http operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result
  // */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
    console.log(message);
  }


}
