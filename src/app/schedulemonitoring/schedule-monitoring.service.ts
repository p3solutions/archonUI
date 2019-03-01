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

  getStatusUrl = environment.apiUrl + 'jobStatus/fetchScheduleJob?tool=&jobStatus=&startIndex=1';

  constructor(private http: HttpClient, private userinfoService: UserinfoService) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }

  getJobStatuses(): Observable<any> {
    return this.http.get<any>(this.getStatusUrl, { headers: this.getHeaders() }).pipe(
      map(this.extractJobOrigins),
      catchError(this.handleError<any>('getJobStatus')));
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
