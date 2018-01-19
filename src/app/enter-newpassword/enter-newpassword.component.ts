import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PasswordReset } from './password-reset';
import { NewPasswordSetter } from './newpasswordsetter';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EnterNewpasswordService } from './enter-newpassword.service';
import { ErrorObject } from '../error-object';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
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
  resetKey: string;
  constructor(
    private passwordResetService: EnterNewpasswordService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.resetKey = this.route.snapshot.paramMap.get('resetKey');
    this.createForm();
  }
  createForm() {
    this.passwordResetForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    console.log('submit button');
    this.newPasswordSetForm.resetKey = this.resetKey;
    this.newPasswordSetForm.password = this.passwordResetForm.value.password;
    console.log(JSON.stringify(this.newPasswordSetForm));
    this.passwordResetService.passwordReset(this.newPasswordSetForm).subscribe(
      data => {
        this.responseData = data;
        this.successObject = new SuccessObject;
        this.successObject.message = data.data;
        this.successObject.show = true;
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
          this.errorObject.message = err.error.errorMessage;
          this.errorObject.show = !err.error.success;
          console.log(this.errorObject);
          console.log(`Backend returned code ${err.status}, body was: ${JSON.stringify(err.error)}`);
        }
      }
    );
  }
  get password() { return this.passwordResetForm.get('password'); }
  get confirmPassword() { return this.passwordResetForm.get('confirmPassword'); }
}
