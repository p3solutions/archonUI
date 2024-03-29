import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMonitoringService {

  private apiUrl = this.environment.apiUrl;
  getStatusUrl = this.apiUrl + 'jobStatus/scheduleJob?tool=';
  stopJobUrl = this.apiUrl + 'jobStatus/stopSchedule?scheduleId=';
  detailsJobUrl = this.apiUrl + 'jobStatus/scheduleDetails?scheduleId=';
  getSearchStatus = this.apiUrl + 'jobStatus/scheduleJob/search?tool=';

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }

  getJobStatuses(selectedTool, selectedJobStatus, startIndex, itemPerPage, jobName): Observable<any> {
    return this.http.get<any>(this.getSearchStatus + selectedTool + '&jobStatus=' + selectedJobStatus + '&startIndex=' +
      startIndex + '&userId=' + encodeURIComponent(this.userinfoService.getUserId()) + '&itemPerPage=' + itemPerPage + '&jobName=' + jobName,
      { headers: this.getHeaders() }).pipe(
        map(this.extractJobOrigins),
        catchError(this.handleError<any>('getJobStatus')));
  }

  getDetails(scheduleId) {
    return this.http.get<any>(this.detailsJobUrl + scheduleId,
      { headers: this.getHeaders() }).pipe(
        map(this.extractDetails),
        catchError(this.handleError<any>('getJobDetails')));
  }

  extractDetails(res) {
    const data = res.data.ShowDetails;
    return data || [];
  }

  stopJob(scheduleId) {
    return this.http.post<any>(this.stopJobUrl + scheduleId, '', { headers: this.userinfoService.getHeaders() });
  }

  private extractJobOrigins(res: any) {
    const data = res.data;
    return data || [];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  getSearchResult(startIndex, search) {
    const url = this.getSearchStatus + startIndex + '&userId=' + encodeURIComponent(this.userinfoService.getUserId()) + '&jobName=' + search;
    return this.http.get<any>(url, { headers: this.getHeaders() }).pipe(
      map(this.extractJobSearch),
      catchError(this.handleError<any>('getUserInfo')));
  }

  private extractJobSearch(res) {
    const data = res.data;
    return data || [];
  }

}
