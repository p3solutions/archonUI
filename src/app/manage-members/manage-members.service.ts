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

@Injectable()
export class ManageMembersService {
  apiUrl = environment.apiUrl;
  wSMembersUrl = 'workspaces/';
  wSroleListUrl = 'admin/roles/workspace';
  serviceActionsUrl = 'public/roles/actions';
  wsDelAccessUrl = 'workspaces/access/remove/{{id}}';
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
      .map(this.extractWSROles)
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

  deleteManageMembersData(indexObject): Observable<ManageMembers[]> {
    // deleteHero (hero: Hero | number): Observable<Hero> {
    // const id = typeof hero === 'number' ? hero : hero.id;
    const url = this.apiUrl + this.wsDelAccessUrl;
    return this.http.delete<ManageMembers[]>(url).pipe(
      catchError(this.handleError('managemembers', []))
      // tap(_ => this.log(`deleted hero id=${id}`)),
      // catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private extractWSROles(res: any) {
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





