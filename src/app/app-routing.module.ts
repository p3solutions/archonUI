import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { WorkspaceInfoComponent } from './workspace-info/workspace-info.component';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { Component } from '@angular/core/src/metadata/directives';
import { WorkspacePanelComponent } from './workspace-panel/workspace-panel.component';
import { MemberRequestComponent } from './member-request/member-request.component';
import { NoWorkspaceComponent } from './no-workspace/no-workspace.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import { ManageMasterMetadataComponent } from './manage-master-metadata/manage-master-metadata.component';

const routes: Routes = [
  {
    path: 'workspace', component: WorkspaceLandingPageComponent, children: [
      {
        path: 'no-workspace', component: NoWorkspaceComponent
      },
      {
        path: 'workspace-dashboard', component: WorkspaceDashboardComponent, children: [
          {
            path: 'workspace-info', component: WorkspaceInfoComponent
          },
          {
            path: 'member-request', component: MemberRequestComponent
          },
          {
            path: 'manage-members', component: ManageMembersComponent
          }
        ]
      },
    ]
  },
// , data : {title : 'Manage Member Request for Approvals'}
// const routes: Routes = [
//   { path: 'workspace', component: WorkspaceLandingPageComponent, children : [
//     {
//       path : 'workspace-panel', component : WorkspacePanelComponent, children : [
//         {
//           path : 'member-request',component : MemberRequestComponent, data :{title : 'Manage Member Request'}
//         },
//         {
//           path : 'manage-members',component : MemberRequestComponent, data :{title : 'Manage members of ABC'}
//         },
//         {
//           path : 'manage-master-metadata',component : ManageMasterMetadataComponent, data : {title : 'Manage Master metadata for ABC'}
//         },
//         {
//           path : 'workspace-info',component : MemberRequestComponent, data : {title : 'Workspace Information'}
//         }
//       ]
//     }
//   ] },



  {
    path: '', component: LandingPageComponent, children: [
      {
        path: '', redirectTo: '/sign-in', pathMatch: 'full'
      }
      , {
        path: 'sign-in', component: SigninFormComponent
      }, {
        path: 'forgot-password', component: ForgotpasswordFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
