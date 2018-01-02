import { Injectable } from '@angular/core';
import { HttpClient/* , HttpHeaders */ } from '@angular/common/http';
import { Http/* , Headers, Response */ } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Workspaceinfo } from './workspaceinfo';
import { Router } from '@angular/router/src/router';

@Injectable()
export class WorkspaceinfoService {
  // private headers = new HttpHeaders({ 'Content-Type': 'application/json'});
  workspaceinfoUrl = 'api/workspaceinfo';
  constructor(
    private http: HttpClient,
  ) { }

  getworkinfo(): Observable<Workspaceinfo> {
    return this.http.get<Workspaceinfo>(this.workspaceinfoUrl).pipe(
      catchError(this.handleError<Workspaceinfo>('getworkinfo'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

  // private log(message: string) {
  //   console.log(message);
  // }

