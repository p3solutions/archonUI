import { Component, OnInit } from '@angular/core';
import { Info } from '../info';
import { InfoService } from '../info.service';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-workspace-landing-page',
  templateUrl: './workspace-landing-page.component.html',
  styleUrls: ['./workspace-landing-page.component.css']
})
export class WorkspaceLandingPageComponent implements OnInit {
  manageMembersFlagVal = false;
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
    this.info.role = this.token_data.user.role;
    this.info.username = this.token_data.username;
    if (this.token_data.user.role === 'ROLE_NOT_ASSIGNED') {
      this.info.show = true;
    }

    // this.infoservice.getinfo(this.infoservice.infoUrl).subscribe(info => {
    //   this.info = info;
    //   if (this.info.role === 'Admin') {
    //     this.info.show = true;
    //   }
    // });
  }
}
