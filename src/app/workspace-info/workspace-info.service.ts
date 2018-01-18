import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { JwtHelper } from 'angular2-jwt';
import { WorkspaceInfo } from './workspace-info';
@Injectable()
export class WorkspaceInfoService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  private headers;
  URL: string;
  constructor(private http: HttpClient) {
    this.URL = 'http://13.58.89.64:9000/workspaces/';
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAuthKey()
      });
  }
  getAuthKey() {
    return localStorage.getItem('accessToken');
  }
  getWorkSpaceInfo(id: string): Observable<WorkspaceInfo> {
    const URL = this.URL + id;
    console.log(URL);
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
