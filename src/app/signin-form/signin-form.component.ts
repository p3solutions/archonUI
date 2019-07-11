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
  // recaptchaModel = '';
  count = 0;
  code;
  captcha;
  valid;

  constructor(
    private signinService: SigninFormService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
    setTimeout(() => this.enableSignIn(), 3000);
    this.Captcha();
  }

  createForm() {
    this.signInForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      captcha: new FormControl( '', [Validators.required])
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
    this.ValidCaptcha();
    if (this.signInForm.value.userId && this.signInForm.value.password && this.count <= 3) {
      this.enableSignInBtn = true;
    } else if (this.signInForm.value.userId && this.signInForm.value.password && this.valid === true && this.count > 3) {
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

//   resolved(captchaResponse) {
//     console.log(captchaResponse);
//     this.recaptchaModel = captchaResponse;
//     this.enableSignIn();
// }


Captcha() {
  const alpha = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
  'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
  let i, a , b, c , d , e ,f , g;
  for (i = 0; i < 6; i++) {
      a = alpha[Math.floor(Math.random() * alpha.length)];
      b = alpha[Math.floor(Math.random() * alpha.length)];
      c = alpha[Math.floor(Math.random() * alpha.length)];
      d = alpha[Math.floor(Math.random() * alpha.length)];
      e = alpha[Math.floor(Math.random() * alpha.length)];
      f = alpha[Math.floor(Math.random() * alpha.length)];
      g = alpha[Math.floor(Math.random() * alpha.length)];
      }
  let code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' ' + f + ' ' + g;
  // document.getElementById('mainCaptcha').innerHTML = code;
  // (document.getElementById('mainCaptcha')as HTMLInputElement).value = code;
  this.code = code;
    }
ValidCaptcha() {
  const string1 = this.removeSpaces(this.code);
  const string2 = this.removeSpaces(this.signInForm.value.captcha);
  if (string1 === string2) {
         this.valid = true;
  } else {
       this.valid = false;
       }
}

removeSpaces(string) {
  return string.split(' ').join('');
}


}
