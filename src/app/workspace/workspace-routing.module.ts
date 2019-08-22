import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceSelectionComponent } from './workspace-selection/workspace-selection.component';

const routes: Routes = [
  {
    path: 'workspace-selection', component: WorkspaceSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
