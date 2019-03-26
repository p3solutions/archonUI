import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleMonitoringService {

  getStatusUrl = environment.apiUrl + 'jobStatus/scheduleJob?tool=';
  stopJobUrl = environment.apiUrl + 'jobStatus/stopSchedule?scheduleId=';
  detailsJobUrl = environment.apiUrl + 'jobStatus/scheduleDetails?scheduleId=';

  constructor(private http: HttpClient, private userinfoService: UserinfoService) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }

  getJobStatuses(_tool?, _jobStatus?, _index?): Observable<any> {
    const Index = 1;
    return this.http.get<any>(this.getStatusUrl + _tool + '&jobStatus=' + _jobStatus  + '&startIndex=' + Index,
    { headers: this.getHeaders() }).pipe(
      map(this.extractJobOrigins),
      catchError(this.handleError<any>('getJobStatus')));
  }

  getDetails(scheduleId) {
    return this.http.get<any>(this.detailsJobUrl + scheduleId ,
    { headers: this.getHeaders() }).pipe(
      map(this.extractDetails),
      catchError(this.handleError<any>('getJobDetails')));
  }

 extractDetails(res){
  const data = res.data.ShowDetails;
  return data || [];
 }

  stopJob(scheduleId) {
  return this.http.post<any>(this.stopJobUrl + scheduleId, { headers: this.getHeaders() }).pipe(
    map(this.extractStop),
    catchError(this.handleError<any>('StopJob')));
  }

  private extractStop(res) {
  return res;
  }

  private extractJobOrigins(res: any) {
    const data = res.data.ScheduledJobs;
    return data || [];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
