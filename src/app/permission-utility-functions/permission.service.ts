import { Injectable } from '@angular/core';
import { WorkspaceServicesService } from '../workspace-services/workspace-services.service';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceObject } from '../workspace-objects';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private workspaceService: WorkspaceServicesService) { }
  selectedWorkspaceObj: BehaviorSubject<WorkspaceObject> = new BehaviorSubject<WorkspaceObject>(new WorkspaceObject());
  updatedSelectedWorkspaceObj = this.selectedWorkspaceObj.asObservable();


  updateSelectedWorkspaceObj(_selectedWorkspaceObj: WorkspaceObject) {
    this.selectedWorkspaceObj.next(_selectedWorkspaceObj);
  }

  getRoleOfUserInWorkspace(): string {
    let returnPermission: any = '';
    this.selectedWorkspaceObj.subscribe(response => {
      returnPermission = response.workspaceRole.name;
    });
    return returnPermission;
  }


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
