import { Injectable } from '@angular/core';
import { AdhocHeaderInfo, SelectedTables, Adhoc } from './adhoc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ManageMasterMetadata } from '../master-metadata-data';
import { EnvironmentService } from '../environment/environment.service';
import { UserinfoService } from '../userinfo.service';
@Injectable({
  providedIn: 'root'
})
export class AdhocService {
  adhocHeaderInfo: BehaviorSubject<AdhocHeaderInfo> = new BehaviorSubject<AdhocHeaderInfo>(new AdhocHeaderInfo());
  updatedAdhocHeaderInfo = this.adhocHeaderInfo.asObservable();
  private apiUrl = this.environment.apiUrl;
  getMMRVersionListUrl = this.apiUrl + 'metalyzer/getVersionNumberList?workspaceId=';
  createApplicationUrl = this.apiUrl + 'adhocbuilder/application';
  createScreenUrl = this.apiUrl + 'adhocbuilder/screen';
  getApplicationUrl = this.apiUrl + 'adhocbuilder/application?startIndex=';
  getTableColumnListUrl = this.apiUrl + 'adhocbuilder/tableList?metadataVersion=';
  getScreenUrl = this.apiUrl + 'adhocbuilder/screen?startIndex=';
  getSearchScreenUrl = this.apiUrl + 'adhocbuilder/searchScreenName?startIndex=';
  deleteScreenUrl = this.apiUrl + 'adhocbuilder/screen?screenId=';
  downloadScreenUrl = this.apiUrl + 'adhocbuilder/application/screen/download?screenId=';
  getScreenInfoUrl = this.apiUrl + 'adhocbuilder/application/screen?screenId=';
  tableListUrl = this.apiUrl + 'metalyzer/tablesList?workspaceId=';
  getIAVersionsUrl = this.apiUrl + 'adhocbuilder/ia-versions';

  constructor(
    private http: HttpClient,
    private userInfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  updateAdhocHeaderInfo(adhocHeaderInfo: AdhocHeaderInfo) {
    this.adhocHeaderInfo.next(adhocHeaderInfo);
  }

  getMMRVersionList(workspaceId: string): Observable<ManageMasterMetadata[]> {
    return this.http.get<ManageMasterMetadata[]>(this.getMMRVersionListUrl + workspaceId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForMMR),
        catchError(this.handleError('getMMRVersionList', []))
      );
  }

  createApplication(param): Observable<any> {
    return this.http.post<any>(this.createApplicationUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForSuccess));
  }

  getApplication(workspaceId, startIndex): Observable<any> {
    return this.http.get<any>(this.getApplicationUrl + startIndex +
      '&workspaceId=' + workspaceId, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getApplication', []))
      );
  }

  getTableColumnList(param): Observable<SelectedTables[]> {
    return this.http.get<SelectedTables[]>(this.getTableColumnListUrl +
      param.mmrVersion + '&workspaceId=' + param.workspaceId, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForTableColumnList),
        catchError(this.handleError('getTableColumnList', []))
      );
  }

  createScreen(param): Observable<any> {
    return this.http.post<any>(this.createScreenUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForSuccess));
  }

  updateScreen(param, screenId): Observable<any> {
    return this.http.put<any>(this.createScreenUrl + '?screenId=' + screenId, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractDataForSuccess));
  }

  getScreen(startIndex, workspaceId, appId): Observable<any> {
    return this.http.get<any>(this.getScreenUrl + startIndex +
      '&workspaceId=' + workspaceId + '&appId=' + appId, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getScreen', []))
      );
  }

  getScreenInfo(screenId): Observable<any> {
    return this.http.get<any>(this.getScreenInfoUrl + screenId, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getScreenInfo', []))
      );
  }

  downloadScreen(screenId, userId): Observable<Blob> {
    return this.http.get(this.downloadScreenUrl + screenId + '&userId=' + userId,
      { headers: this.userInfoService.getHeaders(), responseType: 'blob' })
      .pipe(catchError(this.handleError<any>('downloadScreen')));
  }

  getSearchScreen(startIndex, searchScreenText, appId): Observable<any> {
    return this.http.get<any>(this.getSearchScreenUrl + startIndex +
      '&appId=' + appId + '&screenName=' + searchScreenText, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getSearchScreen', []))
      );
  }


  deleteScreen(screenId, userId): Observable<string> {
    return this.http.delete<string>(this.deleteScreenUrl + screenId + '&userId=' + userId,
      { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('deleteScreen', []))
      );
  }

  getTablesearchList(workspaceId, tablesearchname = '', startIndex): Observable<string[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<string[]>(this.tableListUrl + workspaceId + '&tableName=' + tablesearchname + '&startIndex=' + startIndex, { headers: this.userInfoService.getHeaders() }).
      pipe(
        map(this.extractData),
        catchError(this.handleError('tables-getTableList()', []))
      );
  }

  getIAVersions(): Observable<any> {
    return this.http.get<any>(this.getIAVersionsUrl, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getIAVersions', []))
      );
  }

  private extractDataForMMR(res: any) {
    const body = res.data['MMR Versions'];
    return body || [];
  }

  private extractData(res: any) {
    const body = res.data;
    return body || [];
  }

  private extractDataForTableColumnList(res: any) {
    const body = res.data.Details;
    return body || [];
  }

  private extractDataForSuccess(res: any) {
    const body = res;
    return body || [];
  }

  // remove_Master_Metadata(): Observable<Manage_Master_Metadata[]>{
  //   return this.http.delete()
  // }
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
      return of(result);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }

}
