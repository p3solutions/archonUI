import { Component, OnInit, Input } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { ErrorObject } from '../error-object';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePassword } from '../ChangePassword';
import { HttpErrorResponse } from '@angular/common/http';


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
  @Input() userId: string;
  constructor(private changePasswordService: ChangePasswordService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  isPasswordNotValidated() {
    this.newPassword = this.changePasswordForm.value.newPassword;
    this.confirmPassword = this.changePasswordForm.value.confirmPassword;
    if (this.newPassword.length < 6) {
      this.errorObject = new ErrorObject;
      this.errorObject.message = 'Password length must be atleast 6 character';
      this.errorObject.show = true;
    }
    if (this.newPassword !== this.confirmPassword) {
      this.errorObject = new ErrorObject;
      this.errorObject.message = 'New Password and Confirm Password mismatched';
      this.errorObject.show = true;
    }
    return this.errorObject;
  }
  changeUserPassword() {
    if (this.isPasswordNotValidated()) {
      return false;
    }
    const param = {
      userId: this.userId,
      newPassword: this.newPassword,
      oldPassword: this.changePasswordForm.value.oldPassword
    };

    this.changePasswordService.changePassword(param).subscribe((res) => {
      (<HTMLButtonElement>document.querySelector('#changePasswordModal .cancel')).click();

      console.log(res, 'changeUserPassword');
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
      });
  }


}
