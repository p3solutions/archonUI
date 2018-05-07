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

}
