import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignIn } from '../sign-in';
import { SigninFormService } from './signin-form.service';
import { ErrorObject } from '../error-object';

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
  recaptchaModel = '';
  count = 0;

  constructor(
    private signinService: SigninFormService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
    setTimeout(() => this.enableSignIn(), 3000);
  }

  createForm() {
    this.signInForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
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
        this.count = this.count + 1;
        this.inProgress = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorObject = new ErrorObject;
          this.errorObject.message = err.error.message;
          this.errorObject.show = !err.error.success;
        }
      }
    );
  }
  closeErrorMsg() {
    this.errorObject = null;
  }
  enableSignIn() {
    if (this.signInForm.value.userId && this.signInForm.value.password && this.count <= 3) {
      this.enableSignInBtn = true;
    } else if (this.signInForm.value.userId && this.signInForm.value.password && this.recaptchaModel !== '' && this.count > 3) {
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

  resolved(captchaResponse: string) {
    this.recaptchaModel = captchaResponse;
    this.enableSignIn();
}
}
