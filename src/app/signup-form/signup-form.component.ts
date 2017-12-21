import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Signup } from '../signup';
import { SignupFormService } from './signup-form.service';
import { ErrorObject } from '../error-object';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signup: Signup;
  signUpForm: FormGroup;

  constructor(
    private signupService: SignupFormService,
    private authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createSignUpForm();
  }
  createSignUpForm() {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [Validators.required])
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
      confirmPassword: new FormControl('', [Validators.required])
    });
  // isPasswordMatch() {

  // }
  //   onSignUp() {

  //   }
}
