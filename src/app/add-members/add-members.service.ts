import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import { AddMembers } from '../add-members';

@Injectable()
export class AddMembersService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  private apiUrl = environment.apiUrl;
  private getAllUsersUrl = this.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    const body = res.data.users;
    return body || [];
  }


  getAllUsers(): Observable<AddMembers[]> {
    return this.http.get<AddMembers[]>(this.getAllUsersUrl, { headers: this.headers }).map(this.extractData).pipe(
      catchError(this.handleError('addmembers', []))
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

