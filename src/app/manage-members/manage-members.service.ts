import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { ManageMembers } from '../manage-members';
import { UserinfoService } from '../userinfo.service';
import { AnyObject } from '../workspace-objects';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class ManageMembersService {
  apiUrl = this.environment.apiUrl;
  wSMembersUrl = 'workspaces/';
  wSroleListUrl = 'roles/workspace';
  serviceActionsUrl = 'public/roles/actions';
  wsDelAccessUrl = 'workspaces/access/';
  updateWSRoleUrl = 'workspaces/access';
  headers: HttpHeaders;

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) {
    this.headers = userinfoService.getHeaders();
  }

  getWSMembers(workspaceId): Observable<ManageMembers[]> {
    const url = this.apiUrl + this.wSMembersUrl + workspaceId;
    return this.http.get<ManageMembers[]>(url, { headers: this.headers }).pipe(
      map(this.extractWSMembers),
      catchError(this.handleError('managemembers', []))
    );
  }

  getwsRoleList(): Observable<any> {
    const url = this.apiUrl + this.wSroleListUrl;
    return this.http.get<any[]>(url, { headers: this.headers }).pipe(
      map(this.extractWSRoles),
      catchError(this.handleError('getwsRoleList', []))
    );
  }

  getServiceActions(): Observable<any> {
    const url = this.apiUrl + this.serviceActionsUrl;
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(this.extractServiceActions),
      catchError(this.handleError('getServiceActions'))
    );
  }
  updateRole(params: AnyObject) {
   // params.id = this.userinfoService.getUserId(); // loggedIn user id
    const url = this.apiUrl + this.updateWSRoleUrl;
    return this.http.patch<any>(url, params, { headers: this.headers }).pipe(
      map(this.extractData),
      catchError(this.handleError('updateRole'))
    );
  }
  updateServiceActions(params: AnyObject) {
      const url = this.apiUrl + `users/${encodeURIComponent(params.userId)}/roles/actions`;
   // const url = this.apiUrl + `users/"${params.userId}"/roles/actions`;
    return this.http.post<any>(url, params, { headers: this.headers }).pipe(
      map(this.extractServiceActions),
      catchError(this.handleError('updateServiceActions'))
    );
  }
  deleteManageMembersData(param: AnyObject, wsId: string): Observable<any> {
    console.log(param);
    const url = this.apiUrl + this.wsDelAccessUrl + wsId + '/member';
    return this.http.request<any>('DELETE', url, { body: param, headers: this.headers })
      .pipe(catchError(this.handleError('deleteManageMembersData', []))
        // tap(_ => this.log(`deleted hero id=${id}`)),
        // catchError(this.handleError<Hero>('deleteHero'))
      );
  }


  private extractData(res: any) {
    const data = res.data;
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
  }


}
