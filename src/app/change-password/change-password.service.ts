import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ChangePassword } from '../ChangePassword';
import { error } from 'util';
import { catchError } from 'rxjs/operators/catchError';
import { JwtHelper } from 'angular2-jwt';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

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

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelper
  ) {
    this.getUserId();
  }

  changePassword(param) {
    const URL = this.getUsersUrl + this.userId + '/pwd';
    console.log('service param', param);
    return this.http.patch(URL, param, { headers: this.headers });
    // .pipe(
    // catchError(this.handleError('changePassword'))
    // );
  }
  getUserId(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    return this.userId = this.token_data.user.id;
  }

  getAuthKey() {
    return localStorage.getItem('accessToken');
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
