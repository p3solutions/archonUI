import { Injectable } from '@angular/core';
import { AdhocHeaderInfo, SelectedTables } from './adhoc';
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
  getApplicationUrl = this.apiUrl + 'adhocbuilder/application?startIndex=';
  getTableColumnListUrl = this.apiUrl + 'adhocbuilder/tableList';


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
    return this.http.get<SelectedTables[]>(this.getTableColumnListUrl, { headers: this.userInfoService.getHeaders(), params: { param } }).
      pipe(map(this.extractDataForTableColumnList),
        catchError(this.handleError('getTableColumnList', []))
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
    const body = res.data.details;
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
