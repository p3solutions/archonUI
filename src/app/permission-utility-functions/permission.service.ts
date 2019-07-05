import { Injectable } from '@angular/core';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceObject } from '../workspace-objects';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private workspaceService: WorkspaceServicesService) { }
  selectedWorkspaceObj: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  updatedSelectedWorkspaceObj = this.selectedWorkspaceObj.asObservable();


  updateSelectedWorkspaceObj(_selectedWorkspaceObj: WorkspaceObject) {
    this.selectedWorkspaceObj.next(_selectedWorkspaceObj);
  }

  getRoleOfUserInWorkspace(): string {
    let returnPermission: any = '';
    this.selectedWorkspaceObj.subscribe(response => {
      if (response.workspaceRole !== undefined) {
        returnPermission = response.workspaceRole.name;
      }
    });
    return returnPermission;
  }


  getMetalyzerPermission(): any {
    let returnPermission: any = '';
    this.selectedWorkspaceObj.subscribe(response => {
      if (response) {
        if (response.serviceActions.filter(a => a.serviceName.trim().toUpperCase() === 'SERVICE_METALYZER')[0] !== undefined) {
          returnPermission = response.serviceActions.filter(a => a.serviceName.trim().toUpperCase()
            === 'SERVICE_METALYZER')[0].serviceActionType;
        }
      }
    });
    return returnPermission;
  }

  getAdhocPermission() {
    let returnPermission: any = '';
    this.selectedWorkspaceObj.subscribe(response => {
      if (response) {
        if (response.serviceActions.filter(a => a.serviceName.trim().toUpperCase() === 'SERVICE_IA_ADHOC_QUERY_BUILDER')[0] !== undefined) {
          returnPermission = response.serviceActions.filter(a => a.serviceName.trim().toUpperCase()
            === 'SERVICE_IA_ADHOC_QUERY_BUILDER')[0].serviceActionType;
        }
      }
    });
    return returnPermission;
  }

  getRdbmsPermission() {
    let returnPermission: any = '';
    this.selectedWorkspaceObj.subscribe(response => {
      if (response) {
        if (response.serviceActions.filter(a => a.serviceName.trim().toUpperCase() ===
          'SERVICE_DB_EXTRACTOR')[0] !== undefined) {
          returnPermission = response.serviceActions.filter(a => a.serviceName.trim().toUpperCase() ===
            'SERVICE_DB_EXTRACTOR')[0].serviceActionType;
        }
      }

    });
    return returnPermission;
  }

  getERTPermission() {
    let returnPermission: any = '';
    this.selectedWorkspaceObj.subscribe(response => {
      if (response) {
        if (response.serviceActions.filter(a => a.serviceName.trim().toUpperCase() ===
          'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL')[0] !== undefined) {
          returnPermission = response.serviceActions.filter(a => a.serviceName.trim().toUpperCase() ===
            'SERVICE_ENTERPRISE_DATA_RETRIEVAL_TOOL')[0].serviceActionType;
        }
      }
    });
    return returnPermission;
  }
}
