import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';


@Component({
  selector: 'app-workspace-mgmt-panel',
  templateUrl: './workspace-mgmt-panel.component.html',
  styleUrls: ['./workspace-mgmt-panel.component.css']
})
export class WorkspaceMgmtPanelComponent implements OnInit {
  @Input() workspaceId: string;
  @Input() role;
  checkActive = '';

  constructor(private workspaceHeaderService: WorkspaceHeaderService) {
  }

  ngOnInit() {
    this.workspaceHeaderService.updatedCheckActive.subscribe(result => {
      this.checkActive = result;
    });
  }
}
