import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service';
import { ProcessDetails, ProcessDetailsObj } from '../db-extractor';

@Component({
  selector: 'app-db-extractor-step-one',
  templateUrl: './db-extractor-step-one.component.html',
  styleUrls: ['./db-extractor-step-one.component.css']
})
export class DbExtractorStepOneComponent implements OnInit {
  processDetailsMap: Map<string, string[]> = new Map<string, string[]>();
  processDetailsList: ProcessDetails[] = [];
  processList: string[] = [];
  outputFormatList: string[] = [];
  processDetailsObj = new ProcessDetailsObj();
  isDisabled: boolean;
  constructor(private router: Router, private dbExtractorService: DbExtractorService) { }

  ngOnInit() {
    this.getProcessDetails();
  }

  getProcessDetails() {
    this.dbExtractorService.getProcessDetails().subscribe((processDetailsList) => {
      this.processDetailsList = processDetailsList;
      for (const item of this.processDetailsList) {
        this.processDetailsMap.set(item['process'], item['supportedOutputFormats']);
      }
      this.processList = Array.from(this.processDetailsMap.keys());
      if (this.dbExtractorService.getProcessDetailsObj() != null) {
        this.processDetailsObj = this.dbExtractorService.getProcessDetailsObj();
        this.outputFormatList = this.processDetailsMap.get(this.processDetailsObj.process);
      }  else {
        this.processDetailsObj = new ProcessDetailsObj();
      }
    });
  }

  getOutputFormatListBySecProcess(process: string) {
    this.isDisabled = false;
    if (process != null) {
      this.processDetailsObj.process = process;
      if (process === 'Execute Query') {
        this.isDisabled = true;
      }
      this.outputFormatList = this.processDetailsMap.get(process);
      this.processDetailsObj.includeTableRelationship
       = this.processDetailsList.filter(a => a.process === process)[0].includeTableRelationship;
    } else if (process == null) {
      this.outputFormatList = [];
      this.processDetailsObj.includeTableRelationship = false;
    }
  }

  setOutputFormat(outputFormat: string) {
    this.processDetailsObj.outputFormat = outputFormat;
  }

  gotoStepTwo() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 });
    this.dbExtractorService.setProcessDetailsObj(this.processDetailsObj);
    if (this.processDetailsObj.process.replace(/\s+/g, '').toLowerCase() === 'executequery') {
      this.router.navigate(['/workspace/db-extractor/db-extractor-exec-query']);
    } else {
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
    }
  }
}
