import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ManageUserRoles } from '../manage-user-roles';
import { headersToString } from 'selenium-webdriver/http';
import { Data } from '@angular/router/src/config';
import { GlobalRoles } from '../global-roles';
import { environment } from '../../environments/environment';

@Injectable()
export class ChangeUserRoleService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  private apiUrl = environment.apiUrl;
  private getAllUsersUrl = this.apiUrl + 'users';
  private getGlobalRoleUrl = this.apiUrl + 'admin/roles/global';
  private changeGlobalRoleUrl = this.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    const body = res.data.users;
    return body || [];
  }
  private extractGlobalRolesData(res: any) {
    const body = res.data.globalRoles;
    return body || [];
  }

  getManageMembersDetails(): Observable<ManageUserRoles[]> {
    return this.http.get<ManageUserRoles[]>(this.getAllUsersUrl, { headers: this.headers }).map(this.extractData).pipe(
      catchError(this.handleError('manageuserroles', []))
    );
  }

  changeGlobalRoleDetails(userid, globalid) {
    console.log('demo demo demo demo dem o', userid)
    const body = {
      userId: userid,
      globalRoleId: globalid
    };
    return this.http.patch(this.changeGlobalRoleUrl + userid + '/roles/global', body, { headers: this.headers }).pipe(
      catchError(this.handleError('changeGlobalRoles', []))
    );
  }


  getGlobalRoleDetails(): Observable<GlobalRoles[]> {
    return this.http.get<GlobalRoles[]>(this.getGlobalRoleUrl, { headers: this.headers }).map(this.extractGlobalRolesData).pipe(
      catchError(this.handleError('globalroles', []))
    );
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
