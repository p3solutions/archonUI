import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service'
import { ProcessDetails, ProcessDetailsObj } from '../db-extractor';

@Component({
  selector: 'app-db-extractor-step-one',
  templateUrl: './db-extractor-step-one.component.html',
  styleUrls: ['./db-extractor-step-one.component.css']
})
export class DbExtractorStepOneComponent implements OnInit {
  processDetailsMap: Map<string, string[]> = new Map<string, string[]>();
  processDetails: ProcessDetails[] = [
    {
      "id": "5c387063e332d94d7b1ad2a5",
      "createdAt": 1547202659,
      "updatedAt": 1547202695,
      "process": "Generate Schema",
      "supportedOutputFormats": [
        "xml",
        "csv",
        "tsv",
        "txt",
        "html",
        "json"
      ],
      "includeTableRelationship": false,
      "softDeleted": false
    },
    {
      "id": "5c387063e332d94d7b1ad2a6",
      "createdAt": 1547202659,
      "updatedAt": 1547202695,
      "process": "Generate Metadata",
      "supportedOutputFormats": [
        "xml",
        "csv",
        "tsv",
        "txt",
        "html",
        "json"
      ],
      "includeTableRelationship": true,
      "softDeleted": false
    },
    {
      "id": "5c387063e332d94d7b1ad2a7",
      "createdAt": 1547202659,
      "updatedAt": 1547202695,
      "process": "Extract Data",
      "supportedOutputFormats": [
        "xml",
        "csv",
        "tsv",
        "txt",
        "html",
        "json"
      ],
      "includeTableRelationship": false,
      "softDeleted": false
    },
    {
      "id": "5c387063e332d94d7b1ad2a8",
      "createdAt": 1547202659,
      "updatedAt": 1547202695,
      "process": "Execute Query",
      "supportedOutputFormats": [
        "xml",
        "csv",
        "tsv",
        "txt",
        "html",
        "json"
      ],
      "includeTableRelationship": false,
      "softDeleted": false
    },
    {
      "id": "5c387063e332d94d7b1ad2a9",
      "createdAt": 1547202659,
      "updatedAt": 1547202695,
      "process": "Get Record Count",
      "supportedOutputFormats": [
        "xml",
        "csv",
        "tsv",
        "txt",
        "html",
        "json"
      ],
      "includeTableRelationship": false,
      "softDeleted": false
    },
    {
      "id": "5c387063e332d94d7b1ad2aa",
      "createdAt": 1547202659,
      "updatedAt": 1547202695,
      "process": "Generate Graph View",
      "supportedOutputFormats": [
        "pdf",
        "png",
        "jpeg"
      ],
      "includeTableRelationship": true,
      "softDeleted": false
    }
  ]
  processList: string[] = [];
  outputFormatList: string[] = [];
  processDetailsObj=new ProcessDetailsObj();
  constructor(private router: Router, private dbExtractorService: DbExtractorService) { }

  ngOnInit() {
    this.getProcessDetails();
  }

  getProcessDetails() {
    for (let item of this.processDetails) {
      this.processDetailsMap.set(item['process'], item['supportedOutputFormats']);
    }
    this.processList = Array.from(this.processDetailsMap.keys());
    if (this.dbExtractorService.getProcessDetailsObj() != null) {
      this.processDetailsObj=this.dbExtractorService.getProcessDetailsObj();
      this.outputFormatList = this.processDetailsMap.get(this.processDetailsObj.process)
    }
    else{
      this.processDetailsObj=new ProcessDetailsObj();
    }
  }

  getOutputFormatListBySecProcess(process: string) {
    this.processDetailsObj.process=process;
    this.outputFormatList = this.processDetailsMap.get(process);
    this.processDetailsObj.includeTableRelationship = this.processDetails.filter(a => a.process == process)[0].includeTableRelationship;  
  }

  setOutputFormat(outputFormat:string){
    this.processDetailsObj.outputFormat=outputFormat;
  }

  gotoStepTwo() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
    this.dbExtractorService.setProcessDetailsObj(this.processDetailsObj);
  }
}
