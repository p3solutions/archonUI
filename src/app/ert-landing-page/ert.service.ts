import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgressBarObj, ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
import { ErtTableListObj, ErtColumnListObj, TableDetailsListObj, ErtJobParams, ERTJobs } from './ert';

@Injectable({
  providedIn: 'root'
})
export class ErtService {
  selectedList: TableDetailsListObj[] = [];
  ertJobParams: ErtJobParams = new ErtJobParams();
  constructor(private http: HttpClient,
    private userInfoService: UserinfoService) { }
  private apiUrl = environment.apiUrl;
  getERTtableListUrl = this.apiUrl + 'ert/ertTableList?workspaceId=';
  getERTcolumnlistUrl = this.apiUrl + 'ert/ertColumnList?ertJobId=';
  saveErtJobUrl = this.apiUrl + 'ert/ertJobSession';
  getErtJobUrl = this.apiUrl + 'ert/ertJobs?userId=';

  setErtJobParams(ertJobParams: ErtJobParams) {
    this.ertJobParams = ertJobParams;
  }

  setSelectedList(selectedList: TableDetailsListObj[]) {
    this.selectedList = selectedList;
  }

  getERTtableList(workspaceId: string, ertJobId = ''): Observable<ErtTableListObj> {
    return this.http.get<ErtTableListObj>(this.getERTtableListUrl + workspaceId + '&ertJobId=' + ertJobId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractData),
        catchError(this.handleError('getERTtableList', []))
      );
  }

  getErtJob(userId, workspaceId): Observable<ERTJobs[]> {
    return this.http.get<ERTJobs[]>(this.getErtJobUrl + userId + '&workspaceId=' + workspaceId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForJobs),
        catchError(this.handleError('getErtJob', []))
      );
  }


  getERTcolumnlist(ertJobId = '', workspaceId: string, tableId: string): Observable<ErtColumnListObj[]> {
    return this.http.get<ErtColumnListObj[]>(this.getERTcolumnlistUrl + ertJobId + '&workspaceId=' + workspaceId + '&tableId=' + tableId,
      { headers: this.userInfoService.getHeaders() }).pipe(
        map(this.extractDataForColumn),
        catchError(this.handleError('getERTcolumnlist', []))
      );
  }



  saveErtJob(param: any): Observable<any> {
    return this.http.post<any>(this.saveErtJobUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('saveErtJob', []))
      );
  }


  private extractData(res: any) {
    const body = res.data.ERTTableList;
    return body || [];
  }

  private extractDataForColumn(res: any) {
    const body = res.data;
    return body || [];
  }

  private extractDataForJobs(res: any) {
    const body = res.data.ertJobs;
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

