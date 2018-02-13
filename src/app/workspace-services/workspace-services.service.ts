import { Injectable, EventEmitter } from '@angular/core';
import { ServiceActionsPojo } from '../WorkspacePojo';


@Injectable()
export class WorkspaceServicesService {
  serviceActionUpdated: EventEmitter<ServiceActionsPojo> = new EventEmitter();
  constructor() { }
  public setServiceActions: ServiceActionsPojo;
  passServiceActions(serviceActions: ServiceActionsPojo) {
    this.setServiceActions = serviceActions;
    this.serviceActionUpdated.emit(this.setServiceActions);

  }
}
