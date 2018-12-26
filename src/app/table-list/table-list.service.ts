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
import { WorkspaceObject } from '../workspace-objects';
@Injectable()
export class TableListService {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  private serviceActionType: string;
  tableListUrl = environment.apiUrl + 'meta/tablesList?workspaceId=';
  relationTableListUrl = environment.apiUrl + '/meta/tablesRelationShip?tableId=';
  deleteRelationsUrl = environment.apiUrl + 'meta/relationship?workspaceId=';
  columnListUrl = environment.apiUrl + '/table/columnList?tableId=';
  dataAnalysisUrl = environment.apiUrl + '/dataAnalyzer/tableToTablesDataCrawlAnalysis';

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
  }

  getTableList(workspaceId): Observable<string[]> {
    return this.http.get<string[]>(this.tableListUrl + workspaceId, { headers: this.userinfoService.getHeaders() })
      .map(this.extractTables)
      .pipe(catchError(this.handleError('tables-getTableList()', []))
      );
  }
  getListOfRelationTable(id, workspaceID): Observable<any[]> {
    const url = this.relationTableListUrl + id + '&workspaceId=' + workspaceID;
    return this.http.get<any[]>(url, { headers: this.userinfoService.getHeaders() })
      .map(this.extractRelationTableList)
      .pipe(catchError(this.handleError('relationtable-getListOfRelationTable()', []))
      );
  }
  deleteRelationInfoData(workspaceID, primaryTableId, relationShipIDs): Observable<any> {
    const url = this.deleteRelationsUrl + workspaceID + '&tableId=' + primaryTableId;
    const params = {relationshipId: relationShipIDs};
    return this.http.request<any>('DELETE', url, { body: params,  headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError('deleteRelationInfoData', []))
      );
  }

  getColumnsByTableId(tableId) {
    return this.http.get<any[]>(this.columnListUrl + tableId, {headers: this.userinfoService.getHeaders()})
    .map(this.extractTable)
    .pipe(catchError(this.handleError('getColumnsByTableId()', [])));
  }

  sendValuesForTableToTableAnalysis(analysisObject): Observable<any> {
    return this.http.post<any[]>( this.dataAnalysisUrl, analysisObject, {headers: this.userinfoService.getHeaders()})
    .pipe(catchError(this.handleError('sendValuesForTabletoTableAnalysis', [])));
  }

  private extractTable(res: any) {
    const data = res.data.tableColumnList.columnDetails;
    return data || [];
  }

  private extractTables(res: any) {
    const data = res.data.tableList;
    return data || [];
  }
  private extractRelationTableList(res: any) {
    const data = res.data.relationshipInfo;
    return data || [];
  }

  setServiceActionType(serviceActionType: string) {
    this.serviceActionType = serviceActionType;
  }
  getServiceActionType() {
    return this.serviceActionType;
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
