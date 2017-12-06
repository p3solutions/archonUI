import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Signin } from './signin';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Forgotpassword } from './forgotpassword';

@Injectable()
export class SignInService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  // The URL to the API
  signinUrl = 'api/signin';
  forgotPasswordUrl = 'api/forgotpassword';
  
  signIn(signin_info: Signin): Observable<Signin> {
    console.log(signin_info);
    return this.http.post<Signin>(this.signinUrl, signin_info, { headers: this.headers }).pipe(
      catchError(this.handleError<Signin>('signin'))
    );
  }
  forgotPassword(forgotpassword_info: Forgotpassword): Observable<Signin> {
    console.log(forgotpassword_info);
    return this.http.post<Signin>(this.forgotPasswordUrl, forgotpassword_info, { headers: this.headers }).pipe(
      catchError(this.handleError<Signin>('forgotpassword'))
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
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
