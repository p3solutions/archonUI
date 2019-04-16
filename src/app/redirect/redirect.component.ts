import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectService } from './redirect.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {
  workspaceUrl = '/workspace';
  constructor(private route: Router, private redirectService: RedirectService) { }

  ngOnInit() {
    this.redirectTo();
  }

  redirectTo() {
    this.redirectService.signIn(localStorage.getItem('ssoToken')).subscribe( result => {
      localStorage.setItem('accessToken', result.data.accessToken);
      this.route.navigateByUrl(this.workspaceUrl);
    });
  }

}
