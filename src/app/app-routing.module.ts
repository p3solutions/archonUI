import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { Component } from '@angular/core/src/metadata/directives';

import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { WorkspaceInfoComponent } from './workspace-info/workspace-info.component';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { WorkspacePanelComponent } from './workspace-panel/workspace-panel.component';
import { MemberRequestComponent } from './member-request/member-request.component';
import { NoWorkspaceComponent } from './no-workspace/no-workspace.component';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import { EnterNewpasswordComponent } from './enter-newpassword/enter-newpassword.component';
import { NewPasswordSetter } from './enter-newpassword/new-password-setter';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { ManageMasterMetadataComponent } from './manage-master-metadata/manage-master-metadata.component';
import { WorkspaceServicesComponent } from './workspace-services/workspace-services.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';

const routes: Routes = [
  {
    path: 'workspace', component: WorkspaceLandingPageComponent, children: [
      {
        path: 'no-workspace', component: NoWorkspaceComponent
      }, {
        path: 'workspace-list', component: WorkspaceListComponent
      }, {
        path: 'management-panel', component: ManagementPanelComponent
      }, {
        path: 'manage-user-roles', component: ManageUserRolesComponent
      }, {
        path: 'workspace-info/:id', component: WorkspaceInfoComponent
      }, {
        path: 'workspace-dashboard', component: WorkspaceDashboardComponent, children: [
          {
            path: '', redirectTo: 'workspace-services', pathMatch: 'full'
          },
          {
            path: 'workspace-services', component: WorkspaceServicesComponent
          }, {
            path: 'workspace-info/:id', component: WorkspaceInfoComponent
          }, {
            path: 'member-request/:id', component: MemberRequestComponent
          }, {
            path: 'manage-members/:id', component: ManageMembersComponent
          }, {
            path: 'manage-master-metadata/:id', component: ManageMasterMetadataComponent
          }]
      }]
  },
  {
    path: '', component: LandingPageComponent, children: [
      {
        path: '', redirectTo: '/sign-in', pathMatch: 'full'
      }, {
        path: 'sign-in', component: SigninFormComponent
      }, {
        path: 'forgot-password', component: ForgotpasswordFormComponent
      }, {
        path: 'password-reset', component: EnterNewpasswordComponent
      }, {
        path: 'sign-up', component: SignupFormComponent
      }]
  }, {
    path: 'manage-user-roles', component: ManageUserRolesComponent
  }, {
    path: 'user-profile', component: UserProfileComponent, children: [
      {
        path: 'edit-profile', component: EditProfileComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
