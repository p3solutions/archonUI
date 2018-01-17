import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class WorkspaceLandingPageService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  token_data: any;
  private workspacesForUserUrl;
  private headers;
  constructor(
    private http: HttpClient
  ) {
    this.http = http;
    this.workspacesForUserUrl = 'http://13.58.89.64:9000/users/' + this.getUserId();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthKey()
    });
  }

  getWorkspaces(): Observable<any> {
    return this.http.get<any>(this.workspacesForUserUrl, { headers: this.headers }).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }
  getUserId(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    return this.token_data.user.id;
  }

  getAuthKey() {
    return localStorage.getItem('accessToken');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
