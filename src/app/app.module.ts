import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule, MatSortModule, MatInputModule } from '@angular/material';
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
import { ManageUserRolesComponent, CreateUserInviteDialogComponent } from './manage-user-roles/manage-user-roles.component';
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
import { NgxPaginationModule } from 'ngx-pagination';
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
import { ErtLandingPageComponent } from './ert-landing-page/ert-landing-page.component';
import { ErtCharReplacementComponent } from './ert-char-replacement/ert-char-replacement.component';
import { ErtJobsConfigComponent } from './ert-jobs-config/ert-jobs-config.component';
import { ErtTableComponent } from './ert-table/ert-table.component';
import { ErtExtractDigestComponent } from './ert-extract-digest/ert-extract-digest.component';
import { ErtTableColumnConfigComponent } from './ert-table-column-config/ert-table-column-config.component';
import { ErtJobsComponent } from './ert-jobs/ert-jobs.component';
import { ErtDatarecordConfigComponent } from './ert-datarecord-config/ert-datarecord-config.component';
import { ErtSipConfigComponent } from './ert-sip-config/ert-sip-config.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MaterialModule } from './material-module';
import { AdhocLandingPageComponent } from './adhoc-landing-page/adhoc-landing-page.component';
import { AdhocHeaderComponent } from './adhoc-header/adhoc-header.component';
import {
    AdhocAppScreenListComponent, CreateScreenDialogComponent,
    CreateAppDialogComponent
} from './adhoc-app-screen-list/adhoc-app-screen-list.component';
import { AdhocTableSelectionComponent } from './adhoc-table-selection/adhoc-table-selection.component';
import { AdhocSearchCriteriaComponent } from './adhoc-search-criteria/adhoc-search-criteria.component';
import { AdhocSearchScreenComponent } from './adhoc-search-screen/adhoc-search-screen.component';
import { AdhocEditSearchScreenPopupComponent } from './adhoc-edit-search-screen-popup/adhoc-edit-search-screen-popup.component';
import { AdhocScreenService } from './adhoc-search-criteria/adhoc-screen.service';
import { AdhocSearchPanelComponent } from './adhoc-search-panel/adhoc-search-panel.component';
import { MatSelectInfiniteScrollModule } from 'ng-mat-select-infinite-scroll';
import { AdhocEditPanelColumnPopupComponent } from './adhoc-edit-panel-column-popup/adhoc-edit-panel-column-popup.component';
import { ScheduleJobComponent } from './schedule-job/schedule-job.component';
import { BsDatepickerModule, TimepickerModule, ModalModule } from 'ngx-bootstrap';
import { SchedulemonitoringComponent } from './schedulemonitoring/schedulemonitoring.component';
import { AuditingComponent } from './auditing/auditing.component';
import { ScheduleMonitoringService } from './schedulemonitoring/schedule-monitoring.service';
import { AuditService } from './auditing/audit.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SmtpConfigurationComponent } from './smtp-configuration/smtp-configuration.component';
import { ScheduleJobService } from './schedule-job/schedule-job.service';
import { SsoSigninFormComponent } from './sso-signin-form/sso-signin-form.component';
import { RoleGroupConfigurationComponent } from './role-group-configuration/role-group-configuration.component';
import { RedirectComponent } from './redirect/redirect.component';
import { EnvironmentService } from './environment/environment.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CookieService } from 'ngx-cookie-service';
import { CreateWorkspacePageComponent } from './create-workspace-page/create-workspace-page.component';
import { CreateDatabasePageComponent } from './create-database-page/create-database-page.component';
import { ScrollableDirective } from './scrollable.directive';
import { NonspecialcharDirective } from './nonspecialchar.directive';
import { OnlyuppercaseallowDirective } from './ert-table/onlyuppercaseallow.directive';
import { ChangeOverflowDirective } from './change-overflow.directive';
import { ActivityLandingPageComponent } from './activity-landing-page/activity-landing-page.component';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { AceEditorModule } from 'ng2-ace-editor';
import { NoDblClickDirective } from './no-dbl-click.directive';
import { ErtCloneViewComponent } from './ert-clone-view/ert-clone-view.component';
import { PreventcopyDirective } from './preventcopy.directive';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FilteroperationPipe } from './ert-table/filteroperation.pipe';
import { SearchErtTablePipe } from './ert-landing-page/search-ert-table.pipe';
import { SessionTimeoutComponent } from './session-timeout/session-timeout.component';
import { NotWildCharDirective } from './not-wild-char.directive';

export function tokenGetter() {
    return localStorage.getItem('accessToken');
}
const appInitializerFunction = (environment: EnvironmentService) => {
    return () => {
        return environment.loadAppConfig();
    };
};

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
                ErtJobsComponent,
                ScheduleJobComponent,
                SchedulemonitoringComponent,
                AuditingComponent,
                ErtDatarecordConfigComponent,
                ErtSipConfigComponent,
                AdhocLandingPageComponent,
                AdhocHeaderComponent,
                AdhocAppScreenListComponent,
                CreateAppDialogComponent,
                CreateScreenDialogComponent,
                AdhocTableSelectionComponent,
                AdhocSearchCriteriaComponent,
                AdhocSearchScreenComponent,
                AdhocEditSearchScreenPopupComponent,
                AdhocSearchPanelComponent,
                AdhocEditPanelColumnPopupComponent,
                CreateUserInviteDialogComponent,
                ConfigurationComponent,
                SmtpConfigurationComponent,
                SsoSigninFormComponent,
                RoleGroupConfigurationComponent,
                RedirectComponent,
                CreateWorkspacePageComponent,
                CreateDatabasePageComponent,
                ScrollableDirective,
                NonspecialcharDirective,
                OnlyuppercaseallowDirective,
                ChangeOverflowDirective,
                ActivityLandingPageComponent,
                NoDblClickDirective,
                ErtCloneViewComponent,
                PreventcopyDirective,
                ResetPasswordComponent,
                FilteroperationPipe,
                SearchErtTablePipe,
                SessionTimeoutComponent,
                NotWildCharDirective
        ],
        imports: [
                JwtModule.forRoot({
                        config: {
                                tokenGetter: tokenGetter
                        }
                }),
                BrowserModule,
                FormsModule,
                BsDatepickerModule.forRoot(), TimepickerModule.forRoot(),
                // HttpClientInMemoryWebApiModule.forRoot(
                //     InMemoryDataService,
                //     { dataEncapsulation: false }
                // ),
                ReactiveFormsModule,
                DataTablesModule,
                MatTableModule,
                AppRoutingModule,
                HttpClientModule,
                NgxPaginationModule,
                NgxBootstrapSliderModule,
                BrowserAnimationsModule,
                MatButtonModule,
                MatCheckboxModule,
                MaterialModule,
                MatSelectInfiniteScrollModule,
                FlexLayoutModule,
                NgxSpinnerModule, MatInputModule, MatSortModule,
                NgxTrimDirectiveModule,
                AceEditorModule
        ],
        providers: [
                  EnvironmentService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFunction,
            multi: true,
            deps: [EnvironmentService]
        },
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
                StoredProcViewService,
                AdhocScreenService,
                ScheduleMonitoringService,
                AuditService,
                ScheduleJobService, CookieService
        ],
        bootstrap: [AppComponent],
        entryComponents: [NewWorkspaceComponent, AddDatabaseWizardComponent, StoredProcViewComponent
                , CreateScreenDialogComponent, CreateAppDialogComponent, CreateUserInviteDialogComponent]
})
export class AppModule { }
