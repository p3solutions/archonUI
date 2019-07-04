import { Injectable } from '@angular/core';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private workspaceService: WorkspaceServicesService) { }

  getMetalyzerPermission(): any {
    let returnPermission: any = '';
    this.workspaceService.userSelectedWorkspace.subscribe(response => {
      returnPermission = response.filter(a => a.serviceName === 'Metalyzer')[0].serviceActionType;
    });
    return returnPermission;
  }

  getAdhocPermission() {
    let returnPermission: any = '';
    this.workspaceService.userSelectedWorkspace.subscribe(response => {
      returnPermission = response.filter(a => a.serviceName === 'Metalyzer')[0].serviceActionType;
    });
    return returnPermission;
  }

  getRdbmsPermission() {
    let returnPermission: any = '';
    this.workspaceService.userSelectedWorkspace.subscribe(response => {
      returnPermission = response.filter(a => a.serviceName === 'Metalyzer')[0].serviceActionType;
    });
    return returnPermission;
  }

  getERTPermission() {
    let returnPermission: any = '';
    this.workspaceService.userSelectedWorkspace.subscribe(response => {
      returnPermission = response.filter(a => a.serviceName === 'ERT')[0].serviceActionType;
    });
    return returnPermission;
  }
}
