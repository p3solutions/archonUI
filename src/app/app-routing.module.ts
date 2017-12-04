import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceLandingPageComponent } from './workspace-landing-page/workspace-landing-page.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ForgotpasswordFormComponent } from './forgotpassword-form/forgotpassword-form.component';

const routes: Routes = [
  { path: 'workspace', component: WorkspaceLandingPageComponent },
  {
    path: '', component: LandingPageComponent, children: [
      {
        path: '', redirectTo: '/sign-in', pathMatch: 'full'
      }
      , {
        path: 'sign-in', component: SigninFormComponent
      }, {
        path: 'forgot-password', component: ForgotpasswordFormComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
