import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private apiUrl = environment.apiUrl;
  saveSMTPConfigurationUrl = this.apiUrl + 'smtp/setup';
  checkExistingSMTPConfigurationUrl = this.apiUrl + 'smtp/config';

  constructor(private http: HttpClient, private userInfoService: UserinfoService) { }

  saveSMTPConfiguration(param): Observable<any> {
    return this.http.post<any>(this.saveSMTPConfigurationUrl, param, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('saveSMTPConfiguration', []))
      );
  }

  checkExistingSMTPConfiguration(): Observable<any> {
    return this.http.get<any>(this.checkExistingSMTPConfigurationUrl, { headers: this.userInfoService.getHeaders() }).
      pipe(map(this.extractData),
        catchError(this.handleError('saveSMTPConfiguration', []))
      );
  }

  private extractData(res: any) {
    const body = res;
    return body || [];
  }

  // remove_Master_Metadata(): Observable<Manage_Master_Metadata[]>{
  //   return this.http.delete()
  // }
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
      return of(result);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
  }
}
