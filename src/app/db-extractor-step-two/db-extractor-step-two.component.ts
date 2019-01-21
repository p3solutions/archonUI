import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service'
import { ProcessDetails, ProcessDetailsObj } from '../db-extractor';
@Component({
  selector: 'app-db-extractor-step-two',
  templateUrl: './db-extractor-step-two.component.html',
  styleUrls: ['./db-extractor-step-two.component.css']
})
export class DbExtractorStepTwoComponent implements OnInit {

  constructor(private router: Router, private dbExtractorService: DbExtractorService) {

  }

  processDetailsObj = new ProcessDetailsObj();
  ngOnInit() {
    this.processDetailsObj = this.dbExtractorService.getProcessDetailsObj();
  }
  gotoLastStep() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 33.33 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-summary']);
    this.dbExtractorService.setProcessDetailsObj(this.processDetailsObj);
    console.log(this.processDetailsObj);
  }
  prevStepOne() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
  }

  setXMLFileSplitSize(xmlSliderObj: any) {
    this.processDetailsObj.xmlSplitFileSize = xmlSliderObj.newValue;
  }

  setMaxParallelProcess(maxParallelSliderObj: any) {
    this.processDetailsObj.maxParallelProcess = maxParallelSliderObj.newValue;
  }


}
