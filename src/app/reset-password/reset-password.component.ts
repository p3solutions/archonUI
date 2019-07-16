import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PasswordValidator, ConfirmPasswordValidator } from '../signup-form/confirm-password-validator';
import { ErrorObject } from '../error-object';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorObject: ErrorObject;
  inProgress = false;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initResetPasswordForm();
  }

  initResetPasswordForm() {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: new FormControl('', [Validators.required, PasswordValidator.strong,
      Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
      {
        validator: ConfirmPasswordValidator.MatchPassword
      });
  }

  closeErrorMsg() {
    this.errorObject = null;
  }
}
