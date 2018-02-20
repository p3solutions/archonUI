import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { ManageMembers } from '../managemembers';
import { UserinfoService } from '../userinfo.service';
import { environment } from '../../environments/environment';
import { AnyObject } from '../WorkspacePojo';

@Injectable()
export class ManageMembersService {
  apiUrl = environment.apiUrl;
  wSMembersUrl = 'workspaces/';
  wSroleListUrl = 'admin/roles/workspace';
  serviceActionsUrl = 'public/roles/actions';
  wsDelAccessUrl = 'workspaces/access/remove/';
  updateWSRole = 'workspaces/access/';
  headers: HttpHeaders;

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
      this.headers = userinfoService.getHeaders();
    }

  getWSMembers(workspaceId): Observable<ManageMembers[]> {
    const url = this.apiUrl + this.wSMembersUrl + workspaceId;
    return this.http.get<ManageMembers[]>(url, { headers: this.headers })
      .map(this.extractWSMembers)
      .pipe(catchError(this.handleError('managemembers', []))
    );
  }

  getwsRoleList(): Observable<any> {
    const url = this.apiUrl + this.wSroleListUrl;
    return this.http.get<any[]>(url, { headers: this.headers })
      .map(this.extractWSRoles)
      .pipe(catchError(this.handleError('getwsRoleList', []))
      );
  }

  getServiceActions(): Observable<any> {
  const url = this.apiUrl + this.serviceActionsUrl;
  return this.http.get<any>(url, { headers: this.headers })
    .map(this.extractServiceActions)
    .pipe(catchError(this.handleError('getServiceActions'))
    );
  }
  updateRole(params: AnyObject) {
    params.id = this.userinfoService.getUserId(); // loggedIn user id
    const url = this.apiUrl + this.updateRole + params.id;
    return this.http.get<any>(url, { headers: this.headers })
      .map(this.extractData)
      .pipe(catchError(this.handleError('updateRole'))
    );
  }
  updateServiceActions(params: AnyObject) {
    params.userId = this.userinfoService.getUserId();
    const url = this.apiUrl + `users/${params.userId}/roles/actions`;
    console.log('updateServiceActions params:', params);
    return this.http.get<any>(url, { headers: this.headers })
      .map(this.extractServiceActions)
      .pipe(catchError(this.handleError('updateServiceActions'))
    );
  }
  deleteManageMembersData(param: AnyObject): Observable<any> {
    const url = this.apiUrl + this.wsDelAccessUrl + param.id;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError('deleteManageMembersData', []))
      // tap(_ => this.log(`deleted hero id=${id}`)),
      // catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  private extractData(res: any) {
    const data = res.data;
    console.log('roles success data:', data);
    return data || [];
  }

  private extractWSRoles(res: any) {
    const data = res.data.workspaceRoles;
    return data || [];
  }
  private extractWSMembers(res: any) {
    const data = res.data.workspaces.members;
    return data || [];
  }
  private extractServiceActions(res: any) {
    const data = res.data.serviceActions;
    return data || [];
  }

  // * Handle Http operation that failed.
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





