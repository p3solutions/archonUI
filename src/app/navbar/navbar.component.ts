import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Info } from '../info';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserProfileService } from '../user-profile/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  info: Info;
  private router: Router;
  userChangeName: string;

  constructor( private userProfileService: UserProfileService) { }
  ngOnInit() {
    this.userProfileService.UserNamechange.subscribe(data => {
      this.userChangeName = data;
      this.getInfo();
    });
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
    const jwtHelper: JwtHelperService = new JwtHelperService();
    accessToken = localStorage.getItem('accessToken');
    token_data = jwtHelper.decodeToken(accessToken);
    info = new Info();
    info.id = token_data.user.id;
    info.roles = token_data.roles[0];
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
}
