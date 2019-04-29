import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { ManageUserRoles } from '../manage-user-roles';
import { EnvironmentService } from '../environment/environment.service';
import { AddMembers } from '../add-members';

@Injectable()
export class AddMembersService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  private apiUrl = this.environment.apiUrl;
  private getAllUsersUrl = this.apiUrl + 'users';
  private addMembersUrl = this.apiUrl + 'workspaces/access';

  constructor(private http: HttpClient,
    private environment: EnvironmentService
  ) { }

  private extractData(res: any) {
    const body = res.data.users;
    return body || [];
  }


  getAllUsers(): Observable<ManageUserRoles[]> {
    return this.http.get<AddMembers[]>(this.getAllUsersUrl, { headers: this.headers }).pipe(
      map(this.extractData),
      catchError(this.handleError('getAllUsers', []))
    );
  }
  addMembers(params: any): Observable<any> {
    return this.http.post(this.addMembersUrl, params, { headers: this.headers }).pipe(
      catchError(this.handleError('addmembers', {}))
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
      return of(result);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }

}

