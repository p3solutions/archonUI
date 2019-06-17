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
import { DatabaseListComponent } from './database-list/database-list.component';
import { MetalyzerHeaderComponent } from './metalyzer-header/metalyzer-header.component';
import { MetalyzerComponent } from './metalyzer/metalyzer.component';
import { MetalyzerConfigurationComponent } from './metalyzer-configuration/metalyzer-configuration.component';
import { TableListComponent } from './table-list/table-list.component';
import { StatusScreenComponent } from './status-screen/status-screen.component';
import { DataAnalyzerResultScreenComponent } from './data-analyzer-result-screen/data-analyzer-result-screen.component';
import { ManagementLandingPageComponent } from './management-landing-page/management-landing-page.component';
import { DbExtractorComponent } from './db-extractor/db-extractor.component';
import { DbExtractorStepOneComponent } from './db-extractor-step-one/db-extractor-step-one.component';
import { DbExtractorStepTwoComponent } from './db-extractor-step-two/db-extractor-step-two.component';
import { DbExtractorLastStepComponent } from './db-extractor-last-step/db-extractor-last-step.component';
import { DbExtractorExecQueryComponent } from './db-extractor-exec-query/db-extractor-exec-query.component';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { ErtLandingPageComponent } from './ert-landing-page/ert-landing-page.component';
import { ErtCharReplacementComponent } from './ert-char-replacement/ert-char-replacement.component';
import { ErtJobsConfigComponent } from './ert-jobs-config/ert-jobs-config.component';
import { ErtTableComponent } from './ert-table/ert-table.component';
import { ErtExtractDigestComponent } from './ert-extract-digest/ert-extract-digest.component';
import { ErtTableColumnConfigComponent } from './ert-table-column-config/ert-table-column-config.component';
import { ErtJobsComponent } from './ert-jobs/ert-jobs.component';
import { SchedulemonitoringComponent } from './schedulemonitoring/schedulemonitoring.component';
import { AuditingComponent } from './auditing/auditing.component';
import { ErtDatarecordConfigComponent } from './ert-datarecord-config/ert-datarecord-config.component';
import { ErtSipConfigComponent } from './ert-sip-config/ert-sip-config.component';
import { AdhocLandingPageComponent } from './adhoc-landing-page/adhoc-landing-page.component';
import { AdhocAppScreenListComponent } from './adhoc-app-screen-list/adhoc-app-screen-list.component';
import { AdhocHeaderComponent } from './adhoc-header/adhoc-header.component';
import { AdhocTableSelectionComponent } from './adhoc-table-selection/adhoc-table-selection.component';
import { AdhocSearchCriteriaComponent } from './adhoc-search-criteria/adhoc-search-criteria.component';
import { AdhocEditSearchScreenPopupComponent } from './adhoc-edit-search-screen-popup/adhoc-edit-search-screen-popup.component';
import { AdhocSearchScreenComponent } from './adhoc-search-screen/adhoc-search-screen.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SmtpConfigurationComponent } from './smtp-configuration/smtp-configuration.component';
import { SsoSigninFormComponent } from './sso-signin-form/sso-signin-form.component';
import { RoleGroupConfigurationComponent } from './role-group-configuration/role-group-configuration.component';
import { CreateWorkspacePageComponent } from './create-workspace-page/create-workspace-page.component';
import { CreateDatabasePageComponent } from './create-database-page/create-database-page.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectGuard } from './redirect/redirect.guard';
import { AddDirectJoinComponent } from './add-direct-join/add-direct-join.component';
import { StoredProcViewComponent } from './stored-proc-view/stored-proc-view.component';
const routes: Routes = [
  {
    path: 'workspace', component: WorkspaceLandingPageComponent, canActivate: [AuthenticationGuard], children: [
      {
        path: '', redirectTo: 'workspace-dashboard', pathMatch: 'prefix'
      },
      {
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
          }, {
            path: 'char-replacement', component: ErtCharReplacementComponent
          }
        ]
      }, {
        path: 'metalyzer/:wsId_Mode', component: MetalyzerComponent, canActivate: [AuthenticationGuard], children: [
          {
            path: 'configuration', component: MetalyzerConfigurationComponent
          }, {
            path: 'analysis', component: TableListComponent, children: [
              {
                path: 'resultant', component: DataAnalyzerResultScreenComponent
              },
              {
                path: 'addjoin', component: AddDirectJoinComponent
              },
              {
                path: 'spview', component: StoredProcViewComponent
              }
            ]
          }
        ]
      }, {
        path: 'db-extractor', component: DbExtractorComponent, canActivate: [AuthenticationGuard], children: [
          {
            path: 'db-extractor-process', component: DbExtractorStepOneComponent
          }, {
            path: 'db-extractor-parameter', component: DbExtractorStepTwoComponent
          }, {
            path: 'db-extractor-summary', component: DbExtractorLastStepComponent
          }
          , {
            path: 'db-extractor-exec-query', component: DbExtractorExecQueryComponent
          }
        ]
      },
      {
        path: 'ert', component: ErtLandingPageComponent, canActivate: [AuthenticationGuard], children: [
          {
            path: '', redirectTo: 'ert-jobs', pathMatch: 'full'
          },
          {
            path: 'ert-jobs', component: ErtJobsComponent
          },
          {
            path: 'ert-table', component: ErtTableComponent
          },
          {
            path: 'ert-table/:ertJobId', component: ErtTableComponent
          },
          {
            path: 'ert-extract-ingest', component: ErtExtractDigestComponent
          },
          {
            path: 'ert-extract-ingest/:ertJobId', component: ErtExtractDigestComponent
          },
          {
            path: 'ert-table-col-config', component: ErtTableColumnConfigComponent
          },
          {
            path: 'ert-table-col-config/:ertJobId', component: ErtTableColumnConfigComponent
          },
          {
            path: 'ert-datarecord-config', component: ErtDatarecordConfigComponent
          },
          {
            path: 'ert-sip-config', component: ErtSipConfigComponent
          }
        ]
      },
      {
        path: 'ert-jobs-config', component: ErtJobsConfigComponent
      },
      {
        path: 'adhoc', component: AdhocLandingPageComponent, canActivate: [AuthenticationGuard], children: [
          {
            path: '', redirectTo: 'app-screen-list', pathMatch: 'full'
          },
          {
            path: 'app-screen-list', component: AdhocAppScreenListComponent
          },
          {
            path: 'screen', component: AdhocHeaderComponent, children: [
              {
                path: '', redirectTo: 'table', pathMatch: 'full'
              },
              {
                path: 'table', component: AdhocTableSelectionComponent
              },
              {
                path: 'search-criteria', component: AdhocSearchCriteriaComponent
              }
            ]
          }
        ]
      }
    ]
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
    path: 'user-profile', component: UserProfileComponent, canActivate: [AuthenticationGuard], children: [
      {
        path: 'edit-profile', component: EditProfileComponent
      }]
  }, {
    path: 'management-landing-page', component: ManagementLandingPageComponent, canActivate: [AuthenticationGuard],
    children: [
      { path: 'management-panel', component: ManagementPanelComponent, pathMatch: 'full' }
      ,
      {
        path: 'database-list', component: DatabaseListComponent
      }, {
        path: 'workspace-list', component: WorkspaceListComponent
      }, {
        path: 'manage-user-roles', component: ManageUserRolesComponent
      }, {
        path: 'configuration', component: ConfigurationComponent, children: [
          {
            path: '', redirectTo: 'smtp-configuration', pathMatch: 'full'
          },
          {
            path: 'smtp-configuration', component: SmtpConfigurationComponent
          },
          {
            path: 'role-group-configuration', component: RoleGroupConfigurationComponent
          }
        ]
      }
    ]
  }, {
    path: 'status', canActivate: [AuthenticationGuard], component: StatusScreenComponent
  },
  {
    path: 'schedule-monitoring', canActivate: [AuthenticationGuard], component: SchedulemonitoringComponent
  },
  {
    path: 'audit', canActivate: [AuthenticationGuard], component: AuditingComponent
  },
  {
    path: 'sso', component: SsoSigninFormComponent
  },
  {
    path: 'landing', canActivate: [RedirectGuard], component: RedirectComponent
  },
  {
    path: 'sign-in', component: LandingPageComponent, children: [
      {
        path: '', component: SigninFormComponent, pathMatch: 'full'
      },
      {
        path: 'forgot-password', component: ForgotpasswordFormComponent
      }, {
        path: 'password-reset', component: EnterNewpasswordComponent
      }, {
        path: 'sign-up', component: SignupFormComponent
      }
    ]
  },
  {
    path: 'create-workspace', component: CreateWorkspacePageComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'create-database', component: CreateDatabasePageComponent, canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
