import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { SignIn } from '../sign-in';

@Injectable()
export class SigninFormService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private signinUrl = environment.apiUrl + 'auth/login';
  constructor(private http: HttpClient) { }
  signIn(signin_info: SignIn): Observable<any> {
    return this.http.post<SignIn>(this.signinUrl, signin_info, { headers: this.headers });
  }

  /*
 * Handle HttpClient operation that failed.
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

