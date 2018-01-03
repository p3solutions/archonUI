import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PasswordReset } from './password-reset';
import { NewPasswordSetter } from './newpasswordsetter';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EnterNewpasswordService } from './enter-newpassword.service';
import { ErrorObject } from '../error-object';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-enter-newpassword',
  templateUrl: './enter-newpassword.component.html',
  styleUrls: ['./enter-newpassword.component.css']
})
export class EnterNewpasswordComponent implements OnInit {
  responseData: any;
  newPasswordSetForm = new NewPasswordSetter('', '');
  errorObject: ErrorObject;
  passwordReset: PasswordReset;
  passwordResetForm: FormGroup;
  constructor(
    private passwordResetService: EnterNewpasswordService,
    private router: Router
  ) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.passwordResetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.newPasswordSetForm.resetKey = '5a422b025912213155a768341140472627094608';
    this.newPasswordSetForm.password = this.passwordResetForm.value.password;
    console.log(JSON.stringify(this.newPasswordSetForm));
    this.passwordResetService.passwordReset(this.newPasswordSetForm).subscribe(
      data => {
        this.responseData = data;
        console.log(data);
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
  get password() { return this.passwordResetForm.get('password'); }
  get confirmPassword() { return this.passwordResetForm.get('confirmPassword'); }
}
