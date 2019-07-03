import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';
import { Observable, Observer, BehaviorSubject, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class WorkspaceServicesService {

  private serviceActionsUpdated: BehaviorSubject<ServiceActionsObject[]> = new BehaviorSubject<ServiceActionsObject[]>([]);
  userSelectedWorkspace = this.serviceActionsUpdated.asObservable();

  constructor(private spinner: NgxSpinnerService) {
  }
  updateServiceActions(serviceActionList: ServiceActionsObject[]) {
    this.serviceActionsUpdated.next(serviceActionList);
  }

  updateServiceActionsList(serviceActions: ServiceActionsObject[], userServiceActions: any): ServiceActionsObject[] {
    this.spinner.show();
    try {
      if (serviceActions) {
        for (const service of serviceActions) {
          switch (service.serviceName) {
            case 'SERVICE_METALYZER': {
              service.serviceName = 'Metalyzer';
              service.iconName = 'metalyzer.png';
              service.enableService = userServiceActions.filter(a => a.serviceName === 'SERVICE_METALYZER')[0].enableService;
              service.serviceActionType = userServiceActions.filter(a => a.serviceName === 'SERVICE_METALYZER')[0].serviceActionType;
              // tslint:disable-next-line:max-line-length
              service.desc = 'Relationship analyzing tool for any relational database. It helps user to find the relationship among tables from the relational databases.';
              break;
            }
            case 'SERVICE_DB_EXTRACTOR': {
              service.serviceName = 'RDBMS Extractor';
              service.iconName = 'rdbmsextractor.png';
              service.enableService = userServiceActions.filter(a => a.serviceName === 'SERVICE_DB_EXTRACTOR')[0].enableService;
              service.serviceActionType = userServiceActions.filter(a => a.serviceName === 'SERVICE_METALYZER')[0].serviceActionType;
              service.desc = 'Extraction tool with unique capability to understand and connect database system.';
              break;
            }
            case 'SERVICE_IA_ADHOC_QUERY_BUILDER': {
              service.serviceName = 'IA Adhoc Query Builder';
              service.iconName = 'querybuilder.png';
              service.serviceActionType = userServiceActions.filter(a => a.serviceName === 'SERVICE_METALYZER')[0].serviceActionType;
              service.enableService = userServiceActions.filter(a => a.serviceName === 'SERVICE_IA_ADHOC_QUERY_BUILDER')[0].enableService;
              // tslint:disable-next-line:max-line-length
              service.desc = 'To create the screens in a customized way based on user requirements, Custom screen builder will give more options to work on it.';
              break;
            }
            case 'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL': {
              service.serviceName = 'ERT';
              service.iconName = 'ert.png';
              service.enableService = userServiceActions.filter(a => a.serviceName
                === 'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL')[0].enableService;
              service.serviceActionType = userServiceActions.filter(a => a.serviceName === 'SERVICE_METALYZER')[0].serviceActionType;
              // tslint:disable-next-line:max-line-length
              service.desc = 'Customize and extract selective data along with manipulation for Table, Data Record and SIP type archival for relational databases.';
              break;
            }
          }
        }
      }
      this.spinner.hide();
      return serviceActions;
    } catch {
      this.spinner.hide();
    }
  }
}


