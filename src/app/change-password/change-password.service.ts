import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../ChangePassword';
import { error } from 'util';
import { catchError } from 'rxjs/operators/catchError';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ChangePasswordService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  private getUsersUrl = 'http://13.58.89.64:9000/users/5a561bb4591221242dc41434/pwd';

  constructor(private http: HttpClient) { }

  changePassword(param) {
    console.log('service param', param);
    return this.http.patch(this.getUsersUrl, param, { headers: this.headers } ).pipe(
      catchError(this.handleError('changePassword'))
    );
  }

   // * Handle Http operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result
  // */
  private handleError<T>(operation = 'operation', result?: T) {
    // tslint:disable-next-line:no-shadowed-variable
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  /** Log a message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
