import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProgressBarObj, ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { UserinfoService } from '../userinfo.service';
import { ConfiguredDB } from '../workspace-objects';
import { EnvironmentService } from '../environment/environment.service';
@Injectable({
  providedIn: 'root'
})
export class DbExtractorService {
  constructor(private http: HttpClient,
    private userInfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }
  userId = sessionStorage.getItem('userId');
  private headers = new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
    'Authorization': 'Bearer ' + localStorage.getItem(this.userId)
  });

  private processDetailsObj: ProcessDetailsObj;

  private apiUrl = this.environment.apiUrl;
  private getDBInfoUrl = this.apiUrl + 'dbs/configured/';

  private getProcessDetailsUrl = this.apiUrl + 'rdbmsExtraction/processDetail';
  private _progressBarObj: BehaviorSubject<ProgressBarObj> = new BehaviorSubject<ProgressBarObj>(
    { stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
  updatedProgressBarObj = this._progressBarObj.asObservable();
  private postProcessDetailsUrl = this.apiUrl + 'rdbmsExtraction/process';

  setProgressBarObj(progressBar: ProgressBarObj) {
    this._progressBarObj.next(progressBar);
  }

  getProcessDetails(): Observable<ProcessDetails[]> {
    return this.http.get<ProcessDetails[]>(this.getProcessDetailsUrl, { headers: this.userInfoService.getHeaders() }).pipe(
      map(this.extractData),
      catchError(this.handleError('getProcessDetails', []))
    );
  }

  dbExtractor(params: any, file: File, instanceID): Observable<any> {
    const formData: FormData = new FormData();
    if (file != null) {
      formData.append('file', file);
    }
    formData.append('RdbmsDto', JSON.stringify(params));
    formData.append('instanceId', JSON.stringify(instanceID));

    return this.http.post(this.postProcessDetailsUrl, formData, { headers: this.userInfoService.getFileUploadHeaders() });
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
  private extractDataForSuccess(res: any) {
    const body = res;
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
