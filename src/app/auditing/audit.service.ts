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

  getAuditUrl = environment.apiUrl + 'audits/auditing';
  getEventsUrl = environment.apiUrl + 'audits/events';

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
    console.log(params);
    return this.http.post<any>(this.getAuditUrl, params , { headers: this.getHeaders() }).pipe(
      map(this.extractJobOrigins),
      catchError(this.handleError<any>('getJobStatus')));
  }

  private extractJobOrigins(res: any) {
    const data = res.data.Audits;
    return data || [];
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
}
