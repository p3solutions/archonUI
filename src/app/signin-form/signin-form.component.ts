import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Signin } from '../signin';
import { SigninFormService } from './signin-form.service';
import { ErrorObject } from '../error-object';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signin: Signin;
  signInForm: FormGroup;
  responseData: any;
  errorObject: ErrorObject;

  constructor(
    private signinService: SigninFormService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signInForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSignIn() {
    this.signin = this.signInForm.value;
    this.signinService.signIn(this.signin).subscribe(
      data => {
        this.responseData = data;
        // this.authenticationService.authenticateHelper(this.responseData.data._x);
        console.log(data);
        this.router.navigate(['/workspace']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorObject = new ErrorObject;
          this.errorObject.message = err.error.message;
          this.errorObject.show = !err.error.success;
          console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
        }
      }
    );
  }
}
