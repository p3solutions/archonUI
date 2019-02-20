import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErtJobParams } from '../ert-landing-page/ert';
import { ErtService } from '../ert-landing-page/ert.service';

@Component({
  selector: 'app-ert-jobs-config',
  templateUrl: './ert-jobs-config.component.html',
  styleUrls: ['./ert-jobs-config.component.css']
})
export class ErtJobsConfigComponent implements OnInit {
  ertJobParams: ErtJobParams = new ErtJobParams();
  constructor(public route: Router, private ertService: ErtService) { }
  ngOnInit() {
    this.ertService.ertJobParams = new ErtJobParams();
    this.ertService.selectedList = [];
  }

  goToExtraction(event, ertJobMode) {
    this.ertJobParams.ertJobMode = ertJobMode;
    this.ertService.setErtJobParams(this.ertJobParams);
    if (ertJobMode === 'DATA RECORD') {
      this.route.navigate(['/workspace/ert/ert-datarecord-config']);
    } else if (ertJobMode === 'SIP') {
      this.route.navigate(['/workspace/ert/ert-sip-config']);
    } else {
      this.route.navigate(['/workspace/ert/ert-table']);
    }
  }

  enableJobSelection() {
    if (this.ertJobParams.ertJobTitle !== '') {
      const radios = document.getElementsByName('selectjob');
      const array: any = Array.from(radios);
      for (const item of array) {
        item.disabled = false;
      }
    }
  }
}
