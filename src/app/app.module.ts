import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InMemoryDataService } from './in-memory-data.service';
import { InfoService } from './info.service';
import { SigninFormService } from './signin-form.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { ReactiveFormsModule} from '@angular/forms';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';
import { AppRoutingModule } from './/app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    SigninFormComponent,
    WorkspaceLandingPageComponent,
    SigninFormComponent,
    ForgotpasswordFormComponent,
  ],
  imports: [
    BrowserModule,FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule,HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ), AppRoutingModule
  ],
  providers: [InMemoryDataService, InfoService, SigninFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }