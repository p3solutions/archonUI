import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgressBarObj, ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
import { ConfiguredDB } from '../workspace-objects';
@Injectable({
  providedIn: 'root'
})
export class DbExtractorService {
  constructor(private http: HttpClient,
    private userInfoService: UserinfoService) { }

  private processDetailsObj: ProcessDetailsObj;

  private apiUrl = environment.apiUrl;
  private getDBInfoUrl = this.apiUrl + '/dbs/configured/';

  private getProcessDetailsUrl = 'http://50.112.166.136:8092/rdbmsExtraction/processDetail';
  private _progressBarObj: BehaviorSubject<ProgressBarObj> = new BehaviorSubject<ProgressBarObj>(
    { stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
  updatedProgressBarObj = this._progressBarObj.asObservable();
  private postProcessDetailsUrl = 'http://50.112.166.136:8092/rdbmsExtraction/process';


  setProgressBarObj(progressBar: ProgressBarObj) {
    this._progressBarObj.next(progressBar);
  }

  getProcessDetails(): Observable<ProcessDetails[]> {
    return this.http.get<ProcessDetails[]>(this.getProcessDetailsUrl, { headers: this.userInfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError('getProcessDetails', []))
    );
  }

  dbExtractor(params: any): Observable<any> {
    return this.http.post(this.postProcessDetailsUrl, params, { headers: this.userInfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError('dbExtractor', {}))
    );
  }

  getDBInfoByID(databaseId: string): Observable<ConfiguredDB> {
    return this.http.get<ConfiguredDB>(this.getDBInfoUrl + databaseId, { headers: this.userInfoService.getHeaders() }).pipe(
      map(this.extractDataForDB),
      catchError(this.handleError('getDBInfoByID', []))
    );
  }

  setProcessDetailsObj(processDetails: ProcessDetailsObj) {
    this.processDetailsObj = processDetails;
  }

  getProcessDetailsObj(): ProcessDetailsObj {
    return this.processDetailsObj;
  }

  private extractData(res: any) {
    const body = res.data;
    return body || [];
  }
  private extractDataForDB(res: any) {
    const body = res.data.configuredDatabases;
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
