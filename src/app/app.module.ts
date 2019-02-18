import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InfoService } from './info.service';
import { SigninFormService } from './signin-form/signin-form.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { AppRoutingModule } from './/app-routing.module';
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
import { HeaderTabComponent } from './header-tab/header-tab.component';
import { ManageMembersComponent } from './manage-members/manage-members.component';
import { ManageMembersService } from './manage-members/manage-members.service';
import { DataTablesModule } from 'angular-datatables';
import { MemberRequestComponent } from './member-request/member-request.component';
import { MemberRequestService } from './member-request/member-request.service';
import { ManageMasterMetadataService } from './manage-master-metadata/manage-master-metadata.service';
import { WorkspacePanelComponent } from './workspace-panel/workspace-panel.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';
import { EnterNewpasswordComponent } from './enter-newpassword/enter-newpassword.component';
import { EnterNewpasswordService } from './enter-newpassword/enter-newpassword.service';
import { EqualValidator } from './enter-newpassword/equal-validator.directive';
import { ManagementPanelComponent } from './management-panel/management-panel.component';
import { ManageMasterMetadataComponent } from './manage-master-metadata/manage-master-metadata.component';
import { WorkspaceServicesComponent } from './workspace-services/workspace-services.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { WorkspaceListComponent } from './workspace-list/workspace-list.component';
import { WorkspaceListService } from './workspace-list/workspace-list.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserinfoService } from './userinfo.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ManageUserRolesService } from './manage-user-roles/manage-user-roles.service';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';
import { ChangeUserRoleComponent } from './change-user-role/change-user-role.component';
import { ChangeUserRoleService } from './change-user-role/change-user-role.service';
import { WorkspaceInfoService } from './workspace-info/workspace-info.service';
import { WorkspaceLandingPageService } from './workspace-landing-page/workspace-landing-page.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordService } from './change-password/change-password.service';
import { ManageMemberPrivilegesComponent } from './manage-member-privileges/manage-member-privileges.component';
import { WorkspaceDashboardService } from './workspace-dashboard/workspace-dashboard.service';
import { WorkspaceServicesService } from './workspace-services/workspace-services.service';
import { NewWorkspaceComponent } from './new-workspace/new-workspace.component';
import { DynamicLoaderService } from './dynamic-loader.service';
import { AddMembersComponent } from './add-members/add-members.component';
import { AddMembersService } from './add-members/add-members.service';
import { DatabaseListService } from './database-list/database-list.service';
import { DatabaseListComponent } from './database-list/database-list.component';
import { AddDatabaseWizardComponent } from './add-database-wizard/add-database-wizard.component';
import { MetalyzerHeaderComponent } from './metalyzer-header/metalyzer-header.component';
import { MetalyzerComponent } from './metalyzer/metalyzer.component';
import { MetalyzerConfigurationComponent } from './metalyzer-configuration/metalyzer-configuration.component';
import { TableListComponent } from './table-list/table-list.component';
import { WorkspaceHeaderService } from './workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header/metalyzer-header.service';
import { TableListService } from './table-list/table-list.service';
import { SearchPipe } from './search.pipe';
import { CommonUtilityService } from './common-utility.service';
import { RolePipe } from './role.pipe';
import { StatusService } from './status-screen/status.service';
import { StatusScreenComponent } from './status-screen/status-screen.component';
import { KeysPipe } from './keys.pipe';
import { ReverseArrayPipe } from './reverse.pipe';
import { EditRelationshipInfoComponent } from './edit-relationship-info/edit-relationship-info.component';
import { ArchonHttpInterceptor } from './archon-http-interceptor';
import { UserProfileService } from './user-profile/user-profile.service';
import { RelationshipInfoComponent } from './relationship-info/relationship-info.component';
import { RelationshipListComponent } from './relationship-list/relationship-list.component';
import { EditRelationshipInfoService } from './edit-relationship-info/edit-relationship-info.service';
import { AddDirectJoinComponent } from './add-direct-join/add-direct-join.component';
import { AddDirectJoinService } from './add-direct-join/add-direct-join.service';
import { SecondaryColumnPipe } from './secondary-column.pipe';
import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen/data-analyzer-result-screen.component';
import { KeyvaluePipe } from './keyvalue.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { ManagementLandingPageComponent } from './management-landing-page/management-landing-page.component';
import { DbExtractorComponent } from './db-extractor/db-extractor.component';
import { DbExtractorStepOneComponent } from './db-extractor-step-one/db-extractor-step-one.component';
import { DbExtractorStepTwoComponent } from './db-extractor-step-two/db-extractor-step-two.component';
import { DbExtractorLastStepComponent } from './db-extractor-last-step/db-extractor-last-step.component';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { DbExtractorService } from './db-extractor/db-extractor.service';
import { DbExtractorExecQueryComponent } from './db-extractor-exec-query/db-extractor-exec-query.component';
import { StoredProcViewComponent } from './stored-proc-view/stored-proc-view.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { StoredProcViewService } from './stored-proc-view/stored-proc-view.service';
import {ErtLandingPageComponent} from './ert-landing-page/ert-landing-page.component';
import { ErtCharReplacementComponent } from './ert-char-replacement/ert-char-replacement.component';
import { ErtJobsConfigComponent } from './ert-jobs-config/ert-jobs-config.component';
import { ErtTableComponent } from './ert-table/ert-table.component';
import { ErtExtractDigestComponent } from './ert-extract-digest/ert-extract-digest.component';
import { ErtTableColumnConfigComponent } from './ert-table-column-config/ert-table-column-config.component';
import { ErtJobsComponent } from './ert-jobs/ert-jobs.component';
export function tokenGetter() {
        return localStorage.getItem('accessToken');
}
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
                ChangeUserRoleComponent,
                UserProfileComponent,
                EditProfileComponent,
                WorkspaceListComponent,
                ChangePasswordComponent,
                ManageMemberPrivilegesComponent,
                NewWorkspaceComponent,
                AddMembersComponent,
                DatabaseListComponent,
                AddDatabaseWizardComponent,
                MetalyzerHeaderComponent,
                MetalyzerComponent,
                MetalyzerConfigurationComponent,
                TableListComponent,
                SearchPipe,
                StatusScreenComponent,
                KeysPipe,
                ReverseArrayPipe,
                SearchPipe,
                RolePipe,
                RelationshipInfoComponent,
                RelationshipListComponent,
                EditRelationshipInfoComponent,
                AddDirectJoinComponent,
                SecondaryColumnPipe,
                DataAnalyzerResultScreenComponent,
                KeyvaluePipe,
                ManagementLandingPageComponent,
                DbExtractorComponent,
                DbExtractorStepOneComponent,
                DbExtractorStepTwoComponent,
                DbExtractorLastStepComponent,
                DbExtractorExecQueryComponent,
                StoredProcViewComponent,
                ErtLandingPageComponent,
                ErtCharReplacementComponent,
                ErtJobsConfigComponent,
                ErtTableComponent,
                ErtExtractDigestComponent,
                ErtTableColumnConfigComponent,
                ErtJobsComponent
        ],
        imports: [
                JwtModule.forRoot({
                        config: {
                                tokenGetter: tokenGetter
                        }
                }),
                BrowserModule,
                FormsModule,
                // HttpClientInMemoryWebApiModule.forRoot(
                //     InMemoryDataService,
                //     { dataEncapsulation: false }
                // ),
                FormsModule,
                ReactiveFormsModule,
                DataTablesModule,
                MatTableModule,
                AppRoutingModule,
                HttpClientModule,
                NgxPaginationModule,
                NgxBootstrapSliderModule
        ],
        providers: [
                JwtHelperService,
                InfoService,
                SigninFormService,
                SignupFormService,
                ForgotpasswordFormService,
                AuthenticationService,
                AuthenticationGuard,
                UserWorkspaceService,
                ManageMembersService,
                MemberRequestService,
                ManageMasterMetadataService,
                EnterNewpasswordService,
                ManageUserRolesService,
                ChangeUserRoleService,
                UserinfoService,
                WorkspaceListService,
                WorkspaceInfoService,
                WorkspaceLandingPageService,
                ChangePasswordService,
                WorkspaceDashboardService,
                WorkspaceServicesService,
                DynamicLoaderService,
                AddMembersService,
                DatabaseListService,
                WorkspaceHeaderService,
                MetalyzerHeaderService,
                TableListService,
                StatusService,
                CommonUtilityService,
                {
                        provide: HTTP_INTERCEPTORS,
                        useClass: ArchonHttpInterceptor,
                        multi: true
                },
                TableListService,
                UserProfileService,
                EditRelationshipInfoService,
                AddDirectJoinService,
                DbExtractorService,
                StoredProcViewService
        ],
        bootstrap: [AppComponent],
        entryComponents: [NewWorkspaceComponent, AddDatabaseWizardComponent, StoredProcViewComponent]
})
export class AppModule { }
