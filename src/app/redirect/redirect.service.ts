import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  Url = 'http://localhost:9000/' + 'auth/sso/auth/token?jwtuser=';

  constructor(private http: HttpClient) { }

  signIn(token): Observable<any> {
    return this.http.get<any>(this.Url + token, { headers: this.headers });
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
