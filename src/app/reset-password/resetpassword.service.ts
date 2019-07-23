import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SignUp } from '../sign-up';
import { EnvironmentService } from '../environment/environment.service';
import { catchError, map } from 'rxjs/operators';
import { ResetPasswordUser } from './reset-password';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private keyValidUrl = this.environment.apiUrl + 'auth/key-validity?resetKey=';
  private keyValueUrl = this.environment.apiUrl + 'auth/key-value?resetKey=';
  private pwdResetUrl = this.environment.apiUrl + 'auth/reset-password';
  constructor(
    private http: HttpClient,
    private environment: EnvironmentService
  ) { }

  getkeyValueUserDetails(resetKey: string): Observable<ResetPasswordUser> {
    return this.http.get<ResetPasswordUser>(this.keyValueUrl + resetKey, { headers: this.headers }).pipe(map(this.extractData));
  }

  pwdReset(param): Observable<string> {
    param.password = btoa(param.password);
    return this.http.post<string>(this.pwdResetUrl, param, { headers: this.headers }).pipe(map(this.extractData));
  }

  private extractData(res: any) {
    const body = res.data;
    return body || [];
  }

}
