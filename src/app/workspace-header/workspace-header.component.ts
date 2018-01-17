import { Component, OnInit, Input } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspacePojo } from '../WorkspacePojo';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-workspace-header',
  templateUrl: './workspace-header.component.html',
  styleUrls: ['./workspace-header.component.css']
})
export class WorkspaceHeaderComponent implements OnInit {
  userWorkspaceArray: WorkspacePojo[];
  userId: string;
  userRole: any;
  selectedWorkspaceName: string;
  currentWorkspace: WorkspacePojo;
  fn: any;

  constructor(
    private userWorkspaceService: UserWorkspaceService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    this.getUserWorkspaceList();
    this.userRole = this.userinfoService.getUserRoles();
  }

  getUserWorkspaceList() {
    this.userWorkspaceService.getUserWorkspaceList().subscribe(res => {
      this.userWorkspaceArray = res;
      console.log(res);
      if (res && res.length > 0) {
        const fn = function () {
          const dropdownItem = (<HTMLAnchorElement>document.querySelector('#selectedWorkspace .dropdown-data'));
          if (dropdownItem) {
            dropdownItem.click();
            clearInterval(k);
          }
        };
        const k = setInterval(fn, 500);
      }
    });
  }

  contactAdmin() {
    console.log('contact Admin function pending!');
  }

  createNewWorkspace() {
    console.log('creating new workspace function pending!');
  }

  selectWorkspace(selectedWorkspace: WorkspacePojo) {
    this.selectedWorkspaceName = selectedWorkspace.workspaceName;
    this.currentWorkspace = selectedWorkspace;
    console.log('currWS value', this.currentWorkspace);
  }
  onChange(val) {
    console.log(val, 'selected', JSON.stringify(val));
    // const ws = JSON.stringify(val);
    switch (val) {
      case '0':
          // do nothing
        break;
      case '1': {
        this.createNewWorkspace();
        break;
      }
      case '2': {
        this.contactAdmin();
        break;
      }
      default:
        // this.selectWorkspace(JSON.parse(ws));
        break;
    }
  }
}
