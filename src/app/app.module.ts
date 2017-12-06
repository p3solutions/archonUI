import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
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
import { DataTablesModule } from 'angular-datatables';
import { MemberRequestComponent } from './member-request/member-request.component';
import { MemberRequestService } from './member-request.service';
import { WorkspacePanelComponent } from './workspace-panel/workspace-panel.component';
import { HeaderPanelComponent } from './header-panel/header-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    WorkspaceLandingPageComponent,
    SigninFormComponent,
    ForgotpasswordFormComponent,
    MemberRequestComponent,
    WorkspacePanelComponent,
    HeaderPanelComponent
    // MemberRequestComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,MatTableModule,DataTablesModule, HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ), AppRoutingModule
  ],
  providers: [InMemoryDataService, InfoService, SignInService, MemberRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
