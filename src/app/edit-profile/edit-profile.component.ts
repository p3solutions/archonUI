import { Component, OnInit, Input } from '@angular/core';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() username: string;
  @Input() useremail: string;
  @Input() userid: string;
  updatedName: string;
  updatedEmail: string;
  nameLoader: boolean;
  emailLoader: boolean;

  constructor(private userinfoService: UserinfoService) { }

  ngOnInit() {
    this.nameLoader = this.emailLoader = false;
  }

  updateUserInfo() {
    const params = {
      id: this.userid,
      name: this.username,
      emailAddress: this.useremail
    };
    if (this.updatedName) {
      this.nameLoader = true;
      params.name = this.updatedName;
    }
    // if (this.updatedEmail) {
    //   this.emailLoader = true;
    //   params.emailAddress = this.updatedEmail;
    // }
    this.userinfoService.updateUserProfile(params).subscribe(res => {
      console.log('res', res);
      if (res.success) {
        this.username = res.data.name;
        // this.useremail = res.data.emailAddress;
        this.nameLoader = this.emailLoader = false;
        document.getElementById('closeEditProfile').click();
      }
    });
    console.log('updateUserInfo', params);
  }

}
