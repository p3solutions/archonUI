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
export class ChangeUserRoleService {
  passedUserId: string;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  private apiUrl = environment.apiUrl;
  private getAllUsersUrl = this.apiUrl + 'users';
  private getGlobalRoleUrl = this.apiUrl;
  private changeGlobalRoleUrl = this.apiUrl;
  changeRoleName: any;
  allRoleurl: string;

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

  changeGlobalRoleDetails(userid, globalid, rolename, roleid) {
    const body = {
      userId: userid,
      globalRoleId: globalid
    };
    if (rolename === 'ROLE_SUPER_ADMIN') {
      this.changeRoleName = 'superadmin/';
    } else {
      this.changeRoleName = 'users/';
    }
    this.passedUserId = roleid;
    return this.http.patch(this.changeGlobalRoleUrl + this.changeRoleName + this.passedUserId + '/roles/global',
     body, { headers: this.headers }).pipe(
      catchError(this.handleError('changeGlobalRoles', []))
    );
  }


  getGlobalRoleDetails(allrole): Observable<GlobalRoles[]> {
    if (allrole === 'ROLE_SUPER_ADMIN') {
      this.allRoleurl = 'superadmin';
    } else {
      this.allRoleurl = 'admin';
    }
    return this.http.get<GlobalRoles[]>(this.getGlobalRoleUrl + this.allRoleurl + '/roles/global',
     { headers: this.headers }).pipe(
      map(this.extractGlobalRolesData),
      catchError(this.handleError('globalroles', []))
    );
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
  }


}
