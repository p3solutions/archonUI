import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErtJobParams, IngestionDataConfig } from '../ert-landing-page/ert';
import { ErtService } from '../ert-landing-page/ert.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-ert-jobs-config',
  templateUrl: './ert-jobs-config.component.html',
  styleUrls: ['./ert-jobs-config.component.css']
})
export class ErtJobsConfigComponent implements OnInit {
  ertJobParams: ErtJobParams = new ErtJobParams();
  constructor(public route: Router, public ertService: ErtService) { }
  ngOnInit() {
    this.ertService.ertJobParams = new ErtJobParams();
    this.ertService.selectedList = [];
    this.ertService.schemaResultsTableCount = 0;
    this.ertService.ingestionDataConfig = new IngestionDataConfig();
    this.ertService.joinListMap.clear();
    this.ertService.data = undefined;
    this.ertService.selectedPrimaryTable = '';
    this.ertService.selectedValues = [];
  }

  goToExtraction(event, ertJobMode) {
    this.ertJobParams.ertJobMode = ertJobMode;
    this.ertService.setErtJobParams(this.ertJobParams);
    if (ertJobMode === 'DATA_RECORD') {
      this.route.navigate(['/workspace/ert/ert-datarecord-config']);
    } else if (ertJobMode === 'SIP') {
      this.route.navigate(['/workspace/ert/ert-sip-config']);
    } else {
      this.route.navigate(['/workspace/ert/ert-table'], { queryParams: { from: 'TABLE' } });
    }
  }

  enableJobSelection() {
    if (this.ertJobParams.ertJobTitle.length >= 3) {
      const radios = document.getElementsByName('selectjob');
      const array: any = Array.from(radios);
      for (let i = 0; i < array.length; i++) {
        if (this.ertService.mmrVersion === '') {
          if (i === 0) {
            array[i].disabled = false;
          }
        } else {
          array[i].disabled = false;
        }
      }
    } else {
      const radios = document.getElementsByName('selectjob');
      const array: any = Array.from(radios);
      for (let i = 0; i < array.length; i++) {
        array[i].disabled = true;
      }
    }
  }

  goToJobs() {
    this.route.navigate(['/workspace/ert/ert-jobs']);
  }
}
