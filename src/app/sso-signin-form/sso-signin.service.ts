import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SsoSigninService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private signinUrl = 'http://localhost:9000/' + 'auth/sso/login/url';

  constructor(private http: HttpClient) { }

  signIn(): Observable<any> {
      return this.http.get<any>(this.signinUrl, { headers: this.headers });
  }

  signInredirect(url) {
    (window as any).open(url, '_blank');
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
