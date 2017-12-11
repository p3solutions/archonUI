import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InMemoryDataService } from './in-memory-data.service';
import { InfoService } from './info.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { AppRoutingModule } from './/app-routing.module';
import { SignInService } from './sign-in.service';
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
    BrowserModule, FormsModule, HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ), AppRoutingModule
  ],
  providers: [InMemoryDataService, InfoService, SignInService, UserWorkspaceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
