import { Injectable } from '@angular/core';

@Injectable()
export class WorkspaceHeaderService {

  constructor() { }
  private workspaceId: string;
  setSelectedWorkspace(workspaceId: any) {
    this.workspaceId = workspaceId;
  }
  getSeletectedWorkspace() {
    return this.workspaceId;
  }

}
