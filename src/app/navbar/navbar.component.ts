import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { InfoService } from '../info.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  accessToken: string;
  jwtHelper: JwtHelper = new JwtHelper();
  token_data: any;
  info: Info;
  constructor(private infoservice: InfoService) { }
  ngOnInit() {
    this.getInfo();
  }
  // Get information from the info service
  getInfo(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    this.info = new Info();
    this.info.id = this.token_data.user.id;
    this.info.role = this.token_data.roles[0].roleName;
    this.info.username = this.token_data.user.name;
    if (this.info.role === 'ROLE_ADMIN') {
      this.info.show = true;
    }
  }
}
