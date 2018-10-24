import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUp } from '../sign-up';
import { SignupFormService } from './signup-form.service';
import { ErrorObject } from '../error-object';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signup: SignUp;
  signUpForm: FormGroup;
  responseData: any;
  errorObject: ErrorObject;
  enableSignUpBtn = true;
  inProgress = false;
  msg = 100;

  constructor(
    private signupService: SignupFormService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createSignUpForm();
    setTimeout(this.enableSignUp(), 3000);
  }
  createSignUpForm() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      // confirmPassword: new FormControl('', [Validators.required])
    });
    // console.log('aloksignup', this.signUpForm, this.signUpForm.value);
  }

  onSignUp() {
    this.inProgress = true;
    this.signup = this.signUpForm.value;
    this.signupService.signUp(this.signup).subscribe(
      data => {
        this.responseData = data;
        // this.authenticationService.authenticateHelper(this.responseData.data._x);
        console.log('data', this.responseData);
        this.router.navigate(['/sign-in']);
        this.msg = 200;
      },
      (err: HttpErrorResponse) => {
        this.inProgress = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
          // this.msg = err.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorObject = new ErrorObject;
          this.errorObject.message = err.error.errorMessage;
          this.errorObject.show = !err.error.success;
          this.msg = err.status;
          console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
        }
      }
    );
  }
  enableSignUp() {
    if (this.signUpForm.value.emailAddress && this.signUpForm.value.password && this.signUpForm.value.name) {
      this.enableSignUpBtn = true;
    } else {
      this.enableSignUpBtn = false;
    }
  }
}

