import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { ErrorObject } from '../error-object';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() username: string;
  @Input() useremail: string;
  @Input() userid: string;
  @Output() UpdateProfile = new EventEmitter<boolean>();
  nameLoader: boolean;
  emailLoader: boolean;
  oldUserInfo: object;
  errorObject: ErrorObject;
  thisComponent = this;

  constructor(private userinfoService: UserinfoService, private router: Router) { }

  ngOnInit() {
    this.nameLoader = this.emailLoader = false;
  }

  updateUserInfo() {
    this.oldUserInfo = {
      id: this.userid,
      username: this.username,
      useremail: this.useremail
    };
    this.errorObject = this.userinfoService.isInvalidEditValues(this.oldUserInfo);
    if (this.errorObject) {
      return false;
    }
    const params = {
      id: this.userid,
      name: this.username,
      emailAddress: this.useremail
    };
    if (this.userinfoService.getUpdatedName()) {
      this.nameLoader = true;
      params.name = this.userinfoService.getUpdatedName();
    }
    /* if (this.userinfoService.getUpdatedEmail()) {
      this.emailLoader = true;
      params.emailAddress = this.userinfoService.getUpdatedEmail();
    } */
    this.userinfoService.updateUserProfile(params).subscribe(res => {
      if (res.success) {
        this.username = res.data.name;
        this.useremail = res.data.emailAddress;
        this.nameLoader = this.emailLoader = false;
        (<HTMLButtonElement>document.querySelector('#editProfileModal .cancel')).click();
        this.UpdateProfile.emit(true);
        setTimeout(() => this.thisComponent.router.navigate(['/sign-in']), 1000);
      }
    });
  }

  closeErrorMsg() {
    this.errorObject = null;
  }

}
