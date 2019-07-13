import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUp } from '../sign-up';
import { SignupFormService } from './signup-form.service';
import { ErrorObject } from '../error-object';
import { AuthenticationService } from '../authentication/authentication.service';
import { ConfirmPasswordValidator, PasswordValidator } from './confirm-password-validator';

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
  @ViewChild('formDirective') private formDirective: NgForm;
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
      this.checkForValidPassword();
      this.onKeyPressOfConfirmPassword();
    });
    this.signUpForm.get('password').valueChanges.subscribe(response1 => {
      this.checkForValidPassword();
      this.onKeyPressOfConfirmPassword();
    });
  }

  checkForValidPassword() {
    if (this.signUpForm.get('password').value !== '') {
      if (this.signUpForm.get('password').invalid) {
        this.showHint = false;
      } else {
        this.showHint = true;
      }
    } else {
      this.showHint = true;
    }
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

  onSignUp(form: FormGroup) {
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
          this.formDirective.resetForm();
          this.successMessage = true;
          setTimeout(() => this.thisComponent.router.navigate(['/sign-in']), 3000);
        }
      },
      (err: HttpErrorResponse) => {
        this.inProgress = false;
        if (err.error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.errorObject.message = err.error.message;
          this.errorObject.show = true;
        }
      }
    );
  }

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

