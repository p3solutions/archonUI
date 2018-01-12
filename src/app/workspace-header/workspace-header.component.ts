import { Component, OnInit, Input } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspacePojo } from '../WorkspacePojo';
import { Info } from '../info';
@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent implements OnInit {
  userWorkspaceArray: WorkspacePojo[];
  userId: string;

  constructor(
    private userWorkspaceService: UserWorkspaceService
  ) {  }

  ngOnInit() {
    this.getUserWorkspaceList();
  }

  getUserWorkspaceList() {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      console.log('getUserWorkspaceList', res);
    });
  }

  onChangeDropdown(selected: any) {
    switch (selected[0].id) {
      case 'contactAdmin':
        this.contactAdmin();
        break;
      case 'createWorkspace':
        this.createNewWorkspace();
        break;
      default:
        this.selectWorkspace(selected[0].id);
        break;
    }
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
