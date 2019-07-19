import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, NgForm } from '@angular/forms';
import { PasswordValidator, ConfirmPasswordValidator, ConfirmPasswordValidator2 } from '../signup-form/confirm-password-validator';
import { ErrorObject } from '../error-object';
import { ResetpasswordService } from './resetpassword.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorObject: ErrorObject;
  inProgress = false;
  passwordNotMatch = false;
  resetKey = '';
  errorMessage = '';
  emailAddress = '';
  successMessage = '';
  @ViewChild('formDirective') private formDirective: NgForm;
  constructor(private _formBuilder: FormBuilder, private resetPasswordService: ResetpasswordService,
    private activatedRoute: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.initResetPasswordForm();
    this.resetPasswordForm.get('newPassword').valueChanges.subscribe(response1 => {
      this.onKeyPressOfConfirmPassword();
    });
    this.resetPasswordForm.get('confirmPassword').valueChanges.subscribe(response1 => {
      this.onKeyPressOfConfirmPassword();
    });
    this.getUserDetailsByResetKey();
  }


  onKeyPressOfConfirmPassword() {
    if (this.resetPasswordForm.get('confirmPassword').value !== '') {
      if (this.resetPasswordForm.get('newPassword').value !== this.resetPasswordForm.get('confirmPassword').value) {
        this.passwordNotMatch = true;
      } else {
        this.passwordNotMatch = false;
      }
    } else {
      this.passwordNotMatch = false;
    }
  }

  initResetPasswordForm() {
    this.resetPasswordForm = this._formBuilder.group({
      newPassword: new FormControl('', [Validators.required, PasswordValidator.strong,
      Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
    },
      {
        validator: ConfirmPasswordValidator2.MatchPassword
      });
  }

  getUserDetailsByResetKey() {
    this.resetKey = this.activatedRoute.snapshot.queryParamMap.get('resetKey');
    this.resetPasswordService.getkeyValueUserDetails(this.resetKey).subscribe(response => {
      if (response) {
        this.emailAddress = response.emailAddress;
      }
    },
      (err: HttpErrorResponse) => {
        if (err.error) {
          if (err.status === 0) {
            this.errorMessage = 'Connection Error.';
          } else {
            this.errorMessage = err.error.message;
          }
          this.resetPasswordForm.get('newPassword').disable();
          this.resetPasswordForm.get('confirmPassword').disable();
        }
      });
  }

  resetPassword() {
    this.closeErrorMsg();
    this.inProgress = true;
    this.spinner.show();
    const param: any = {
      'emailAddress': this.emailAddress,
      'password': this.resetPasswordForm.get('newPassword').value
    };
    this.resetPasswordService.pwdReset(JSON.parse(JSON.stringify(param))).subscribe(response => {
      this.inProgress = false;
      this.spinner.hide();
      this.successMessage = response;
      document.getElementById('success-popup-btn').click();
      this.formDirective.resetForm();
    },
      (err: HttpErrorResponse) => {
        if (err.error) {
          this.spinner.hide();
          this.errorMessage = err.error.message;
          this.inProgress = false;
        }
      });
  }

  closeErrorMsg() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  gotoSignUp() {
    this.router.navigate(['/sign-in']);
  }
}
