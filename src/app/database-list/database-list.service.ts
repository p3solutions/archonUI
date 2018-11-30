import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { JwtHelper } from 'angular2-jwt';
import { UserinfoService } from '../userinfo.service';
import { ConfiguredDB, DatabaseObject } from '../workspace-objects';
import { environment } from '../../environments/environment';

@Injectable()
export class DatabaseListService {

  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();

  configDBListUrl = environment.apiUrl + '/dbs/configured';
  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
  }
  getListOfConfigDatabases(): Observable<ConfiguredDB[]> {
    return this.http.get<ConfiguredDB[]>(this.configDBListUrl, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractConfigDB),
      catchError(this.handleError('database-getList()', []))
    );
  }
  private extractConfigDB(res: any) {
    const data = res.data.configuredDatabases;
    return data || [];
  }


  // * Handle HttpClient operation that failed.
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
