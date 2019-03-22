import { Injectable } from '@angular/core';
import { AdhocHeaderInfo, SelectedTables, Adhoc } from './adhoc';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ManageMasterMetadata } from '../master-metadata-data';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
@Injectable({
  providedIn: 'root'
})
export class AdhocService {
  adhocHeaderInfo: BehaviorSubject<AdhocHeaderInfo> = new BehaviorSubject<AdhocHeaderInfo>(null);
  updatedAdhocHeaderInfo = this.adhocHeaderInfo.asObservable();
  private apiUrl = environment.apiUrl;
  getMMRVersionListUrl = this.apiUrl + 'metalyzer/getVersionNumberList?workspaceId=';
  createApplicationUrl = this.apiUrl + 'adhocbuilder/application';
  createScreenUrl = this.apiUrl + 'adhocbuilder/screen';
  getApplicationUrl = this.apiUrl + 'adhocbuilder/application?startIndex=';
  getTableColumnListUrl = this.apiUrl + 'adhocbuilder/tableList?metadataVersion=';
  getScreenUrl = this.apiUrl + 'adhocbuilder/screen?startIndex=';
  getSearchScreenUrl = this.apiUrl + 'adhocbuilder/searchScreenName?startIndex=';
  deleteScreenUrl = this.apiUrl + 'adhocbuilder/screen?screenId=';
  constructor(private http: HttpClient, private userInfoService: UserinfoService) { }

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
      pipe(map(this.extractData),
        catchError(this.handleError('createApplication', []))
      );
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

  createScreen(param): Observable<Adhoc> {
    return this.http.post<Adhoc>(this.createScreenUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('createScreen', []))
      );
  }

  updateScreen(param, screenId): Observable<Adhoc> {
    return this.http.put<Adhoc>(this.createScreenUrl + '?screenId=' + screenId, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('updateScreen', []))
      );
  }

  getScreen(startIndex, workspaceId, appId): Observable<Adhoc[]> {
    return this.http.get<Adhoc[]>(this.getScreenUrl + startIndex +
      '&workspaceId=' + workspaceId + '&appId=' + appId, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getScreen', []))
      );
  }

  getSearchScreen(startIndex, searchScreenText, appId): Observable<Adhoc[]> {
    return this.http.get<Adhoc[]>(this.getSearchScreenUrl + startIndex +
      '&appId=' + appId + '&screenName=' + searchScreenText, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('getSearchScreen', []))
      );
  }



  deleteScreen(screenId): Observable<string> {
    return this.http.delete<string>(this.deleteScreenUrl + screenId,
      { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('deleteScreen', []))
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
