import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Forgotpassword } from '../forgotpassword';
import { ForgotpasswordFormService } from './forgotpassword-form.service';
import { ErrorObject } from '../error-object';
import { SuccessObject } from '../success-object';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword-form',
  templateUrl: './forgotpassword-form.component.html',
  styleUrls: ['./forgotpassword-form.component.css']
})
export class ForgotpasswordFormComponent implements OnInit {
  forgotpassword: Forgotpassword;
  forgotPasswordForm: FormGroup;
  errorObject: ErrorObject;
  successObject: SuccessObject;

  constructor(
    private forgotPasswordFormService: ForgotpasswordFormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onForgotPassword() {
    this.forgotpassword = this.forgotPasswordForm.value;
    this.forgotPasswordFormService.forgotPassword(this.forgotpassword).subscribe(
      data => {
        this.successObject = new SuccessObject;
        this.successObject.message = data.message;
        this.successObject.show = data.success;
        this.forgotPasswordForm.reset();
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
          // this.router.navigate(['/forgot-password']);
        }
      }
    );
  }
}
