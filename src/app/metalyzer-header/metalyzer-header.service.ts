import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserinfoService } from '../userinfo.service';
@Injectable()
export class MetalyzerHeaderService {
  workspaceinfoUrl = environment.apiUrl + 'workspaces/';
  exportxmlUrl = environment.apiUrl + 'metalyzer/exportMetadata/';
  getAuditUrl = environment.apiUrl + 'metalyzer/auditEvents';
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
    console.log('setworkspaceID', workspaceId);
  }
  getWorkspaceName(): Observable<string> {
    console.log('getworkspaceName', this.workspaceId);
    const URL = this.workspaceinfoUrl + this.workspaceId;
    console.log(URL);
    return this.http.get<string>(URL, { headers: this.userinfoService.getHeaders() }).pipe(
      map(this.extractWorkspace),
      catchError(this.handleError<string>('getworkspaceName'))
    );
  }
  getExportxml(workspaceId, databaseID, xml): Observable<Blob> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: xml };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders(), responseType: 'blob' });
  }
  getExportjson(workspaceId, databaseID, json): Observable<Blob> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: json };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders(), responseType: 'blob' });
  }
  private extractWorkspace(res: any) {
    const data = res.data.workspaces.workspaceName;
    return data || [];
  }

  getAudit(param) {
    return this.http.post(this.getAuditUrl, param, {headers: this.userinfoService.getHeaders()}).pipe(
      map(this.extractAudit),
      catchError(this.handleError<string>('getAudit'))
    );
  }

  private extractAudit(res: any) {
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
