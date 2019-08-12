import { Injectable } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  updateUrl = this.environment.apiUrl + 'workspaces/markRead?notificationId=';
  getNotificationUrl = this.environment.apiUrl + 'workspaces/notificationList?userId=';
  logoutUrl = this.environment.apiUrl + 'auth/logout?token=';
  constructor(
    private userinfoService: UserinfoService,
    private http: HttpClient,
    private environment: EnvironmentService
  ) { }

  updateNotification(id) {
    const url = this.updateUrl + encodeURIComponent(id);
    return this.http.post(url, null, { headers: this.userinfoService.getHeaders() }).pipe(
      catchError(this.handleError<string>('updateNotification'))
    );
  }

  getNotification() {
    const url = this.getNotificationUrl + encodeURIComponent(this.userinfoService.getUserId());
    return this.http.get(url,
      { headers: this.userinfoService.getHeaders() }).pipe(
        map(this.extractDetails),
        catchError(this.handleError<string>('getworkspaceName'))
      );
  }

  logout(token) {
    return this.http.post(this.logoutUrl + token, null, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractDetails),
      catchError(this.handleError<string>('logout'))
    );
  }

  private extractDetails(res) {
    const data = res.data;
    return data || [];
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
