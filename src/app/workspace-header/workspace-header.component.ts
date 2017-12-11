import { Component, OnInit } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkSpaceHeaderInfo } from '../WorkSpaceHeaderInfo';

@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent implements OnInit {
  userWorkspaceArray: WorkSpaceHeaderInfo;
  id: number;

  constructor(
    private userWorkspaceService: UserWorkspaceService
  ) {  }

  ngOnInit() {
    this.id = 11; // userid --> info.id
    this.getUserWorkspaceList(this.id);
  }

  getUserWorkspaceList(id) {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(data => {
      this.userWorkspaceArray = data[id];
    });
  }

}
