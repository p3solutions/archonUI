import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignIn } from '../sign-in';
import { SigninFormService } from './signin-form.service';
import { ErrorObject } from '../error-object';
import { AuthenticationService } from '../authentication/authentication.service';
import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signin: SignIn;
  signInForm: FormGroup;
  responseData: any;
  errorObject: ErrorObject;
  inProgress = false;
  enableSignInBtn = false;
  workspaceUrl = '/workspace';
  constructor(
    private signinService: SigninFormService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
    setTimeout(() => this.enableSignIn(), 3000);
  }

  createForm() {
    this.signInForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSignIn() {
    this.inProgress = true;
    this.signin = this.signInForm.value;
    this.signinService.signIn(this.signin).subscribe(
      data => {
        this.responseData = data;
        // this.authenticationService.authenticateHelper(this.responseData.data._x);
        localStorage.setItem('accessToken', data.data.accessToken);
        // localStorage.setItem('refreshToken', data.data.refreshToken);
        this.router.navigateByUrl(this.workspaceUrl);
        // this.handleRedirection();
      },
      (err: HttpErrorResponse) => {
        this.inProgress = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorObject = new ErrorObject;
          this.errorObject.message = err.error.errorMessage;
          this.errorObject.show = !err.error.success;
          }
      }
    );
  }
  closeErrorMsg() {
    this.errorObject = null;
  }
  enableSignIn() {
    if (this.signInForm.value.emailAddress && this.signInForm.value.password) {
      this.enableSignInBtn = true;
    } else {
      this.enableSignInBtn = false;
    }
  }
  handleRedirection() {
    const sessionTimedOutUrl = localStorage.getItem('sessionTimedOutUrl');
    const redirectUrl = sessionTimedOutUrl ? sessionTimedOutUrl : this.workspaceUrl;
    if (redirectUrl === sessionTimedOutUrl) {
      localStorage.removeItem('sessionStorage');
    }
    this.router.navigateByUrl(redirectUrl);
  }
}
