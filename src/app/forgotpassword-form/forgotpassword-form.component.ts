import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPassword } from '../forgot-password';
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
  forgotpassword: ForgotPassword;
  forgotPasswordForm: FormGroup;
  errorObject: ErrorObject;
  successObject: SuccessObject;

  constructor(
    private forgotPasswordFormService: ForgotpasswordFormService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isRedirectedFromLink();
    this.createForm();
  }

  createForm() {
    this.forgotPasswordForm = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email])
    });
  }

  onForgotPassword() {
    this.forgotpassword = this.forgotPasswordForm.value;
    setTimeout(() => this.errorObject.show = false, 5000);
    setTimeout(() => this.successObject.show = false, 5000);
    this.forgotPasswordFormService.forgotPassword(this.forgotpassword).subscribe(
      data => {
        this.successObject = new SuccessObject;
        this.successObject.message = data.data;
        this.successObject.show = data.success;
        this.forgotPasswordForm.reset();
      },
      (err: HttpErrorResponse) => {
        if (err.error) {
          this.errorObject = new ErrorObject;
          this.errorObject.message = err.error.message;
          this.errorObject.show = !err.error.success;
        }
      }
    );
  }

  isRedirectedFromLink() {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    if (queryParams && queryParams.error === 'true') {
      this.errorObject = new ErrorObject;
      this.errorObject.message = ' Invalid reset link, please try again.';
      this.errorObject.show = true;
    }
  }
}
