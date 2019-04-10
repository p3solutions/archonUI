import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Info } from '../info';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', './hamburger.scss']


})
export class NavbarComponent implements OnInit {
  info: Info;
  private router: Router;
  userChangeName: string;
  rolesForManage: string[] = ['ADMIN', 'MANAGE_DB'];
  notifiactionArray = [];
  count = 0;

  constructor(private userProfileService: UserProfileService , private navService: NavbarService) { }
  ngOnInit() {
    this.userProfileService.UserNamechange.subscribe(data => {
      this.userChangeName = data;
      this.getInfo();
    });
    this.info = this.getInfo();
    // if (this.info.roles.roleName === 'ROLE_USER') {
    //   this.info.show = true;
    // } else if (this.info.roles.roleName === 'ROLE_DB_ADMIN') {
    //   this.info.show = true;
    // } else if (this.info.roles.roleName === 'ROLE_SUPER_ADMIN') {
    //   this.info.show = true;
    // } else if (this.info.roles.roleName === 'ROLE_DB_MEMBER') {
    //   this.info.show = true;
    // }

    for (const item of this.info.roleList) {
      for (const role of this.rolesForManage) {
        if (item.roleName.toUpperCase().trim().includes(role)) {
          this.info.show = true;
          break;
        }
      }
    }

    $(document).ready(function () {
      $('.button').click(function () {
        $(this).closest('body').toggleClass('active');
      });
    });
    this.getNotification();
  }

  // Get information from the info service
  getInfo(): Info {
    let info: Info;
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelperService = new JwtHelperService();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    info = new Info();
    info.id = token_data.user.id;
    info.roles = token_data.roles[0];
    info.roleList = token_data.roles;
    info.username = this.userChangeName;
    return info;
  }
  callUserProfile() {
    localStorage.setItem('userId', '');
  }
  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['sign-in']);
  }

  getNotification() {
    setInterval(() => {
      this.navService.getNotification().subscribe(result => {
        this.count = 0;
        this.notifiactionArray = result;
        for (const i of this.notifiactionArray) {
          if (i.read === false) {
            this.count = this.count + 1;
          }
        }
      });
  }, 10000);
  }

  updateNotification(id) {
   this.navService.updateNotification(id).subscribe(result => {
     this.getNotification();
   });
  }

}
