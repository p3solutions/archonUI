import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    WorkspaceLandingPageComponent,
    SigninFormComponent,
    ForgotpasswordFormComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [InMemoryDataService, InfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
