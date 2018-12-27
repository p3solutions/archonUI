import { Injectable } from '@angular/core';

@Injectable()
export class WorkspaceHeaderService {

  constructor() { }
  private workspace: any;
  setSelectedWorkspace(workspace: any) {
    this.workspace = workspace;
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
    // console.log(this)
    const members = this.workspace.members;
    for (let i = 0; i < members.length; i++) {
      if (members[i].user.id === userId) {
        return members[i].serviceActions[0].serviceActionType;
      }
    }
    return null;
  }
  getDatabaseID() {
   return this.workspace.databases[0].id;
  }
}
