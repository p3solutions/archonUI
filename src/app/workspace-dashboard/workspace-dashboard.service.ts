import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Subject }    from 'rxjs/Subject';
import { serviceActionsPojo } from '../WorkspacePojo';
@Injectable()
export class WorkspaceDashboardService {
  serviceActionsList: serviceActionsPojo[] = [];
  private serviceActions = new Subject<serviceActionsPojo>();
  serviceActionsSetted$ = this.serviceActions.asObservable();
    
 setServiceActions(obj : serviceActionsPojo){
    this.serviceActions.next(obj);
 }
 getServiceActions(){
     return this.serviceActionsList;
 }
}
