import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceObject } from '../workspace-objects';
import { EnvironmentService } from '../environment/environment.service';

@Injectable()
export class WorkspaceListService {

  wSListByUidUrl = this.environment.apiUrl + 'workspaces?userId=';
  private getWSInfoUrl = this.environment.apiUrl + 'workspaces/';
  // private headers;
  constructor(private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
  ) {
    // this.headers = new HttpHeaders(
    //   {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + this.userinfoService.getAuthKey()
    //   });
  }
  getList(id: string): Observable<WorkspaceObject[]> {
    const url = this.wSListByUidUrl + encodeURIComponent(id);
    return this.http.get<WorkspaceObject[]>(url, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspaces),
      catchError(this.handleError('workspace-getList()', []))
    );
  }

  getListOfWorkspaceByUserId(id: string): Observable<WorkspaceObject[]> {
    const url = this.wSListByUidUrl + encodeURIComponent(id);
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
      map(this.deleteWorkspaces)
    );
  }

  updateWS(WSeditId: string, params: any): Observable<WorkspaceObject> {
    return this.http.patch<WorkspaceObject>(this.getWSInfoUrl + WSeditId, params, { headers: this.userinfoService.getHeaders() })
   .pipe(
     map(this.updateWorkspaces)
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
  private updateWorkspaces(res: any) {
    const data = res;
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
    // console.log(message);
  }


}
