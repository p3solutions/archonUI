import { Injectable } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class StatusService {

  getJobOriginsUrl = environment.apiUrl + 'jobStatus/jobOrigins';
  getJobStatusesUrl = environment.apiUrl + 'jobStatus/jobStatuses';
  getStatusListUrl = environment.apiUrl + 'jobStatus/jobList?userId=';
  getRetryStatusUrl = environment.apiUrl + 'jobStatus/jobRetry';
  startIndex = 1;
  getSearchStatus = environment.apiUrl + 'jobStatus/jobList/search?userId=';
  downloadUrl = environment.apiUrl + 'audits/download?jobId=';

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
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
  setRetryStatus(jobId): Observable<any> {
    const url = this.getRetryStatusUrl;
    const param = { 'userId': this.userinfoService.getUserId(), 'jobId': jobId };
    return this.http.post<any>(url, param, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError<any>('getUserInfo')));
  }

  getSearchResult(startIndex , search) {
    const url = this.getSearchStatus + this.userinfoService.getUserId() + '&startIndex=' + startIndex + '&jobName=' + search;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(this.extractJobSearch),
      catchError(this.handleError<any>('getUserInfo')));
  }

  downloadZip(jobId): Observable<Blob> {
    return this.http.get(this.downloadUrl + jobId, { headers: this.getHeaders() , responseType: 'blob'} )
    .pipe(catchError(this.handleError<any>('download')));
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
