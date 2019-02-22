import { Injectable } from '@angular/core';
import { ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { UserinfoService } from '../../userinfo.service';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class MetalyzerHeaderService {
  // Web sockets
  private serverUrl = 'http://localhost:8091/archon-notifications';
  private title = 'WebSockets chat';
  private stompClient;
  // Web sockets
  workspaceinfoUrl = environment.apiUrl + 'workspaces/';
  exportxmlUrl = environment.apiUrl + 'metalyzer/exportMetadata/';
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
  getExportxml(workspaceId, databaseID, xml, tableID): Observable<Blob> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: xml, tableId: [tableID] };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders(), responseType: 'blob' });
  }
  getExportjson(workspaceId, databaseID, json, tableID): Observable<Blob> {
    const params = { workspaceId: workspaceId, databaseId: databaseID, exportType: json, tableId: [tableID] };
    return this.http.post(this.exportxmlUrl, params,
      { headers: this.userinfoService.getHeaders(), responseType: 'blob' });
  }

  // Web socket
  initializeWebsocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    console.log('connecting to stomp client');
    this.stompClient.connect({}, function (frame) {
      console.log('connection established');
      that.stompClient.subscribe('/topic/metalyzer', (message) => {
        console.log('we are getting a message');
        console.log(JSON.parse(message.body));
      });
    });
  }
  // Web socket

  private extractWorkspace(res: any) {
    const data = res.data.workspaces.workspaceName;
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
