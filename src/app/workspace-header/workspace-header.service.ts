import { Injectable } from '@angular/core';

@Injectable()
export class WorkspaceHeaderService {

  constructor() { }
  private workspaceName: string;
  private workspace: any;
  setSelectedWorkspace(workspace: any) {
    this.workspaceName = workspace.workspaceName;
    this.workspace = workspace;
  }
  getSeletectedWorkspace() {
    return this.workspaceName;

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
}
