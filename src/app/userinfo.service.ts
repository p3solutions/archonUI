import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
import { Info } from './info';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class UserinfoService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  token_data: any;
  userId = '5a3ba85e4ca51516a7573982';
  userInfoUrl = 'users/';

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  getUserId(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    // this.info = new Info();
    // this.info.role = this.token_data.user.role;
    // this.info.username = this.token_data.username;
    // if (this.token_data.user.role === 'ROLE_NOT_ASSIGNED') {
    // this.info.show = true;
    // }
    return this.userId = this.token_data.user.id;
  }

  getUserInfo(): Observable<Info> {
    // const userId = this.getUserId();
    const userId = this.userId;
    console.log('localStorage', localStorage, 'id:', userId);
    return this.http.get<Info>(this.userInfoUrl + userId).
      pipe(catchError(this.handleError<Info>('getUserInfo')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
