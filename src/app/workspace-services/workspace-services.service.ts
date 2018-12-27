import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { Observable ,  Observer ,  BehaviorSubject ,  Subject } from 'rxjs';

@Injectable()
export class WorkspaceServicesService {

  // serviceActionUpdated: EventEmitter<ServiceActionsObject> = new EventEmitter();
  private serviceActionsUpdated:  BehaviorSubject<ServiceActionsObject[]>=new BehaviorSubject<ServiceActionsObject[]>([]);
   userSelectedWorkspace = this.serviceActionsUpdated.asObservable();

  constructor() {
  }
  // passServiceActions(serviceActions: ServiceActionsObject) {
  //   localStorage.setItem('serviceActions', JSON.stringify(serviceActions));
  //   this.updateServiceActions();
  // }
  updateServiceActions(serviceActionList:ServiceActionsObject[]) {
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
          case 'SERVICE_LIVE_ARCHIVAL': {
            service.serviceName = 'Live Archival';
            service.iconName = 'livearchival.png';
            break;
          }
          case 'SERVICE_CUSTOM_SCREEN_BUILDING': {
            service.serviceName = 'Custom Screen Building';
            service.iconName = 'livearchival.png';
            break;
          }
          case 'SERVICE_END_2_END_TOOLKIT': {
            service.serviceName = 'End to End Toolkit';
            service.iconName = 'endtoendtoolkit.png';
            break;
          }
          case 'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL': {
            service.serviceName = 'Enterprise Data Retrieval Tool';
            service.iconName = 'livearchival.png';
            break;
          }
          case 'SERVICE_INFOARCHIVE_COMPLETE_APPLICATION_AUTOMATION': {
            service.serviceName = 'InfoArchive Complete Application Automation';
            service.iconName = 'livearchival.png';
            break;
          }
          case 'SERVICE_UNSTRUCTURED_DATA_ EXTRACTOR': {
            service.serviceName = 'Unstructured Data Extractor';
            service.iconName = 'livearchival.png';
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


