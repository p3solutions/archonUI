import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';


@Component({
  selector: 'app-workspace-mgmt-panel',
  templateUrl: './workspace-mgmt-panel.component.html',
  styleUrls: ['./workspace-mgmt-panel.component.css']
})
export class WorkspaceMgmtPanelComponent implements OnInit, OnChanges{
  @Input() workspaceId: string;
  @Input() role;
  checkActive = '';
  allowManage = false;
  Roles = ['ROLE_APPROVER', 'ROLE_OWNER'];

  constructor(private workspaceHeaderService: WorkspaceHeaderService) {
  }

  ngOnInit() {
    this.workspaceHeaderService.updatedCheckActive.subscribe(result => {
      this.checkActive = result;
    });
  }

  ngOnChanges(){
    this.allowManage = this.Roles.includes(this.role.name);
  }
}
