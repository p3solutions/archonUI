import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Info } from '../info';
import { InfoService } from '../info.service';
import { WorkspaceLandingPageService } from './workspace-landing-page.service';

@Component({
  selector: 'app-workspace-landing-page',
  templateUrl: './workspace-landing-page.component.html',
  styleUrls: ['./workspace-landing-page.component.css']
})
export class WorkspaceLandingPageComponent implements OnInit {
  manageMembersFlagVal = false;
  accessToken: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  token_data: any;
  info: Info;
  constructor(
    private router: Router,
    private workspaceLandingPageService: WorkspaceLandingPageService
  ) { }
  ngOnInit() {
    this.getInfo();
  }

  // Get information from the info service
  getInfo(): void {
    this.accessToken = localStorage.getItem('accessToken');
    this.token_data = this.jwtHelper.decodeToken(this.accessToken);
    this.info = new Info();
    this.info.id = this.token_data.user.id;
    this.info.roles = this.token_data.roles[0];
    this.info.username = this.token_data.username;
    if (this.info.roles.roleName === 'ROLE_NOT_ASSIGNED') {
      this.router.navigate(['workspace/no-workspace']);
    } else {
      if (this.info.roles.roleName === 'ROLE_ADMIN') {
        this.info.show = true;
      }
      this.router.navigate(['workspace/workspace-dashboard']);
    }

    // this.workspaceLandingPageService.getWorkspaces().subscribe(info => {
    //   this.info = info;
    //   if (this.info.roles.roleName === 'ROLE_ADMIN') {
    //     this.info.show = true;
    //   }
    // });
  }
}
