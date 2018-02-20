import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsObject } from '../workspace-objects';


@Injectable()
export class WorkspaceServicesService {
  serviceActionUpdated: EventEmitter<ServiceActionsObject> = new EventEmitter();
  constructor() { }
  public setServiceActions: ServiceActionsObject;
  passServiceActions(serviceActions: ServiceActionsObject) {
    this.setServiceActions = serviceActions;
    this.serviceActionUpdated.emit(this.setServiceActions);

  }
}
