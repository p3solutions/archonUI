import { Component, OnInit, Input } from '@angular/core';
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
  @Input() userId: number;
  @Input() userRole: string;

  constructor(
    private userWorkspaceService: UserWorkspaceService
  ) {  }

  ngOnInit() {
    this.id = this.userId;
    this.getUserWorkspaceList(this.id);
  }

  getUserWorkspaceList(id) {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(data => {
      this.userWorkspaceArray = data[id];
    });
  }

  contactAdmin() {
    console.log('contact Admin function pending!');
  }
  createNewWorkspace() {
    console.log('creating new workspace function pending!');
  }

  selectWorkspace(selectedWorkspaceId: number) {
    console.log('selectedWorkspaceId', selectedWorkspaceId);
  }
}
