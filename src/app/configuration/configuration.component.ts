import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  checkActive = 'emailsmtp';
  showSmtp = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }

  tabChange($event) {
    switch ($event.target.innerText.replace(/ /g, '').toLocaleLowerCase()) {
      case 'emailsmtp': {
        this.checkActive = 'emailsmtp';
        this.showSmtp = true;
        break;
      }
      case 'application': {
        this.checkActive = 'application';
        this.showSmtp = false;
        break;
      }
      case 'groupsandroles': {
        this.checkActive = 'groupsandroles';
        this.showSmtp = true;
        break;
      }
    }
  }
}
