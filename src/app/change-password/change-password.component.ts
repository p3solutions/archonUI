import { Component, OnInit, Input } from '@angular/core';
import { ChangePasswordService } from './change-password.service';
import { ErrorObject } from '../error-object';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangePassword } from '../change-password';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Route } from '@angular/compiler/src/core';


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
  constructor(private changePasswordService: ChangePasswordService,private router:Router) { }

  ngOnInit() {
    this.createForm();
    setTimeout(() => this.enablePassword(), 3000);
  }
  createForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }
  closeErrorMsg() {
    this.errorObject = null;
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
    this.inProgress = true;
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
        this.inProgress = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          this.errorObject = new ErrorObject;
          this.errorObject.message = 'Invalid current password';
          this.errorObject.show = !err.error.success;
          console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
        }
      });
  }
  enablePassword() {
    if (this.changePasswordForm.value.oldPassword && this.changePasswordForm.value.newPassword
      && this.changePasswordForm.value.confirmPassword) {
      this.enableChangePassBtn = true;
    } else {
      this.enableChangePassBtn = false;
    }
  }

  gotoDashboard(){
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
