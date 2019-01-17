import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ProgressBarObj, ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { environment } from '../../environments/environment';
ProgressBarObj
@Injectable({
  providedIn: 'root'
})
export class DbExtractorService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });

  private processDetailsObj: any;

  private apiUrl = environment.apiUrl;
  private getProcessDetailsUrl = this.apiUrl + 'rdbmsExtraction/processDetails';

  private _progressBarObj: BehaviorSubject<ProgressBarObj> = new BehaviorSubject<ProgressBarObj>({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
  updatedProgressBarObj = this._progressBarObj.asObservable();


  setProgressBarObj(progressBar: ProgressBarObj) {
    this._progressBarObj.next(progressBar);
  }

  getProcessDetails(): Observable<ProcessDetails[]> {
    return this.http.get<ProcessDetails[]>(this.getProcessDetailsUrl, { headers: this.headers }).pipe(
      map(this.extractData),
      catchError(this.handleError('ProcessDetails[]', []))
    );
  }

  setProcessDetailsObj(processDetailObj: ProcessDetailsObj) {
    this.processDetailsObj = processDetailObj;
  }

  getProcessDetailsObj(): ProcessDetailsObj {
    return this.processDetailsObj
  }

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    const body = res.data.users;
    return body || [];
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
  }
}
