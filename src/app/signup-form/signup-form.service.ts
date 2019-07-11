import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { SignUp } from '../sign-up';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class SignupFormService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private signupUrl = this.environment.apiUrl + 'auth/signup';

  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) { }
  signUp(signup_info: SignUp): Observable<SignUp> {
    return this.http.post<SignUp>(this.signupUrl, signup_info, { headers: this.headers });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
    // console.log(message);
  }
}
