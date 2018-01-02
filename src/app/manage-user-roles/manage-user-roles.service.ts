import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ManageUserRoles } from '../manage-user-roles';

@Injectable()
export class ManageUserRolesService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json',
   // tslint:disable-next-line:max-line-length
   'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwicm9sZXMiOlt7InJvbGVJZCI6bnVsbCwicm9sZU5hbWUiOiJST0xFX05PVF9BU1NJR05FRCJ9XSwidXNlciI6eyJuYW1lIjpudWxsLCJpZCI6bnVsbCwiZW1haWxBZGRyZXNzIjoidGVzdEB0ZXN0LmNvbSJ9LCJpc3MiOiJJTkZPUExFWCIsImlhdCI6MTUxMzkyMDM3MSwiZXhwIjoxNTEzOTIxMjcxfQ.DNmTEHzgYV9ZkUGZnhDJdvB3FAQkLn5kJ9sKZ0apPnSCEmRzr4ZWO6lFBeaV6SOnixi-SzpAog07VFyjJHgTKQ' });
  private globalRolesUrl = 'http://13.58.89.64:9000/users';
  manageUserRolesUrl = 'api/manage_user_roles';
  constructor(private http: HttpClient) { }

  getManageMembersDetails(): Observable<ManageUserRoles[]> {
    return this.http.get<ManageUserRoles[]>(this.globalRolesUrl).pipe(
      catchError(this.handleError('manageuserroles', []))
    );
  }
  // getManageMembersDetails(): Observable<ManageUserRoles[]> {
  //   return this.http.get<ManageUserRoles[]>(this.manageUserRolesUrl).pipe(
  //     catchError(this.handleError('manageuserroles', []))
  //   );
  // }


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
