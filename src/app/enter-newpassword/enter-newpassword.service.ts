import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { NewPasswordSetter } from './newpasswordsetter';
import { environment } from '../../environments/environment';
@Injectable()
export class EnterNewpasswordService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private forgotPasswordUrl = environment.apiUrl + 'auth/pwd-reset';

  constructor(private http: HttpClient) { }

  passwordReset(newPasswordSetForm: NewPasswordSetter): Observable<any> {
    return this.http.post<NewPasswordSetter>(this.forgotPasswordUrl, newPasswordSetForm, { headers: this.headers });
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

