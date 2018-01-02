import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { UserinfoService } from '../userinfo.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // userInfo: Info;
  userInfo: any;

  constructor(
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    // this.getUserInfo();
    this.getUserInfoFake();
  }

  /* getUserInfo() {
    this.userinfoService.getUserInfo().subscribe((data) => {
      if (data.httpStatus === 200 && data.user) {
        this.userInfo.role = {
          id: data.user.id,
          email: data.user.emailAddress,
          name: data.user.name
        }
        if (data.username.globalRoles) {
          this.userInfo.role = data.username.globalRoles[0].roleName;
        }
      }
    };
  } */
  // hard coded response
  getUserInfoFake() {
    const data = {
      user: {
        id: '5a3ba85e4ca51516a7573982',
        createdAt: 1513859166,
        name: 'Vishwa',
        emailAddress: 'test.1234567@test.com',
        globalRoles: [
          {
            id: '5a3b9d138ce32b109441f5a6',
            createdAt: 1513856275,
            roleName: 'ROLE_NOT_ASSIGNED'
          }
        ]
      },
      success: true,
      httpStatus: 200
    };
    if (data.httpStatus === 200 && data.user) {
      this.userInfo = {
        id: data.user.id,
        email: data.user.emailAddress,
        name: data.user.name
      };
      if (data.user.globalRoles) {
        this.userInfo.role = data.user.globalRoles[0].roleName;
      }
    }
    console.log(data, 'data');
  }

}
