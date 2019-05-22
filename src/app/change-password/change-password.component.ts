import { Component, OnInit, Input } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { ErrorObject } from '../error-object';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePassword } from '../change-password';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmPasswordValidator, PasswordValidator, ConfirmPasswordValidator2 } from '../signup-form/confirm-password-validator';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepassword: ChangePassword;
  changePasswordForm: FormGroup;
  errorObject: ErrorObject;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  enableChangePassBtn = false;
  inProgress = false;
  @Input() userId: string;
  responseData: any;
  successMessage = false;
  thisComponent = this;
  constructor(private changePasswordService: ChangePasswordService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    setTimeout(() => this.enablePassword(), 3000);
  }
  createForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, PasswordValidator.strong,
        Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, ConfirmPasswordValidator2.MatchPassword);
  }
  closeErrorMsg() {
    this.errorObject = null;
  }

  changeUserPassword() {
    this.inProgress = true;
    const param = {
      userId: this.userId,
      newPassword: this.changePasswordForm.value.confirmPassword,
      oldPassword: this.changePasswordForm.value.oldPassword
    };
    this.changePasswordService.changePassword(param).subscribe((res) => {
      this.responseData = res;
        if (this.responseData.httpStatus === 200) {
          this.successMessage = true;
         setTimeout(() => (<HTMLButtonElement>document.querySelector('#changePasswordModal .cancel')).click(), 1500);
         setTimeout(() => this.thisComponent.router.navigate(['/sign-in']), 1520);
          }
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.inProgress = false;
          this.errorObject = new ErrorObject;
          this.errorObject.message = err.error.errorMessage;
          this.errorObject.show = !err.error.success;
      });
  }
  enablePassword() {
    if (this.changePasswordForm.value.oldPassword && this.changePasswordForm.value.newPassword
      && this.changePasswordForm.value.confirmPassword && this.changePasswordForm.get('newPassword').valid) {
      this.enableChangePassBtn = true;
    } else {
      this.enableChangePassBtn = false;
    }
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
