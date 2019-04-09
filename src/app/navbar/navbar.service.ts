import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

updateUrl = environment.apiUrl + 'workspaces/markRead?notificationId=';
getNotificationUrl = environment.apiUrl + 'workspaces/notificationList?userId=';

  constructor(private userinfoService: UserinfoService, private http: HttpClient) { }

  updateNotification(id) {
    const url = this.updateUrl + id;
    return this.http.post(url, null , { headers: this.userinfoService.getHeaders()}).pipe(
      catchError(this.handleError<string>('updateNotification'))
    );
  }

  getNotification() {
    const url = this.getNotificationUrl + this.userinfoService.getUserId();
    return this.http.get(url,
      { headers: this.userinfoService.getHeaders()}).pipe(
        map(this.extractDetails),
        catchError(this.handleError<string>('getworkspaceName'))
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
