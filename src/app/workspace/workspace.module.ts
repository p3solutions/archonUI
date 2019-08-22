import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceSelectionComponent } from './workspace-selection/workspace-selection.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WorkspaceSelectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    WorkspaceRoutingModule
  ]
})
export class WorkspaceModule { }
