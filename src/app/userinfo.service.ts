import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Info } from './info';
import { JwtHelper } from 'angular2-jwt';
import { HttpClient, Headers, Response } from '@angular/http';
import { ErrorObject } from './error-object';
import { environment } from '../environments/environment';
import { UserObject } from './workspace-objects';
import { Router } from '@angular/router';
@Injectable()
export class UserinfoService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  token_data: any;
  errorObject: ErrorObject;
  private loginUrl = 'sign-in';
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.http = http;
  }

  getTokenData() {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
  }

  getUserRoles() {
    this.getTokenData();
    return this.token_data.roles[0];
  }

  getUserId() {
    this.getTokenData();
    return this.token_data.user.id;
  }

  getLoggedInUserFromAccessToken(): UserObject {
    this.getTokenData();
    return this.token_data.user;
  }

  getUserInfoUrl() {
    return environment.apiUrl + 'users/' + this.getUserId();
  }
  getAllUserInfoUrl() {
    return environment.apiUrl + 'users';
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

  getAllUsers() {
    return this.http.get<any>(this.getAllUserInfoUrl(), {headers: this.getHeaders()}).
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
      this.errorObject.message = 'Name is not Updated';
      return this.errorObject;
    }
    if (this.errorObject) {
      this.errorObject = null;
    }
    return null;
  }

  redirectOnSessionTimedOut() {
    // TODO: show alert about losing unsaved data
    const sessionTimedOutUrl = this.router.url;
    localStorage.setItem('sessionTimedOutUrl', sessionTimedOutUrl);
    this.router.navigateByUrl(this.loginUrl);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
