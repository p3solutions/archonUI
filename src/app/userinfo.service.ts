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
  userId: string;


  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  getUserId(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    return this.userId = this.token_data.user.id;
  }

  getUserInfoUrl() {
    return 'http://13.58.89.64:9000/users/' + this.getUserId();
  }

  getAuthKey() {
    return localStorage.getItem('accessToken');
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthKey()
    });
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.getUserInfoUrl(), {headers: this.getHeaders()}).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  updateUserProfile(params: any) {
    return this.http.patch<any>(this.getUserInfoUrl(), params, {headers: this.getHeaders()}).
    pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getUpdatedUserInfo() {

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
