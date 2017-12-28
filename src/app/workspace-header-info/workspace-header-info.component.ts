import { Component, OnInit } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkSpaceHeaderInfo } from '../WorkSpaceHeaderInfo';

@Component({
  selector: 'app-workspace-header-info',
  templateUrl: './workspace-header-info.component.html',
  styleUrls: ['./workspace-header-info.component.css']
})
export class WorkspaceHeaderInfoComponent implements OnInit {
  currentWorkspace: WorkSpaceHeaderInfo;

  constructor(
    private userWorkspaceService: UserWorkspaceService
  ) { }

  ngOnInit() {
    this.getCurrentWorkspace();
  }

  getCurrentWorkspace() {
    this.userWorkspaceService.getCurrentWorkspace()
      .subscribe(data => {
        this.currentWorkspace = data;
      });
  }
}
