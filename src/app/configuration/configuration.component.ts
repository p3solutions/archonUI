import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  checkActive = 'Email SMTP Configuration';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }

}
