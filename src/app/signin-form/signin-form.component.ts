import { Component, OnInit } from '@angular/core';
import { Signin } from '../signin';
import { SignInService } from '../sign-in.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signin = new Signin('', '');
  constructor(
    private signinService: SignInService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSignIn() {
    console.log(JSON.stringify(this.signin));
    this.signinService.signIn(this.signin);
    this.router.navigate(['/workspace']);
  }

}
