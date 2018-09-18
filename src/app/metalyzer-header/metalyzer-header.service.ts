import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
@Injectable()
export class MetalyzerHeaderService {
  workspaceinfoUrl = environment.apiUrl + 'workspaces/';
  private workspaceId: string;
  private phase = new BehaviorSubject<string>('Analysis');
  cast = this.phase.asObservable();
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService
  ) {
  }
  setPhase(phase: string) {
    this.phase.next(phase);
  }
  getPhase() {
    return this.phase;
  }
  setWorkspaceId(workspaceId: string) {
    this.workspaceId = workspaceId;
  }
  getWorkspaceName(): Observable<string> {
    const URL = this.workspaceinfoUrl + this.workspaceId;
    return this.http.get<string>(URL, { headers: this.userinfoService.getHeaders() })
      .map(this.extractWorkspace)
      .pipe(catchError(this.handleError<string>('getworkspaceName'))
      );
  }
  private extractWorkspace(res: any) {
    const data = res.data.workspaces.workspaceName;
    return data || [];
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
