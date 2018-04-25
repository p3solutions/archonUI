import { Injectable } from '@angular/core';

@Injectable()
export class WorkspaceHeaderService {

  constructor() { }
  private workspaceName: string;
  setSelectedWorkspace(workspaceName: string) {
    this.workspaceName = workspaceName;
  }
  getSeletectedWorkspace() {
    return this.workspaceName;
  }
}
