import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { UserWorkspaceService } from '../user-workspace.service';
import { WorkspaceObject } from '../workspace-objects';

@Component({
  selector: 'app-workspace-header-info',
  templateUrl: './workspace-header-info.component.html',
  styleUrls: ['./workspace-header-info.component.css']
})
export class WorkspaceHeaderInfoComponent implements OnChanges {
  currentWorkspace: WorkspaceObject;
  @Input() selectedWorkspace;

  constructor( ) { }

  ngOnChanges(changes: SimpleChanges) {
    const updatedWS: SimpleChange = changes.selectedWorkspace;
    this.currentWorkspace = updatedWS.currentValue;
  }
}
