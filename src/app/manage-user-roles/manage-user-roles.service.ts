import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalRoles } from '../global-roles';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class ManageUserRolesService {
  apiUrl = this.environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
  });

  // private getAllUsersUrl = this.apiUrl + 'users';
  private getGlobalRoleUrl = this.apiUrl + 'admin/roles/global';
  private changeGlobalRoleUrl = this.apiUrl + 'users/';
  private inviteUserUrl = this.apiUrl + 'users/invite';
  private getInviteUsersUrl = this.apiUrl + 'users/allInviteUsers?startIndex=';
  private getAllUsersUrl = this.apiUrl + 'users?startIndex=';
  private changeUserStatusUrl = this.apiUrl + 'users/accessRevoke?userId=';
  private getUserByEmailIdUrl = this.apiUrl + 'users/manage/role?emailAddress=';

  constructor(private http: HttpClient,
    private environment: EnvironmentService
  ) { }

  private extractGlobalRolesData(res: any) {
    const body = res.data.globalRoles;
    return body || [];
  }

  changeGlobalRoleDetails(userid, globalid) {
    const body = {
      userId: userid,
      globalRoleId: globalid
    };
    return this.http.patch(this.changeGlobalRoleUrl + userid + '/roles/global', body, { headers: this.headers })
      .pipe(catchError(this.handleError('changeglobalrole', [])));
  }


  getGlobalRoleDetails(): Observable<GlobalRoles[]> {
    return this.http.get<GlobalRoles[]>(this.getGlobalRoleUrl, { headers: this.headers }).pipe(
      map(this.extractGlobalRolesData),
      catchError(this.handleError('globalroles', []))
    );
  }

  /********************************* services used for new component  **********************************/

  inviteUser(param): Observable<any> {
    return this.http.post<any>(this.inviteUserUrl, param, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest));
  }

  getInviteUsers(startIndex): Observable<any> {
    return this.http.get<any>(this.getInviteUsersUrl + startIndex, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('getInviteUsers', []))
      );
  }

  getGlobalGroup(role): Observable<any> {
    return this.http.get<any>(this.apiUrl + role + '/group/global', { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('getInviteUsers', []))
      );
  }

  getAllUsers($startIndex, $accessRevoked, $accountLocked): Observable<any> {
    return this.http.get<any>(this.getAllUsersUrl + $startIndex + '&accessRevoked=' + $accessRevoked +
      '&accountLocked=' + $accountLocked, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('getAllUsers', []))
      );
  }

  getUserByEmailId(emailId): Observable<any> {
    return this.http.get<any>(this.getUserByEmailIdUrl + emailId, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('getUserByEmailId', []))
      );
  }

  changeUserStatus($url): Observable<any> {
    return this.http.patch<any>(this.changeUserStatusUrl + $url, null, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('changeUserStatus', []))
      );
  }

  changeGlobalGroup($url, param): Observable<any> {
    return this.http.patch<any>(this.apiUrl + $url, param, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest),
        catchError(this.handleError('changeGlobalGroup', []))
      );
  }

  cancelInvite(url): Observable<any> {
    return this.http.delete<any>(this.apiUrl + url, { headers: this.headers }).
      pipe(map(this.extractDataForAllRequest));
  }




  private extractDataForAllRequest(res: any) {
    const body = res;
    return body || [];
  }

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
      return of(result as T);
    };
  }
  /** Log a message with the MessageService */
  private log(message: string) {
    console.log(message);
  }


}
