import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Info } from './info';
import { JwtHelper } from 'angular2-jwt';
import { Http, Headers, Response } from '@angular/http';
import { ErrorObject } from './error-object';
@Injectable()
export class UserinfoService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  token_data: any;
  errorObject: ErrorObject;

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  getTokenData() {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
  }

  getUserRoles() {
    this.getTokenData();
    return this.token_data.roles;
  }

  getUserId() {
    this.getTokenData();
    console.log(this.token_data);
    return this.token_data.user.id;
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

  getUpdatedName() {
    return ((<HTMLInputElement>document.getElementById('userName')).value).trim();
  }

  getUpdatedEmail() {
    return ((<HTMLInputElement>document.getElementById('userEmail')).value).trim();
  }

  isInvalidEditValues(user) {
    this.errorObject = new ErrorObject;
    this.errorObject.show = true;
    if (this.getUpdatedName() === '') {
      this.errorObject.message = 'Name cannot be empty';
      return this.errorObject;
    }
    if (this.getUpdatedEmail() === '') {
      this.errorObject.message = 'Email cannot be empty';
      return this.errorObject;
    }
    if (this.getUpdatedName() === user.username && this.getUpdatedEmail() === user.useremail) {
      this.errorObject.message = 'Name or email is not changed';
      return this.errorObject;
    }
    if (this.errorObject) {
      this.errorObject = null;
    }
    return null;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
