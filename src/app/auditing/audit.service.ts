import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  getAuditUrl = environment.apiUrl + 'audits/auditing?userId=';
  getEventsUrl = environment.apiUrl + 'audits/events';
  downloadUrl = environment.apiUrl + 'audits/download?jobId=';

  constructor(private http: HttpClient, private userinfoService: UserinfoService) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }

  getEvetns(): Observable<any> {
    return this.http.get<any>(this.getEventsUrl, { headers: this.getHeaders() }).pipe(
      map(this.extractEvents),
      catchError(this.handleError<any>('getEvents')));
  }

  private extractEvents(res: any) {
    const data = res.data.Events;
    return data || [];
  }

  getJobStatuses(params) {
    return this.http.get<any>(this.getAuditUrl + params.userId + '&workspaceId=' + params.workspaceId
    + '&eventName=' + params.eventName + '&severityLevel=' + params.severityLevel
    + '&fromDate=' + params.fromDate + '&toDate=' + params.toDate + '&serviceId=' + params.serviceId , { headers: this.getHeaders() }).pipe(
      map(this.extractJobOrigins),
      catchError(this.handleError<any>('getJobStatus')));
  }

  private extractJobOrigins(res: any) {
    const data = res.data.Audits;
    return data || [];
  }

  downloadZip(jobId) {
    return this.http.get<any>(this.downloadUrl + jobId, {headers: this.getHeaders()}).pipe(catchError(this.handleError<any>('download')));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
