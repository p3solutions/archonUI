import { Injectable } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StatusService {

  getJobOriginsUrl = environment.apiUrl + 'jobStatus/jobOrigins';
  getJobStatusesUrl = environment.apiUrl + 'jobStatus/jobStatuses';
  getStatusListUrl = environment.apiUrl + 'jobStatus/jobList?userId=';
  getRetryStatusUrl = environment.apiUrl + 'jobStatus/jobRetry';

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }

  getJobOrigins(): Observable<any> {
    return this.http.get<any>(this.getJobOriginsUrl, { headers: this.getHeaders() })
      .map(this.extractJobOrigins)
      .pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getJobStatuses(): Observable<any> {
    return this.http.get<any>(this.getJobStatusesUrl, { headers: this.getHeaders() })
      .map(this.extractJobStatuses)
      .pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getStatusList(): Observable<any> {
    const url = this.getStatusListUrl + this.userinfoService.getUserId();
    return this.http.get<any>(url, { headers: this.getHeaders() })
      .map(this.extractJobStatusList)
      .pipe(catchError(this.handleError<any>('getUserInfo')));
  }
  setRetryStatus(jobId): Observable<any> {
    const url = this.getRetryStatusUrl;
    const param  = { 'userId': this.userinfoService.getUserId(), 'jobId': jobId};
    return this.http.post<any>(url, param, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  private extractJobOrigins(res: any) {
    const data = res.data.job_origins;
    return data || [];
  }
  private extractJobStatuses(res: any) {
    const data = res.data.job_statuses;
    return data || [];
  }
  private extractJobStatusList(res: any) {
    const data = res.data.job_list;
    return data || [];
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
