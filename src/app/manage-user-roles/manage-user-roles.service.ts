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

@Injectable()
export class ManageUserRolesService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json',
   'Authorization': 'Bearer ' + localStorage.getItem('accessToken') });
  private globalRolesUrl = 'http://13.58.89.64:9000/users';
  // manageUserRolesUrl = 'api/manage_user_roles';
  constructor(private http: HttpClient) { }

  // getManageMembersDetails() {
  //   this.http.get(this.globalRolesUrl, {headers: this.headers})
  //   .subscribe(
  //     (data: any[]) => {
  //         console.log('hiiiii', data['data']['users']);
  //     }
  //   );
  // }
//   [04/01/2018 12:43 PM] Shammi Hans: getData():Observable<Post[]> {
//     return this.http.get('http://jsonplaceholder.typicode.com/posts/')
//         .map(this.extractData)
//         .catch(this.handleError);
// }

private extractData(res: any) {
    const body = res.data.users;
    return body || [];
}


  getManageMembersDetails(): Observable<ManageUserRoles[]> {
    return this.http.get<ManageUserRoles[]>(this.globalRolesUrl, {headers: this.headers}).map(this.extractData).pipe(
      catchError(this.handleError('manageuserroles', []))
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
