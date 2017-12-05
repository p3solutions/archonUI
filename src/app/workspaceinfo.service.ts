import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class WorkspaceinfoService {

  constructor(private http: HttpClient) { }

  workspaceinfoUrl = 'api/workspaceinfo';

}
