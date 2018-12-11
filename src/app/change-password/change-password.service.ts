import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../change-password';
import { error } from 'util';
import { catchError } from 'rxjs/operators/catchError';
import { JwtHelper } from 'angular2-jwt';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';

@Injectable()
export class ChangePasswordService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });
  private getUsersUrl = environment.apiUrl + 'users/';
  accessToken: string;
  token_data: any;
  userId: string;
  passwordParam: object;
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
    this.userId = this.userinfoService.getUserId();
  }

  changePassword(param) {
    const URL = this.getUsersUrl + this.userId + '/pwd';
    this.passwordParam = param;
    return this.http.patch(URL, this.passwordParam, { headers: this.headers });
    // .pipe(
    // catchError(this.handleError('changePassword'))
    // );
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
