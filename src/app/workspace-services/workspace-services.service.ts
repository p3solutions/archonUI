import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WorkspaceServicesService {
  // serviceActionUpdated: EventEmitter<ServiceActionsObject> = new EventEmitter();
  public serviceActionsUpdated: BehaviorSubject<ServiceActionsObject[]> = new BehaviorSubject(
    JSON.parse(localStorage.getItem('serviceActions')));
  constructor() {
  }
  passServiceActions(serviceActions: ServiceActionsObject) {
    localStorage.setItem('serviceActions', JSON.stringify(serviceActions));
    this.updateServiceActions();
  }
  updateServiceActions() {
    if (localStorage) {
      const data = localStorage.getItem('serviceActions');
      this.serviceActionsUpdated.next(JSON.parse(data));
    }
  }
}


