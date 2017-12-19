import { Component, OnInit } from '@angular/core';
import { Forgotpassword } from '../forgotpassword';
import { SignInService } from '../sign-in.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpassword-form',
  templateUrl: './forgotpassword-form.component.html',
  styleUrls: ['./forgotpassword-form.component.css']
})
export class ForgotpasswordFormComponent implements OnInit {
  forgotpassword = new Forgotpassword('');
  constructor(
    private signinService: SignInService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onForgotPassword() {
    console.log(JSON.stringify(this.forgotpassword));
    this.signinService.forgotPassword(this.forgotpassword);
    this.router.navigate(['/sign-in']);
  }
}
