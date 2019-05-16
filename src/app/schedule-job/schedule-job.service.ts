import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleJobService {

  getErtUrl = this.environment.apiUrl + 'ert/availableInstances';
  getRdbmsUrl = this.environment.apiUrl + 'rdbmsExtraction/availableInstances';

  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) { }

  getHeaders() {
    return this.userinfoService.getHeaders();
  }


  getErtInstances(): Observable<any> {
    return this.http.get<any>(this.getErtUrl,
      { headers: this.getHeaders() }).pipe(
        map(this.extractJobOrigins),
        catchError(this.handleError<any>('getErtInstances')));
  }

  getRdbmsInstances(): Observable<any> {
    return this.http.get<any>(this.getRdbmsUrl,
      { headers: this.getHeaders() }).pipe(
        map(this.extractJobOrigins),
        catchError(this.handleError<any>('getRdbmsInstances')));
  }

  private extractJobOrigins(res: any) {
    const data = res.data.availableInstances;
    return data || [];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
