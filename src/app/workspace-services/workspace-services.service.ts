import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { Observable, Observer, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class WorkspaceServicesService {

  // serviceActionUpdated: EventEmitter<ServiceActionsObject> = new EventEmitter();
  private serviceActionsUpdated: BehaviorSubject<ServiceActionsObject[]> = new BehaviorSubject<ServiceActionsObject[]>([]);
  userSelectedWorkspace = this.serviceActionsUpdated.asObservable();

  constructor() {
  }
  // passServiceActions(serviceActions: ServiceActionsObject) {
  //   localStorage.setItem('serviceActions', JSON.stringify(serviceActions));
  //   this.updateServiceActions();
  // }
  updateServiceActions(serviceActionList: ServiceActionsObject[]) {
    // if (localStorage) {
    //   const data = localStorage.getItem('serviceActions');
    //   this.serviceActionsUpdated.next(JSON.parse(data));
    // }
    this.serviceActionsUpdated.next(serviceActionList);
  }

  updateServiceActionsList(serviceActions: ServiceActionsObject[]): ServiceActionsObject[] {
    if (serviceActions) {
      for (const service of serviceActions) {

        switch (service.serviceName) {
          case 'SERVICE_METALYZER': {
            service.serviceName = 'Metalyzer';
            service.iconName = 'metalyzer.png';
            break;
          }

          case 'SERVICE_DB_EXTRACTOR': {
            service.serviceName = 'DB Extractor';
            service.iconName = 'rdbmsextractor.png';
            break;
          }
          case 'SERVICE_IA_ADHOC_QUERY_BUILDER': {
            service.serviceName = 'IA Adhoc Query Builder';
            service.iconName = 'querybuilder.png';
            break;
          }
          // default: {
          //   service.serviceName = 'No Service Available';
          //   break;
          // }
        }
      }
    }
    return serviceActions;
  }
}


