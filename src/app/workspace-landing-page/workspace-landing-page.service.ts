import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';

@Injectable()
export class WorkspaceLandingPageService {
  accessToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  token_data: any;
  private workspacesForUserUrl;
  private headers;

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
    this.http = http;
    this.workspacesForUserUrl = environment.apiUrl + 'users/' + this.userinfoService.getUserId();
    this.headers = this.userinfoService.getHeaders();
  }

  getWorkspaces(): Observable<any> {
    return this.http.get<any>(this.workspacesForUserUrl, { headers: this.headers }).
      pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result);
    };
  }

}
