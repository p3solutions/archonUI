import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SigninFormService } from '../signin-form.service';
import { SigninForm} from '../signin-form';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {


  constructor(private signinService : SigninFormService) { }
 
  

  signinDetails : SigninForm = {
    email : '',
    password : ''
  }

  onSubmit(signinForm : NgForm){
    console.log(this.signinService.getUserCredentials()+" before");
//    this.getUserDatas(this.signinService.getUserCredentials());
  	this.signinDetails.email = signinForm.form.value.email;
  	this.signinDetails.password = signinForm.form.value.password;
    if(this.signinDetails.email.length>0 && this.signinDetails.password.length>0){
    	this.signinService.postingUserData(this.signinDetails);
      console.log('Data posted successfully');
    }
    else{
      console.log('User entered incorrect data');
    }
  }
  ngOnInit() {
 }



}
