import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class WorkspaceHeaderService {

  private addWSValue = new BehaviorSubject(false);
  currentWSValue = this.addWSValue.asObservable();

  constructor() { }
  private workspace: any;
  setSelectedWorkspace(workspace: any) {
    this.workspace = workspace;
    console.log(this.workspace);
  }
  getSelectedWorkspaceName() {
    return this.workspace.workspaceName;
  }
  getSelectedWorkspaceId() {
    return this.workspace.id;
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
    return this.workspace.workspaceRole;
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
    return this.workspace.databases[0].id;
  }

  changeWSBooleanValue(message) {
    this.addWSValue.next(message);
  }
}
