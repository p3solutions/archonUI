import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class SsoSigninService {

  constructor(private environment: EnvironmentService, private http: HttpClient) {
  }

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private signinUrl = this.environment.apiUrl + 'auth/sso/login/url';


  signIn(): Observable<any> {
      return this.http.get<any>(this.signinUrl, { headers: this.headers });
  }

  signInredirect(url) {
    //(window as any).open(url, '_blank');
    (window as any).open(url, '_self');
  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
/** Log a message with the MessageService */
private log(message: string) {
  console.log(message);
}
}
