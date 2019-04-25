import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceInfo } from '../workspace-info/workspace-info';
import { WorkspaceObject } from '../workspace-objects';
import { environment } from '../../environments/environment';

@Injectable()
export class WorkspaceListService {

  wSListByUidUrl = environment.apiUrl + 'workspaces?userId=';
  private getWSInfoUrl = environment.apiUrl + 'workspaces/';
  // private headers;
  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
    // this.headers = new HttpHeaders(
    //   {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + this.userinfoService.getAuthKey()
    //   });
  }
  getList(id: string): Observable<WorkspaceObject[]> {
    const url = this.wSListByUidUrl + id;
    return this.http.get<WorkspaceObject[]>(url, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspaces),
      catchError(this.handleError('workspace-getList()', []))
      );
  }

  getListOfWorkspaceByUserId(id: string): Observable<WorkspaceObject[]> {
    const url = this.wSListByUidUrl + id;
    return this.http.get<WorkspaceObject[]>(url, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspaces),
      catchError(this.handleError('workspace-getList()', []))
    );
  }

  getWSInfoID(workspaceId: string): Observable<WorkspaceObject> {
    return this.http.get<WorkspaceObject>(this.getWSInfoUrl + workspaceId, { headers: this.userinfoService.getHeaders() })
    .pipe(
      map(this.extractWorkspaces),
      catchError(this.handleError('getDBInfoByID', []))
    );
  }

  deleteWS(WSdeleteId: string): Observable<WorkspaceObject> {
     return this.http.delete<WorkspaceObject>(this.getWSInfoUrl + WSdeleteId, { headers: this.userinfoService.getHeaders() })
    .pipe(
      map(this.deleteWorkspaces),
      catchError(this.handleError('deleteWS', []))
    );
  }


  private extractWorkspaces(res: any) {
    const data = res.data.workspaces;
    return data || [];
  }

  private deleteWorkspaces(res: any) {
    const data = res.data;
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
    console.log(message);
  }


}
