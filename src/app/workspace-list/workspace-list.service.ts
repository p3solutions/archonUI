import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export class WorkspaceListService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  private headers;
  URL: string;
  USERID_URL : string;
  constructor(private http: HttpClient) {
    this.URL = 'http://13.58.89.64:9000/workspaces?ownerId=';
    this.USERID_URL = 'http://13.58.89.64:9000/workspaces?userId=';
    // this.URL = 'api/workspaceListInfo';
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getAuthKey()
      });

  }
  getAuthKey() {
    return localStorage.getItem('accessToken');
  }

  getList(id: string): Observable<any> {
    const URL = this.URL + id;
    console.log(URL);
    return this.http.get<any>(URL, { headers: this.headers }).pipe(
      catchError(this.handleError('workspace-getList()', []))
    );
  }
  getListOfWorkspaceByUserId(id : string) : Observable<any>{
    const USERID_URL = this.URL + id;
    console.log(USERID_URL);
    return this.http.get<any>(USERID_URL, { headers: this.headers }).pipe(
      catchError(this.handleError('workspace-getList()', []))
    );
  }


  // * Handle Http operation that failed.
  // * Let the app continue.
  // * @param operation - name of the operation that failed
  // * @param result - optional value to return as the observable result
  // */
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
