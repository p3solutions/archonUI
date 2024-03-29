import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PasswordReset } from './password-reset';
import { NewPasswordSetter } from './new-password-setter';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EnterNewpasswordService } from './enter-newpassword.service';
import { ErrorObject } from '../error-object';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SuccessObject } from '../success-object';

@Component({
  selector: 'app-enter-newpassword',
  templateUrl: './enter-newpassword.component.html',
  styleUrls: ['./enter-newpassword.component.css']
})
export class EnterNewpasswordComponent implements OnInit {
  responseData: any;
  newPasswordSetForm = new NewPasswordSetter('', '');
  errorObject: ErrorObject;
  successObject: SuccessObject;
  passwordReset: PasswordReset;
  passwordResetForm: FormGroup;
  enablePasswordBtn = false;
  inProgress = false;
  resetKey: string;
  constructor(
    private passwordResetService: EnterNewpasswordService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.resetKey = this.route.snapshot.paramMap.get('resetKey');
    this.createForm();
    setTimeout(() => this.enableResetPassword(), 3000);
  }
  createForm() {
    this.passwordResetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.inProgress = true;
    this.newPasswordSetForm.resetKey = this.resetKey;
    this.newPasswordSetForm.password = this.passwordResetForm.value.password;
    this.passwordResetService.passwordReset(this.newPasswordSetForm).subscribe(
      data => {
        this.responseData = data;
        this.successObject = new SuccessObject;
        this.successObject.message = data.data;
        this.successObject.show = true;
      },
      (err: HttpErrorResponse) => {
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
  get password() { return this.passwordResetForm.get('password'); }
  get confirmPassword() { return this.passwordResetForm.get('confirmPassword'); }

  enableResetPassword() {
    if (this.passwordResetForm.value.password && this.passwordResetForm.value.confirmPassword) {
      this.enablePasswordBtn = true;
    } else {
      this.enablePasswordBtn = false;
    }
  }
}
