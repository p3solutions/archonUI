import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUp } from '../sign-up';
import { SignupFormService } from './signup-form.service';
import { ErrorObject } from '../error-object';
import { AuthenticationService } from '../authentication/authentication.service';
import { ConfirmPasswordValidator, PasswordValidator } from './confirm-password-validator';
import { response } from '../table-list/responemmr';
import { NgOnChangesFeature } from '@angular/core/src/render3';

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
  message = 'User Successfully Registered. Re-directing to Sign-In Page.';
  successMessage = false;
  thisComponent = this;
  showHint = true;

  passwordNotMatch = false;

  constructor(
    private signupService: SignupFormService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createSignUpForm();
    this.signUpForm.get('password').valueChanges.subscribe(response1 => {
      if (this.signUpForm.get('password').valid) {
        this.signUpForm.get('confirmPassword').enable();
      } else {
        this.signUpForm.get('confirmPassword').disable();
        this.signUpForm.controls['confirmPassword'].setValue('');
        this.passwordNotMatch = false;
      }
    });
    this.signUpForm.get('password').valueChanges.subscribe(response1 => {
      if (this.signUpForm.get('password').invalid) {
        this.showHint = false;
      } else {
        this.showHint = true;
      }
    });
    // setTimeout(() => this.enableSignUp(), 3000);
  }
  createSignUpForm() {
    this.signUpForm = this.fb.group({
      userId: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, PasswordValidator.strong,
      Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, {
        validator: ConfirmPasswordValidator.MatchPassword
      });
    this.signUpForm.get('confirmPassword').disable();
  }

  onSignUp() {
    this.inProgress = true;
    this.errorObject = new ErrorObject;
    this.errorObject.show = false;
    this.successMessage = false;
    this.signup = this.signUpForm.value;
    this.signupService.signUp(this.signup).subscribe(
      data => {
        this.responseData = data;
        if (this.responseData.httpStatus === 200) {
          this.inProgress = false;
          this.successMessage = true;
          setTimeout(() => this.thisComponent.router.navigate(['/sign-in']), 3000);
        }
        // this.authenticationService.authenticateHelper(this.responseData.data._x);
      },
      (err: HttpErrorResponse) => {
        this.inProgress = false;
        if (err.error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.errorObject.message = err.error.message;
          this.errorObject.show = true;
        }
        // else {
        //   // The backend returned an unsuccessful response code.
        //   // The response body may contain clues as to what went wrong,
        //   const stringToSplit = err.error.errors[0].codes;
        //   const errMsg = stringToSplit[1];
        //   this.errorObject.message = errMsg;
        //   this.errorObject.show = true;
        //   this.msg = err.status;
        // }
      }
    );
  }



  // enableSignUp() {
  //   if (this.signUpForm.value.emailAddress && this.signUpForm.value.password && this.signUpForm.value.name) {
  //     this.enableSignUpBtn = true;
  //   } else {
  //     this.enableSignUpBtn = false;
  //   }
  // }

  onKeyPressOfConfirmPassword() {
    if (this.signUpForm.get('confirmPassword').value !== '') {
      if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmPassword').value) {
        this.passwordNotMatch = true;
      } else {
        this.passwordNotMatch = false;
      }
    } else {
      this.passwordNotMatch = false;
    }
  }
}

