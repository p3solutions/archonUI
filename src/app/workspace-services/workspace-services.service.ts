import { Injectable, EventEmitter } from '@angular/core';
import { serviceActionsPojo } from '../WorkspacePojo';


@Injectable()
export class WorkspaceServicesService {
  serviceActionUpdated: EventEmitter<serviceActionsPojo> = new EventEmitter();
  constructor() { }
  public setServiceActions: serviceActionsPojo;
  passServiceActions(serviceActions: serviceActionsPojo) {
    this.setServiceActions = serviceActions;
    this.serviceActionUpdated.emit(this.setServiceActions);

  }
}
