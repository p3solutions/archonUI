import { Component, OnInit } from '@angular/core';
import { PasswordReset } from './password-reset';
import { NewPasswordSetter } from './newpasswordsetter';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EnterNewpasswordService } from './enter-newpassword.service';
@Component({
  selector: 'app-enter-newpassword',
  templateUrl: './enter-newpassword.component.html',
  styleUrls: ['./enter-newpassword.component.css']
})
export class EnterNewpasswordComponent implements OnInit {

  public passwordReset : PasswordReset;
  responseData : any;
  newPasswordSetForm = new NewPasswordSetter('a3423343jdssjbs342j341k12b41h1m1Z','');
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
        console.log(JSON.stringify(this.responseData)+ '  '+data.password+'  '+data.resetKey);
      }
    );
  }
  
}
