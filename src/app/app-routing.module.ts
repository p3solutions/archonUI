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
import { WorkspaceServicesComponent } from './workspace-services/workspace-services.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { EnterNewpasswordComponent } from './enter-newpassword/enter-newpassword.component';
import { NewPasswordSetter } from './enter-newpassword/newpasswordsetter';
import { componentFactoryName } from '@angular/compiler';

const routes: Routes = [
  {
    path: 'workspace', component: WorkspaceLandingPageComponent, children: [
      {
        path: 'no-workspace', component: NoWorkspaceComponent
      },
      {
        path: 'workspace-dashboard', component: WorkspaceDashboardComponent, children: [
          {
            path: '', redirectTo: 'workspace-services', pathMatch: 'full'
          },
          {
            path: 'workspace-services', component: WorkspaceServicesComponent
          },
          {
            path: 'workspace-info', component: WorkspaceInfoComponent
          },
          {
            path: 'member-request', component: MemberRequestComponent
          },
          {
            path: 'manage-members', component: ManageMembersComponent
          },
          {
            path: 'manage-master-metadata', component: ManageMasterMetadataComponent
          }
        ]
      },
    ]
  },
  {
    path: '', component: LandingPageComponent, children: [
      {
        path: '', redirectTo: '/sign-in', pathMatch: 'full'
      }, {
        path: 'sign-up', component: SignupFormComponent,
      }, {
        path: 'sign-in', component: SigninFormComponent
      }, {
        path: 'forgot-password', component: ForgotpasswordFormComponent,
      }, {
        path: 'password-reset', component: EnterNewpasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
