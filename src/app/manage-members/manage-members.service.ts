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

@Injectable()
export class ManageMembersService {
  url = 'http://13.58.89.64:9000/';
  wSMembersUrl = 'workspaces/access?workspaceId=';
  wSroleListUrl = 'admin/roles/workspace';
  wsDelAccessUrl = 'workspaces/access/remove/{{id}}';
  headers: HttpHeaders;

  constructor(private http: HttpClient,
    private userinfoService: UserinfoService) {
      this.headers = userinfoService.getHeaders();
    }

  getWSMembers(workspaceId): Observable<ManageMembers[]> {
    const URL = this.url + this.wSMembersUrl + workspaceId;
    return this.http.get<ManageMembers[]>(URL, { headers: this.headers })
      .map(this.extractWSAccess)
      .pipe(catchError(this.handleError('managemembers', []))
    );
  }

  getwsRoleList() {
    const URL = this.url + this.wSroleListUrl;
    return this.http.get<ManageMembers[]>(URL, { headers: this.headers })
      .map(this.extractWSROles)
      .pipe(catchError(this.handleError('getwsRoleList', []))
      );
  }

  deleteManageMembersData(indexObject): Observable<ManageMembers[]> {
    // deleteHero (hero: Hero | number): Observable<Hero> {
    // const id = typeof hero === 'number' ? hero : hero.id;
    const URL = this.url + this.wsDelAccessUrl;
    return this.http.delete<ManageMembers[]>(URL).pipe(
      catchError(this.handleError('managemembers', []))
      // tap(_ => this.log(`deleted hero id=${id}`)),
      // catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private extractWSROles(res: any) {
    const data = res.data.workspaceRoles;
    return data || [];
  }
  private extractWSAccess(res: any) {
    const data = res.data.workspaceAccess;
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





