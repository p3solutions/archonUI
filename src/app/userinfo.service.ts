import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Info } from './info';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class UserinfoService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  token_data: any;
  userId = '5a3ba85e4ca51516a7573982';
  private userInfoUrl;
  private headers;

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
    this.userInfoUrl = 'http://13.58.89.64:9000/users/' + this.getUserId();
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthKey()
    });
  }

  getUserId(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    return this.userId = this.token_data.user.id;
  }

  getAuthKey() {
    return localStorage.getItem('accessToken');
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.userInfoUrl, { headers: this.headers }).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
