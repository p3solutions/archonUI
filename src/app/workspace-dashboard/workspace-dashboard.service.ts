import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ServiceActionsPojo } from '../WorkspacePojo';
@Injectable()
export class WorkspaceDashboardService {
  serviceActionsList: ServiceActionsPojo[] = [];
  private serviceActions = new Subject<ServiceActionsPojo>();
  serviceActionsSetted$ = this.serviceActions.asObservable();

 setServiceActions(obj: ServiceActionsPojo) {
    this.serviceActions.next(obj);
 }
 getServiceActions() {
     return this.serviceActionsList;
 }
}
