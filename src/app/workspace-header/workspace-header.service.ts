import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkspaceObject } from '../workspace-objects';

@Injectable()
export class WorkspaceHeaderService {

  private addWSValue = new BehaviorSubject(false);
  currentWSValue = this.addWSValue.asObservable();
  private checkActive: BehaviorSubject<string> = new BehaviorSubject<string>('Services');
  updatedCheckActive = this.checkActive.asObservable();
  selected;

  workspaceList: BehaviorSubject<WorkspaceObject[]> = new BehaviorSubject<WorkspaceObject[]>([]);
  updatedWorkspaceList = this.workspaceList.asObservable();

  constructor() { }
  private workspace: any;


  updateWorkspaceList(_workspaces: WorkspaceObject[]) {
    this.workspaceList.next(_workspaces);
  }

  setSelectedWorkspace(workspace: any) {
    this.workspace = workspace;
  }

  getSelectedWorkspaceName() {
    if (this.workspace !== undefined) {
      return this.workspace.workspaceName;
    } else {
      return '';
    }
  }
  getSelectedWorkspaceId() {
    if (this.workspace !== undefined) {
      return this.workspace.id;
    } else {
      return '';
    }

  }
  getSelectedWorkspaceMasterMetadataVersion() {
    return this.workspace.masterMetadataVersion;
  }
  getSelectedWorkspaceMemberList() {
    return this.workspace.members;
  }
  getSelectedWorkspaceOwner() {
    return this.workspace.owner;
  }
  getSelectedWorkspaceCreatedTime() {
    return this.workspace.createdAt;
  }
  getSelectedWorkspaceUpdatedTime() {
    return this.workspace.updatedAt;
  }
  getSelectedWorkspaceWorkspaceRole() {
    if (this.workspace !== undefined) {
      return this.workspace.workspaceRole;
    } else {
      return '';
    }
  }
  getSelectedWorkspaceWorkspaceState() {
    return this.workspace.workspaceState;
  }
  getServiceActionType(userId: string) {
    const members = this.workspace.members;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user.id === userId) {
        return members[i].serviceActions[0].serviceActionType;
      }
    }
    return null;
  }
  getMetalyzerServiceId(userId: string) {
    const members = this.workspace.members;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user.id === userId) {
        return members[i].serviceActions[0].serviceId;
      }
    }
    return null;
  }

  getDatabaseID() {
    if (this.workspace !== undefined) {
      return this.workspace.databases[0].id;
    } else {
      return '';
    }
  }

  getSelectedDatabaseType() {
    if (this.workspace !== undefined) {
      return this.workspace.databases[0].type;
    } else {
      return '';
    }
  }

  changeWSBooleanValue(message) {
    this.addWSValue.next(message);
  }
  updateCheckActiveTab(checkActive: string) {
    this.checkActive.next(checkActive);
  }
}
