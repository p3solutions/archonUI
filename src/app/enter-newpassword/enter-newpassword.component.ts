import { Component, OnInit } from '@angular/core';
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

  public passwordReset : PasswordReset;
  responseData : any;
  newPasswordSetForm = new NewPasswordSetter('a3423343jdssjbs342j341k12b41h1m1Z','');
  errorObject: ErrorObject;  
  constructor( private passwordResetService : EnterNewpasswordService) { }

  ngOnInit() {
    this.passwordReset = {
      password : '',
      confirmPassword : ''
    }
  }    
  onSubmit(pwd : string){
    console.log(pwd);
    this.newPasswordSetForm.password = pwd;
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
}