import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { JwtHelperService } from '@auth0/angular-jwt';
import { UserinfoService } from '../userinfo.service';
import { RelationshipInfoObject } from '../workspace-objects';
import { environment } from '../../environments/environment';
import { WorkspaceObject } from '../workspace-objects';
@Injectable()
export class TableListService {
  accessToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  private serviceActionType: string;
  tableListUrl = environment.apiUrl + 'meta/tablesList?workspaceId=';
  relationTableListUrl = environment.apiUrl + '/meta/tablesRelationShip?tableId=';
  columnUrl = environment.apiUrl + '/tables/meta/info?tableName=';
  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
  }

  getTableList(workspaceId): Observable<string[]> {
    return this.http.get<string[]>(this.tableListUrl + workspaceId, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractTables),
      catchError(this.handleError('tables-getTableList()', []))
    );
  }
  getListOfRelationTable(id): Observable<RelationshipInfoObject[]> {
    const url = this.relationTableListUrl + id;
    return this.http.get<RelationshipInfoObject[]>(url, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractRelationTableList),
      catchError(this.handleError('relationtable-getListOfRelationTable()', []))
    );
  }
  getColumnsByTableName(tableName) {
    console.log('Fetching columns for:', tableName);
    const url = this.columnUrl + tableName;
    return this.http.get<any[]>(url, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractTablesMeta),
      catchError(this.handleError('getColumnsByTableName()', [])));
  }

  private extractTables(res: any) {
    const data = res.data.tableList;
    return data || [];
  }
  private extractRelationTableList(res: any) {
    const data = res.data.relationshipInfo;
    return data || [];
  }

  private extractTablesMeta(res: any) {
    const tableKeys = res.data.tables_meta.table_keys;
    const tableColumns = res.data.tables_meta.table_columns;
    tableKeys.forEach(key => {
      tableColumns.forEach(col => {
        if (key.column_name === col.column_name) {
          col.confidence_score = key.confidence_score * 100;
        }
      });
    });
    const data = res.data.tables_meta.table_columns;
    return data || [];
  }
  setServiceActionType(serviceActionType: string) {
    this.serviceActionType = serviceActionType;
  }
  getServiceActionType() {
    return this.serviceActionType;
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
