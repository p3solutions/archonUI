import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { ManageUserRoles } from '../manage-user-roles';
import { headersToString } from 'selenium-webdriver/http';
import { Data } from '@angular/router/src/config';
import { GlobalRoles } from '../global-roles';
import { environment } from '../../environments/environment';

@Injectable()
export class ManageUserRolesService {
  apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });

  private getAllUsersUrl = this.apiUrl + 'users';
  private getGlobalRoleUrl = this.apiUrl + 'admin/roles/global';
  private changeGlobalRoleUrl = this.apiUrl + 'users/';
  private inviteUserUrl = this.apiUrl + 'users/invite';
  private getInviteUsersUrl = this.apiUrl + 'users/allInviteUsers?startIndex=';

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
    return this.http.get<ManageUserRoles[]>(this.getAllUsersUrl, { headers: this.headers }).pipe(
      map(this.extractData),
      catchError(this.handleError('manageuserroles', []))
    );
  }

  changeGlobalRoleDetails(userid, globalid) {
    const body = {
      userId: userid,
      globalRoleId: globalid
    };
    return this.http.patch(this.changeGlobalRoleUrl + userid + '/roles/global', body, { headers: this.headers })
      .pipe(catchError(this.handleError('changeglobalrole', [])));
  }


  getGlobalRoleDetails(): Observable<GlobalRoles[]> {
    return this.http.get<GlobalRoles[]>(this.getGlobalRoleUrl, { headers: this.headers }).pipe(
      map(this.extractGlobalRolesData),
      catchError(this.handleError('globalroles', []))
    );
  }

  /********************************* services used for new component  **********************************/

  inviteUser(param): Observable<any> {
    return this.http.post<any>(this.inviteUserUrl, param, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('inviteUser', []))
      );
  }

  getInviteUsers(startIndex): Observable<any> {
    return this.http.get<any>(this.getInviteUsersUrl + startIndex, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('getInviteUsers', []))
      );
  }




  private extractDataForAllRequest(res: any) {
    const body = res;
    return body || [];
  }

  // * Handle HttpClient operation that failed.
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
