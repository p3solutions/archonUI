import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Signup } from '../signup';
import { environment } from '../../environments/environment';

@Injectable()
export class SignupFormService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private signupUrl = environment.apiUrl + 'auth/signup';

  constructor(private http: HttpClient) { }
  signUp(signup_info: Signup): Observable<Signup> {
    return this.http.post<Signup>(this.signupUrl, signup_info, { headers: this.headers });
  }

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
