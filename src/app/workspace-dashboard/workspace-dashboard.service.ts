import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { ServiceActionsObject } from '../workspace-objects';
@Injectable()
export class WorkspaceDashboardService {
  serviceActionsList: ServiceActionsObject[];
  private serviceActions = new Subject<ServiceActionsObject>();
  serviceActionsSetted$ = this.serviceActions.asObservable();

 setServiceActions(obj: ServiceActionsObject) {
    this.serviceActions.next(obj);
 }
 getServiceActions() {
     return this.serviceActionsList;
 }
}
