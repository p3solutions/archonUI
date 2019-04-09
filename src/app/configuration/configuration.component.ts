import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  checkActive = 'Email SMTP Configuration';
  showSmtp = true;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoManagementPanel() {
    this.router.navigate(['management-landing-page/management-panel']);
  }

  tabChange($event) {
    switch ($event.target.innerText.replace(/ /g, '').toLocaleLowerCase()) {
      case 'emailsmtpconfiguration': {
        this.checkActive = $event.target.innerText;
        this.showSmtp = true;
        break;
      }
      case 'appconfiguration': {
        this.checkActive = $event.target.innerText;
        this.showSmtp = false;
        break;
      }
      case 'groupsandrolesconfiguration': {
        this.checkActive = $event.target.innerText;
        this.showSmtp = true;
        break;
      }
    }
  }
}
