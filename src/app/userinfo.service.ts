import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorObject } from './error-object';
import { UserObject } from './workspace-objects';
import { Router } from '@angular/router';
import { EnvironmentService } from './environment/environment.service';
@Injectable()
export class UserinfoService {
  accessToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  token_data: any;
  errorObject: ErrorObject;
  userRole;
  private loginUrl = 'sign-in';
  constructor(
    private http: HttpClient,
    private router: Router,
    private environment: EnvironmentService
  ) {
    this.http = http;
  }

  getUserRole(role) {
    this.userRole = role;
  }

  getTokenData() {
    const userId = sessionStorage.getItem('userId');
    this.accessToken = localStorage.getItem(userId);
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
  }

  getRoleList() {
    this.getTokenData();
    const roleList = this.token_data.roles.map(function (item) { return item['roleName']; });
    return roleList;
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
    return this.environment.apiUrl + 'users/' + this.getUserId();
  }
  getAllUserInfoUrl() {
    return this.environment.apiUrl + 'users';
  }

  getAuthKey() {
    const userId = sessionStorage.getItem('userId');
    return localStorage.getItem(userId);
  }

  getHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getAuthKey()
    });
  }

  getFileUploadHeaders() {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.getAuthKey()
    });
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(this.getUserInfoUrl(), { headers: this.getHeaders() }).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getAllUsers() {
    return this.http.get<any>(this.getAllUserInfoUrl(), { headers: this.getHeaders() }).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  updateUserProfile(params: any) {
    return this.http.patch<any>(this.getUserInfoUrl(), params, { headers: this.getHeaders() }).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getUpdatedFirstName() {
    return ((<HTMLInputElement>document.getElementById('firstName')).value).trim();
  }
  getUpdatedLastName() {
    return ((<HTMLInputElement>document.getElementById('lastName')).value).trim();
  }

  getUpdatedEmail() {
    return ((<HTMLInputElement>document.getElementById('userEmail')).value).trim();
  }

  isInvalidEditValues(user) {
    this.errorObject = new ErrorObject;
    this.errorObject.show = true;
    if (this.getUpdatedFirstName() === '') {
      this.errorObject.message = 'First Name cannot be empty';
      return this.errorObject;
    }
    if (this.getUpdatedLastName() === '') {
      this.errorObject.message = 'Last Name cannot be empty';
      return this.errorObject;
    }
    if (this.getUpdatedEmail() === '') {
      this.errorObject.message = 'Email cannot be empty';
      return this.errorObject;
    }
    if (this.getUpdatedFirstName() === user.firstName && this.getUpdatedLastName() ===
      user.lastName && this.getUpdatedEmail() === user.useremail) {
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
    // const sessionTimedOutUrl = this.router.url; // commented we are not using return url for any purpose.
    // localStorage.setItem('sessionTimedOutUrl', sessionTimedOutUrl);
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      localStorage.removeItem(userId);
    }
    sessionStorage.clear();
    this.router.navigateByUrl(this.loginUrl);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
