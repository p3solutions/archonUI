import { Component, OnInit } from '@angular/core';
import { Signin } from '../signin';
import { SignInService } from '../sign-in.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signin = new Signin('', '');
  constructor(
    private signinService: SignInService,
    private router: Router
  ) { }
  ngOnInit() { }

  //   // @Output() loggedIn = new EventEmitter<SigninForm>();

  //   constructor(private signinService : SigninFormService,private fb : FormBuilder) { }

  //   signinDetails : SigninForm = {
  //     email : '',
  //     password : ''
  //   }

  //   login(){
  //     if(this.form.valid){
  //       console.log(this.form.value.email+" "+this.form.value.password);
  //       this.signinDetails.email = this.form.value.email;
  //       this.signinDetails.password = this.form.value.password;
  //       this.signinService.postingUserData(this.signinDetails);
  //       console.log("successfully data posted");
  //     }
  //     else{
  //       console.log("invalid form data");
  //     }
  // //     this.form = signinForm;
  // //     console.log(this.signinService.getUserCredentials()+" before");
  // // //    this.getUserDatas(this.signinService.getUserCredentials());
  // //     this.signinDetails.email = signinForm.form.value.email;
  // //     this.signinDetails.password = signinForm.form.value.password;
  // //     if(this.signinDetails.email.length>0 && this.signinDetails.password.length>0){
  // //       this.signinService.postingUserData(this.signinDetails);
  // //       console.log('Data posted successfully');
  // //     }
  // //     else{
  // //       console.log('User entered incorrect data');
  // //     }
  //   }
  //   ngOnInit() {
  //     this.form = this.fb.group({
  //       email: ['', [
  //         Validators.required,
  //         Validators.pattern("[^ @]*@[^ @]*")]],
  //       password: ['', [
  //         Validators.required,
  //         Validators.minLength(8)]],
  //     });
  //  }

  onSignIn() {
    console.log(JSON.stringify(this.signin));
    this.signinService.signIn(this.signin);
    this.router.navigate(['/workspace']);
  }

}
