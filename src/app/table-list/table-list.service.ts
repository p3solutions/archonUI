import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserinfoService } from '../userinfo.service';
import { BehaviorSubject } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';


@Injectable()
export class TableListService {
  accessToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  private serviceActionType: string;
  private apiUrl = this.environment.apiUrl;
  private tableListUrl = this.apiUrl + 'metalyzer/tablesList?workspaceId=';
  private relationTableListUrl = this.apiUrl + 'metalyzer/tablesRelationShip?tableId=';
  private deleteRelationsUrl = this.apiUrl + 'metalyzer/relationship?workspaceId=';
  private columnListUrl = this.apiUrl + 'metalyzer/table/columnList?tableId=';
  private dataAnalysisUrl = this.apiUrl + 'dataAnalyzer/tableToTablesDataCrawlAnalysis';
  private stateManagementUrl = this.apiUrl + 'dataAnalyzer/stateManagement';
  private getJobStatusUrl = this.apiUrl + 'dataAnalyzer/jobStatus?jobId=';
  private exportxmlUrl = this.apiUrl + 'metalyzer/exportMetadata/';
  private resultantArray = new BehaviorSubject([]);
  currentResultArray = this.resultantArray.asObservable();
  private changeValue = new BehaviorSubject(false);
  currentValue = this.changeValue.asObservable();
  private selectTableslist = new BehaviorSubject('');
  private tableListUrlMMR = this.apiUrl + 'metalyzer/getRelationshipList?workspaceId=';
  userselectTableslist = this.selectTableslist.asObservable();

  private selectDropdownlist = new BehaviorSubject('false');
  Dropdownlist = this.selectDropdownlist.asObservable();
  startIndex = 1;
 

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) {
  }

  getTableList(workspaceId, startIndex): Observable<string[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<string[]>(this.tableListUrl + workspaceId + '&startIndex=' + startIndex, { headers: this.userinfoService.getHeaders() }).
      pipe(
        map(this.extractTables),
        catchError(this.handleError('tables-getTableList()', []))
      );
  }

  getTablesearchList(workspaceId, tablesearchname = ''): Observable<string[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<string[]>(this.tableListUrl + workspaceId + '&tableName=' + tablesearchname, { headers: this.userinfoService.getHeaders() }).
      pipe(
        map(this.extractTables),
        catchError(this.handleError('tables-getTableList()', []))
      );
  }

  getListOfRelationTable(id, workspaceId): Observable<any[]> {
    const url = this.relationTableListUrl + id + '&workspaceId=' + workspaceId;
    return this.http.get<any[]>(url, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractRelationTableList),
        catchError(this.handleError('relationtable-getListOfRelationTable()', []))
      );
  }

  getListOfRelationTableMMR(workspaceId, version, tableName): Observable<any> {
    const url = this.tableListUrlMMR + workspaceId + '&versionNumber=' + version + '&tableName=' + tableName;
    return this.http.get<any[]>(url, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractRelationTableMMR),
        catchError(this.handleError('relationtable-getListOfRelationTableMMR()', []))
      );
  }

  deleteRelationInfoData(workspaceID, primaryTableId, joinName, relationShipIDs): Observable<any> {
    const url = this.deleteRelationsUrl + workspaceID + '&tableId=' + primaryTableId;
    const params = { joinName: joinName, relationshipId: relationShipIDs };
    return this.http.request<any>('DELETE', url, { body: params, headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError('deleteRelationInfoData', []))
      );
  }

  getColumnsByTableId(tableId): Observable<any[]> {
    return this.http.get<any[]>(this.columnListUrl + tableId, { headers: this.userinfoService.getHeaders() })
      .pipe(
        map(this.extractTable),
        catchError(this.handleError('getColumnsByTableId()', [])));
  }


  sendValuesForTableToTableAnalysis(analysisObject): Observable<any> {
    return this.http.post<any[]>(this.dataAnalysisUrl, analysisObject, { headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError('sendValuesForTabletoTableAnalysis', [])));
  }

  stateManagement(userId, workspaceID, metalyzerServiceId) {
    const stateManagementObject = { 'userId': userId, 'workspaceId': workspaceID, 'serviceId': metalyzerServiceId };
    return this.http.post<any>(this.stateManagementUrl, stateManagementObject, { headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError('stateManagement', [])));
  }

  getJobStatus(JobID) {
    return this.http.get<any>(this.getJobStatusUrl + JobID, { headers: this.userinfoService.getHeaders() })
      .pipe(catchError(this.handleError('getJobStatusId', [])));
  }

  private extractTable(res: any) {
    const data = res.data.tableColumnList.columnDetails;
    return data || [];
  }

  private extractTables(res: any) {
    const data = res.data;
    return data || [];
  }
  private extractRelationTableList(res: any) {
    const data = res.data.relationshipInfo;
    return data || [];
  }

  private extractRelationTableMMR(res) {
    // const data: any = response(res.data.RelationshipList.relationshipList);
    const data = res.data.relationshipInfo;
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

  changeArray(res) {
    this.resultantArray.next(res);
  }

  changeBooleanValue(message) {
    this.changeValue.next(message);
  }

  selectTables(message) {
    this.selectTableslist.next(message);
  }
  selectDropdown(message) {
    this.selectDropdownlist.next(message);
  }
  getExportxml(workspaceId, databaseID, xml, tableID): Observable<Blob> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: xml, tableId: [tableID] };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders(), responseType: 'blob' });
  }
  getExportjson(workspaceId, databaseID, json, tableID): Observable<Blob> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: json, tableId: [tableID] };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders(), responseType: 'blob' });
  }

}
