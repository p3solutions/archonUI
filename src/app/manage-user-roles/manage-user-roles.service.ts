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

@Injectable()
export class ManageUserRolesService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  body= { userId : '5a4cb08259122168004c0ef9',
    globalRoleId : '5a4cae6a90689767f7467a56'
  };
  private getAllUsersUrl = 'http://13.58.89.64:9000/users';
  private getGlobalRoleUrl = 'http://13.58.89.64:9000/admin/roles/global';
  private changeGlobalRoleUrl = 'http://13.58.89.64:9000/users/5a4cb08259122168004c0ef9/roles/global';
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

  changeGlobalRoleDetails() {
    return this.http.patch(this.changeGlobalRoleUrl, this.body, { headers: this.headers })
    .subscribe((res) => console.log(res));
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
