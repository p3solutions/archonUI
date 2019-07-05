import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserinfoService } from '../userinfo.service';
import { ErrorObject } from '../error-object';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  // @Input() username: string;
  @Input() firstName: string;
  @Input() lastName: string;
  @Input() useremail: string;
  @Input() userid: string;
  @Output() UpdateProfile = new EventEmitter<boolean>();
  nameLoader: boolean;
  emailLoader: boolean;
  oldUserInfo: object;
  errorObject: ErrorObject;
  thisComponent = this;
  enableBtn: boolean;

  constructor(private userinfoService: UserinfoService, private router: Router, private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.enableBtn = true;
    this.nameLoader = this.emailLoader = false;
  }

  updateUserInfo() {
    this.oldUserInfo = {
      id: this.userid,
      // username: this.username,
      firstName : this.firstName,
      lastName : this.lastName,
      useremail: this.useremail
    };
    this.errorObject = this.userinfoService.isInvalidEditValues(this.oldUserInfo);
    if (this.errorObject) {
      return false;
    }
    const params = {
      id: this.userid,
      firstName : this.firstName,
      lastName : this.lastName,
      emailAddress: this.useremail
    };
    if (this.userinfoService.getUpdatedFirstName()) {
      this.nameLoader = true;
      params.firstName = this.userinfoService.getUpdatedFirstName();
      params.lastName = this.userinfoService.getUpdatedLastName();

    }
    /* if (this.userinfoService.getUpdatedEmail()) {
      this.emailLoader = true;
      params.emailAddress = this.userinfoService.getUpdatedEmail();
    } */
    this.userinfoService.updateUserProfile(params).subscribe(res => {
      if (res.success) {
        this.enableBtn = true;
        this.firstName = res.data.firstName,
        this.lastName = res.data.lastName,
        this.useremail = res.data.emailAddress;
        this.nameLoader = this.emailLoader = false;
        (<HTMLButtonElement>document.querySelector('#editProfileModal .cancel')).click();
        this.UpdateProfile.emit(true);
        this.userProfileService.changeUserName(this.firstName + ' ' + this.lastName);
      }
    });
  }

  closeErrorMsg() {
    this.errorObject = null;
  }
  enablebutton () {
    this.oldUserInfo = {
      id: this.userid,
      // username: this.username,
      firstName : this.firstName,
      lastName : this.lastName,
      useremail: this.useremail
    };
    this.errorObject = this.userinfoService.isInvalidEditValues(this.oldUserInfo);
    if (this.errorObject) {
      this.enableBtn = true;
      return false;
    } else {
      this.enableBtn = false;
    }
  }

}
