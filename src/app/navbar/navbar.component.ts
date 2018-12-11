import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  info: Info;
  constructor() { }
  ngOnInit() {
    this.info = this.getInfo();
    if (this.info.roles.roleName === 'ROLE_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_DB_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_SUPER_ADMIN') {
      this.info.show = true;
    } else if (this.info.roles.roleName === 'ROLE_DB_MEMBER') {
      this.info.show = true;
    }
  }
  // Get information from the info service
  getInfo(): Info {
    let info: Info;
    let accessToken: string;
    let token_data: any;
    const jwtHelper: JwtHelper = new JwtHelper();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    info = new Info();
    info.id = token_data.user.id;
    info.roles = token_data.roles[0];
    info.username = token_data.user.name;
    return info;
  }
  callUserProfile() {
    localStorage.setItem('userId','');
  }
}
