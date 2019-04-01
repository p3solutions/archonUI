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

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
  }

  clear() {
    this.smtpConfiguration = new SMTPConfiguration();
  }

  saveSMTPConfiguration() {
    this.configurationService.saveSMTPConfiguration(this.smtpConfiguration).subscribe(response => {
      document.getElementById('success-popup-btn').click();
      if (response.httpStatus === 200) {
        this.successMessage = 'SMTP Configuration Saved Successfully';
      } else {
        this.successMessage = 'SMTP Configuration Not Saved';
      } this.clear();

    });
  }
}
