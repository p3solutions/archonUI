import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { Observable, Observer, BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class WorkspaceServicesService {

  private serviceActionsUpdated: BehaviorSubject<ServiceActionsObject[]> = new BehaviorSubject<ServiceActionsObject[]>([]);
  userSelectedWorkspace = this.serviceActionsUpdated.asObservable();

  constructor() {
  }
  updateServiceActions(serviceActionList: ServiceActionsObject[]) {
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
            service.serviceName = 'RDBMS Extractor';
            service.iconName = 'RDBMS-icon.png';
            break;
          }
          case 'SERVICE_IA_ADHOC_QUERY_BUILDER': {
            service.serviceName = 'IA Adhoc Query Builder';
            service.iconName = 'querybuilder.png';
            break;
          }
        }
      }
    }
    return serviceActions;
  }
}


