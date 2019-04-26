import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Info } from '../info';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { UserProfileService } from '../user-profile/user-profile.service';
import { NavbarService } from './navbar.service';
import { UserinfoService } from '../userinfo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', './hamburger.scss']


})
export class NavbarComponent implements OnInit {
  info: Info;
  private router: Router;
  userChangeName: string;
  rolesForManage: string[] = ['ADMIN', 'MANAGE_DB', 'SUPER'];
  enableAuditArray = ['ROLE_AUDIT'];
  enableAudit = false;
  notifiactionArray = [];
  count = 0;
  loadfirst = 0;

  constructor(private userProfileService: UserProfileService , private navService: NavbarService, private userinfoService: UserinfoService) { }
  ngOnInit() {
    const check = this.userinfoService.getRoleList();
    for (const i of check) {
     if (this.enableAuditArray.includes(i)) {
       this.enableAudit = true;
       break;
     }
    }
    this.userProfileService.UserNamechange.subscribe(data => {
      this.userChangeName = data;
      this.getInfo();
    });
    this.info = this.getInfo();
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
    if (this.loadfirst === 0) {
      this.loadfirst = 1;
      this.navService.getNotification().subscribe(result => {
        this.notifiactionArray = [];
        this.count = 0;
        this.notifiactionArray = result;
        for (const i of this.notifiactionArray) {
          if (i.read === false) {
            this.count = this.count + 1;
          }
        }
        this.getNotification();
      });
    } else {
      setInterval(() => {
        this.navService.getNotification().subscribe(result => {
          this.notifiactionArray = [];
          this.count = 0;
          this.notifiactionArray = result;
          for (const i of this.notifiactionArray) {
            if (i.read === false) {
              this.count = this.count + 1;
            }
          }
        });
    }, 600000);
    }
  }

  updateNotification(id) {
   this.navService.updateNotification(id).subscribe(result => {
     this.loadfirst = 0;
     this.getNotification();
   });
  }

}
