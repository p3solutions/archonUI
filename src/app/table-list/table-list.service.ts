import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { JwtHelper } from 'angular2-jwt';
import { UserinfoService } from '../userinfo.service';
import { RelationshipInfoObject } from '../workspace-objects';
import { environment } from '../../environments/environment';
@Injectable()
export class TableListService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();

  tableListUrl = environment.apiUrl + '/metadata/tableList';
  relationTableListUrl = environment.apiUrl + '/metadata/';
  private headers;
  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
    this.headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.userinfoService.getAuthKey()
      });
  }
  getTableList(): Observable<string[]> {
    return this.http.get<string[]>(this.tableListUrl, { headers: this.userinfoService.getHeaders() })
      .map(this.extractTables)
      .pipe(catchError(this.handleError('tables-getTableList()', []))
      );
  }

  getListOfRelationTable(id: string): Observable<RelationshipInfoObject[]> {
    const url = this.relationTableListUrl + id;
    return this.http.get<RelationshipInfoObject[]>(url, { headers: this.userinfoService.getHeaders() })
      .map(this.extractRelationTableList)
      .pipe(catchError(this.handleError('relationtable-getListOfRelationTable()', []))
      );
  }

  private extractTables(res: any) {
    const data = res.data.tables;
    return data || [];
  }
  private extractRelationTableList(res: any) {
    const data = res.data.relationship_Info;
    return data || [];
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
