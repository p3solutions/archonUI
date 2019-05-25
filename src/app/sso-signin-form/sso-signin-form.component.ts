import { Component, OnInit } from '@angular/core';
import { SsoSigninService } from './sso-signin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sso-signin-form',
  templateUrl: './sso-signin-form.component.html',
  styleUrls: ['./sso-signin-form.component.css']
})
export class SsoSigninFormComponent implements OnInit {

  SignInURL;

  constructor(private ssoService: SsoSigninService, private route: Router) { }

  ngOnInit() {
    this.ssoService.signIn().subscribe((result: any) => {
      this.SignInURL = result.data.samlloginclient;
    });
  }

  signInto() {
   this.ssoService.signInredirect(this.SignInURL);
  }

}
