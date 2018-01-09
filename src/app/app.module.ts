import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InMemoryDataService } from './in-memory-data.service';
import { InfoService } from './info.service';
import { SigninFormService } from './signin-form/signin-form.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthModule } from './/auth.module';
import { SignupFormService } from './signup-form/signup-form.service';
import { ForgotpasswordFormService } from './forgotpassword-form/forgotpassword-form.service';
import { AuthenticationService } from './authentication/authentication.service';
import { WorkspaceHeaderComponent } from './workspace-header/workspace-header.component';
import { WorkspaceHeaderInfoComponent } from './workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from './workspace-mgmt-panel/workspace-mgmt-panel.component';
import { UserWorkspaceService } from './user-workspace.service';
import { WorkspaceDashboardComponent } from './workspace-dashboard/workspace-dashboard.component';
import { NoWorkspaceComponent } from './no-workspace/no-workspace.component';
import { WorkspaceInfoComponent } from './workspace-info/workspace-info.component';
import { WorkspaceinfoService } from './workspaceinfo.service';
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import { ManageMembersService } from './manage-members.service';
import { DataTablesModule } from 'angular-datatables';
import { MemberRequestComponent } from './member-request/member-request.component';
import { MemberRequestService } from './member-request.service';
import { ManageMasterMetadataService } from './manage-master-metadata.service';
import { WorkspacePanelComponent } from './workspace-panel/workspace-panel.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { EnterNewpasswordComponent } from './enter-newpassword/enter-newpassword.component';
import { EnterNewpasswordService } from './enter-newpassword/enter-newpassword.service';
import { EqualValidator } from './enter-newpassword/equal-validator.directive';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { ManageMasterMetadataComponent } from './manage-master-metadata/manage-master-metadata.component';
import { WorkspaceServicesComponent } from './workspace-services/workspace-services.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserinfoService } from './userinfo.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageUserRolesService } from './manage-user-roles/manage-user-roles.service';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LandingPageComponent,
        WorkspaceLandingPageComponent,
        SigninFormComponent,
        ForgotpasswordFormComponent,
        WorkspaceHeaderComponent,
        WorkspaceHeaderInfoComponent,
        WorkspaceMgmtPanelComponent,
        WorkspaceDashboardComponent,
        NoWorkspaceComponent,
        WorkspaceInfoComponent,
        HeaderTabComponent,
        ManageMembersComponent,
        MemberRequestComponent,
        WorkspacePanelComponent,
        HeaderPanelComponent,
        HeaderPanelComponent,
        ManageMasterMetadataComponent,
        WorkspaceServicesComponent,
        SignupFormComponent,
        EnterNewpasswordComponent,
        EqualValidator,
        ManagementPanelComponent,
        ManageUserRolesComponent,
        UserProfileComponent,
        EditProfileComponent,
        ChangePasswordComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        // HttpClientInMemoryWebApiModule.forRoot(
        //   InMemoryDataService,
        //   { dataEncapsulation: false }
        // ),
        AppRoutingModule,
        AuthModule,
        DataTablesModule,
        ReactiveFormsModule,
        MatTableModule,
        FormsModule
    ],
    providers: [
        JwtHelper,
        InMemoryDataService,
        InfoService,
        SigninFormService,
        SignupFormService,
        ForgotpasswordFormService,
        AuthenticationService,
        UserWorkspaceService,
        WorkspaceinfoService,
        ManageMembersService,
        MemberRequestService,
        ManageMasterMetadataService,
        EnterNewpasswordService,
        ManageUserRolesService,
        UserinfoService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
