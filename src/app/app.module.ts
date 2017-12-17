import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InMemoryDataService } from './in-memory-data.service';
import { InfoService } from './info.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { AuthModule } from './/auth.module';
import { DataTablesModule } from 'angular-datatables';
import { SigninFormService } from './signin-form/signin-form.service';
import { ForgotpasswordFormService } from './forgotpassword-form/forgotpassword-form.service';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { WorkspaceHeaderComponent } from './workspace-header/workspace-header.component';
import { WorkspaceHeaderInfoComponent } from './workspace-header-info/workspace-header-info.component';
import { WorkspaceMgmtPanelComponent } from './workspace-mgmt-panel/workspace-mgmt-panel.component';
import { UserWorkspaceService } from './user-workspace.service';

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
    WorkspaceMgmtPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService,
      { dataEncapsulation: false }
    ),
    AppRoutingModule,
    AuthModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  providers: [
    JwtHelper,
    InMemoryDataService,
    InfoService,
    SigninFormService,
    ForgotpasswordFormService,
    AuthenticationService,
    UserWorkspaceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
