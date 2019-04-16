import { Component, OnInit } from '@angular/core';
import { SMTPConfiguration } from '../configuration/configuration';
import { ConfigurationService } from '../configuration/configuration.service';

@Component({
  selector: 'app-smtp-configuration',
  templateUrl: './smtp-configuration.component.html',
  styleUrls: ['./smtp-configuration.component.css']
})
export class SmtpConfigurationComponent implements OnInit {
  successMessage = '';
  smtpConfiguration = new SMTPConfiguration();
  inProgress = false;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.checkExistingSMTPConfiguration();
  }

  clear() {
    this.smtpConfiguration = new SMTPConfiguration();
    this.checkExistingSMTPConfiguration();
  }

  checkExistingSMTPConfiguration() {
    this.configurationService.checkExistingSMTPConfiguration().subscribe(response => {
      if (response.data !== false) {
        this.smtpConfiguration = response.data;
      }
    });
  }

  saveSMTPConfiguration() {
    this.inProgress = true;
    this.configurationService.saveSMTPConfiguration(this.smtpConfiguration).subscribe(response => {
      document.getElementById('success-popup-btn').click();
      if (response.httpStatus === 200) {
        this.successMessage = 'SMTP configuration saved successfully.';
        this.inProgress = false;
      } else {
        this.successMessage = 'SMTP configuration not saved. Please Check the details.';
        this.inProgress = false;
      }
      this.clear();
    });
  }
}
