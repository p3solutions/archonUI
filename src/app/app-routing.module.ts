import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import {RouterModule,Routes} from '@angular/router';
const routes : Routes = [
	{path : 'workspace-landing-page',component : WorkspaceLandingPageComponent}
	];
@NgModule({	
  imports: [
   RouterModule.forRoot(routes)
  ],

    exports : [RouterModule]
})

export class AppRoutingModule { }
