import { Injectable } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class StatusService {
  private apiUrl = this.environment.apiUrl;
  getJobOriginsUrl = this.apiUrl + 'jobStatus/jobOrigins';
  getJobStatusesUrl = this.apiUrl + 'jobStatus/jobStatuses';
  getStatusListUrl = this.apiUrl + 'jobStatus/jobList?userId=';
  getRetryStatusUrl = this.apiUrl + 'jobStatus/jobRetry';
  startIndex = 1;
  getSearchStatus = this.apiUrl + 'jobStatus/jobList/search?userId=';
  downloadUrl = this.apiUrl + 'audits/download?jobId=';
  terminateUrl = this.apiUrl + 'jobStatus/terminateJob?jobId=';

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }

  getJobOrigins(): Observable<any> {
    return this.http.get<any>(this.getJobOriginsUrl, { headers: this.getHeaders() }).pipe(
      map(this.extractJobOrigins),
      catchError(this.handleError<any>('getUserInfo')));
  }

  getJobStatuses(): Observable<any> {
    return this.http.get<any>(this.getJobStatusesUrl, { headers: this.getHeaders() }).pipe(
      map(this.extractJobStatuses),
      catchError(this.handleError<any>('getUserInfo')));
  }

  getJobList(selectedJobOrigin, selectedJobStatus, startIndex): Observable<any> {
    const url = this.getStatusListUrl + this.userinfoService.getUserId() + '&jobOrigin=' + selectedJobOrigin + '&jobStatus=' + selectedJobStatus + '&startIndex=' + startIndex;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(this.extractJobStatusList),
      catchError(this.handleError<any>('getUserInfo')));
  }
  setRetryStatus(param): Observable<any> {
    const url = this.getRetryStatusUrl;
    return this.http.post<any>(url, param, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getSearchResult(startIndex, search, jobOrigin, jobStatus ) {
    const url = this.getSearchStatus + this.userinfoService.getUserId() + '&jobOrigin=' + jobOrigin + '&jobStatus=' + jobStatus  + '&jobName=' + search + '&startIndex=' + startIndex ;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(this.extractJobSearch),
      catchError(this.handleError<any>('getUserInfo')));
  }

  downloadZip(jobId): Observable<Blob> {
    return this.http.get(this.downloadUrl + jobId, { headers: this.getHeaders(), responseType: 'blob' })
      .pipe(catchError(this.handleError<any>('download')));
  }

  terminateJob(jobId) {
    return this.http.put(this.terminateUrl + jobId, '', { headers: this.userinfoService.getHeaders() });
  }

  private extractJobSearch(res) {
    const data = res.data.job_list;
    return data || [];
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
    const data = res.data;
    return data || [];
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
