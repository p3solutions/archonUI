import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserinfoService } from '../userinfo.service';
import {
  ErtTableListObj, ErtColumnListObj, TableDetailsListObj,
  ErtJobParams, ERTJobs, IngestionDataConfig, ExtractDataConfigInfo, ExtractConfig, AvilErtTable
} from './ert';
import { EnvironmentService } from '../environment/environment.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ErtService {
  selectedList: TableDetailsListObj[] = [];
  ertJobParams: ErtJobParams = new ErtJobParams();
  ingestionDataConfig: IngestionDataConfig = new IngestionDataConfig();
  extractDataConfigInfo: ExtractDataConfigInfo = new ExtractDataConfigInfo();
  selectedValues: string[] = [];
  data;
  selectedPrimaryTable: any;
  constructor(
    private http: HttpClient,
    private userInfoService: UserinfoService,
    private environment: EnvironmentService,
    private spinner: NgxSpinnerService
  ) { }
  private apiUrl = this.environment.apiUrl;
  getERTtableListUrl = this.apiUrl + 'ert/ertTableList?workspaceId=';
  getErtAvailableTableUrl = this.apiUrl + 'ert/ertAvailableTables?ertJobId=';
  getERTcolumnlistUrl = this.apiUrl + 'ert/ertColumnList?ertJobId=';
  saveErtJobUrl = this.apiUrl + 'ert/ertJobSession';
  getErtJobUrl = this.apiUrl + 'ert/ertJobs?userId=';
  runjobUrl = this.apiUrl + 'ert/runjob';
  deleteErtJobUrl = this.apiUrl + 'ert/ertJobSession?jobId=';
  extractConfigUrl = this.apiUrl + 'ert/extractconfig?ertJobId=';
  queryValidationUrl = this.apiUrl + 'ert/queryValidation';
  cloneErtJobUrl = this.apiUrl + 'ert/cloneJob';
  downloadMetadataUrl = this.apiUrl + 'ert/downloadMetadata';
  schemaResultsTableCount = 0;
  joinListMap = new Map();
  mmrVersion = '';
  RelationSIP: any[];
  startIndex: 1;
  storeSelectedTables: TableDetailsListObj[] = [];
  isDataRecordGraphChange = false;
  isSIPGraphChange = false;

  jobName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  updatedJobName = this.jobName.asObservable();

  jobType: BehaviorSubject<string> = new BehaviorSubject<string>('');
  updatedjobType = this.jobType.asObservable();

  updateJobName(_jobName: string) {
    this.jobName.next(_jobName);
  }

  updatejobType(_jobType: string) {
    this.jobType.next(_jobType);
  }

  setErtJobParams(ertJobParams: ErtJobParams) {
    this.ertJobParams = ertJobParams;
  }

  setIngestionDataConfig(ingestionDataConfig: IngestionDataConfig) {
    this.ingestionDataConfig = ingestionDataConfig;
  }

  setSelectedList(selectedList: TableDetailsListObj[], schemaResultsTableCount:
    number, storeSelectedTables: TableDetailsListObj[]) {
    this.selectedList = selectedList;
    this.schemaResultsTableCount = schemaResultsTableCount;
    this.storeSelectedTables = storeSelectedTables;
  }

  setschemaResultsTableCount(schemaResultsTableCount: number) {
    this.schemaResultsTableCount = schemaResultsTableCount;
  }

  setXmlSplitSize(extractDataConfigInfo: ExtractDataConfigInfo) {
    this.extractDataConfigInfo = extractDataConfigInfo;
  }

  setMMRVersion(mmrVersion: string) {
    this.mmrVersion = mmrVersion;
  }

  getExtractConfig(ertJobId: string): Observable<ExtractConfig> {
    return this.http.get<ExtractConfig>(this.extractConfigUrl + ertJobId,
      { headers: this.userInfoService.getHeaders() }).pipe(map(this.extractDataForColumn));
  }

  setSelectValueAndDataOfGraph(selectedValues: string[], data: any, joinListMap, selectedPrimaryTable, RelationSIP) {
    this.selectedValues = selectedValues;
    this.data = data;
    this.joinListMap = joinListMap;
    this.selectedPrimaryTable = selectedPrimaryTable;
    this.RelationSIP = RelationSIP;
  }

  getERTtableList(workspaceId: string, ertJobId = '', startIndex): Observable<ErtTableListObj> {
    return this.http.get<ErtTableListObj>(this.getERTtableListUrl + workspaceId + '&ertJobId=' + ertJobId + '&startIndex=' + startIndex,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractData),
        catchError(this.handleError('getERTtableList', []))
      );
  }

  getERTtablesearchList(workspaceId: string, tablesearchname = '', ertJobId = ''): Observable<ErtTableListObj> {
    return this.http.get<ErtTableListObj>(this.getERTtableListUrl + workspaceId + '&tableName=' + tablesearchname + '&ertJobId=' + ertJobId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractData),
        catchError(this.handleError('getERTtableList', []))
      );
  }


  getErtJob(userId, workspaceId): Observable<ERTJobs[]> {
    return this.http.get<ERTJobs[]>(this.getErtJobUrl + encodeURIComponent(userId) + '&workspaceId=' + workspaceId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForJobs));
  }

  getERTcolumnlist(ertJobId = '', workspaceId: string, tableId: string): Observable<ErtColumnListObj[]> {
    return this.http.get<ErtColumnListObj[]>(this.getERTcolumnlistUrl + ertJobId + '&workspaceId=' + workspaceId + '&tableId=' + tableId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForColumn),
        catchError(this.handleError('getERTcolumnlist', []))
      );
  }

  getEditedtERTcolumnlist(ertJobId = '', workspaceId: string, tableIds: string[] = []): Observable<any[]> {
    const request: any[] = [];
    for (const tableId of tableIds) {
      request.push(this.http.get<ErtColumnListObj[]>(this.getERTcolumnlistUrl + ertJobId +
        '&workspaceId=' + workspaceId + '&tableId=' + tableId,
        { headers: this.userInfoService.getHeaders() }).pipe(map(this.extractDataForColumn)));
    }
    const combineErtColumnResult = forkJoin(request);
    return combineErtColumnResult;
  }

  getErtAvailableTable(ertJobId: string, startIndex): Observable<AvilErtTable> {
    return this.http.get<ErtTableListObj>(this.getErtAvailableTableUrl + ertJobId + '&startIndex=' + startIndex,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForAvail),
        catchError(this.handleError('getERTcolumnlist', []))
      );
  }

  getErtSearchAvailableTable(ertJobId: string, tableName: string, startIndex): Observable<AvilErtTable> {
    return this.http.get<ErtTableListObj>(this.getErtAvailableTableUrl + ertJobId + '&startIndex=' + startIndex + '&tableName=' + tableName,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForAvail),
        catchError(this.handleError('getERTcolumnlist', []))
      );
  }

  saveErtJob(param: any): Observable<any> {
    return this.http.post<any>(this.saveErtJobUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForRunJob));
  }

  runJob(param: any): Observable<any> {
    return this.http.put<any>(this.runjobUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForRunJob));
  }

  deleteErtJob(ertJobId: any): Observable<any> {
    return this.http.delete<any>(this.deleteErtJobUrl + ertJobId, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForRunJob));
  }

  validQuery(param: any): Observable<any> {
    param.userId = this.userInfoService.getUserId();
    return this.http.post<any>(this.queryValidationUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForRunJob));
  }

  createCloneJob(param: any): Observable<any> {
    return this.http.post<any>(this.cloneErtJobUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForRunJob));
  }

  downloadMetadata(param): Observable<Blob> {
    return this.http.post(this.downloadMetadataUrl, param,
      { headers: this.userInfoService.getHeaders(), responseType: 'blob' })
      .pipe(catchError(this.handleError<any>('downloadScreen')));
  }

  private extractData(res: any) {
    const body = res.data.ERTTableList;
    return body || [];
  }

  private extractDataForAvail(res: any) {
    const body = res.data;
    return body || [];
  }

  private extractDataForRunJob(res: any) {
    const body = res;
    return body || [];
  }

  private extractDataForColumn(res: any) {
    const body = res.data;
    return body || [];
  }

  private extractDataForJobs(res: any) {
    let body: any;
    if (res.data !== null) {
      body = res.data.ertJobs;
    } else {
      body = [];
    }
    return body || [];
  }

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
  }
}

