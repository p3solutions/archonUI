import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceSelectionComponent } from './workspace-selection/workspace-selection.component';

@NgModule({
  declarations: [WorkspaceSelectionComponent],
  imports: [
    CommonModule,
    WorkspaceRoutingModule
  ]
})
export class WorkspaceModule { }
