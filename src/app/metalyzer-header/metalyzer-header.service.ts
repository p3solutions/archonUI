import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserinfoService } from '../userinfo.service';
import { EnvironmentService } from '../environment/environment.service';
@Injectable()
export class MetalyzerHeaderService {
  private apiUrl = this.environment.apiUrl;
  workspaceinfoUrl = this.apiUrl + 'workspaces/';
  exportxmlUrl = this.apiUrl + 'metalyzer/exportMetadata/';
  getAuditUrl = this.apiUrl + 'metalyzer/auditEvents?startIndex=';
  exportpdfUrl = this.apiUrl + 'metalyzer/export/erDiagram?';
  private workspaceId: string;
  private phase = new BehaviorSubject<string>('Analysis');
  cast = this.phase.asObservable();
  constructor(
    private http: HttpClient,
    private userinfoService: UserinfoService,
    private environment: EnvironmentService
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
  getExportxml(workspaceId, databaseID, xml): Observable<any> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: xml };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders()});
  }
  getExportjson(workspaceId, databaseID, json): Observable<any> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: json };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders()});
  }
  getExportOverallpdf(workspaceId): Observable<any> {
    const url = this.exportpdfUrl + 'workspaceId=' + workspaceId;
    return this.http.get(url,
      { headers: this.userinfoService.getHeaders()});
  }
  getExportSelectedpdf(workspaceId, tableID): Observable<any> {
    const url = this.exportpdfUrl + 'workspaceId=' + workspaceId + '&tableId=' + tableID;
    return this.http.get(url,
      { headers: this.userinfoService.getHeaders()});
  }
  private extractWorkspace(res: any) {
    const data = res.data.workspaces.workspaceName;
    return data || [];
  }

  getAudit(param, startIndex) {
    return this.http.post(this.getAuditUrl + startIndex, param, { headers: this.userinfoService.getHeaders() }).pipe(
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
