import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service'
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { UserinfoService } from '../userinfo.service';
import { ConfiguredDB } from '../workspace-objects';

@Component({
  selector: 'app-db-extractor-last-step',
  templateUrl: './db-extractor-last-step.component.html',
  styleUrls: ['./db-extractor-last-step.component.css']
})


export class DbExtractorLastStepComponent implements OnInit {
  workspaceID: string;
  processDetailsObj = new ProcessDetailsObj();
  configuredDB: ConfiguredDB;
  constructor(private router: Router, private dbExtractorService: DbExtractorService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private userinfoService: UserinfoService) { }
  ngOnInit() {
    this.processDetailsObj = this.dbExtractorService.getProcessDetailsObj();
    this.dbExtractorService.getDBInfoByID(this.workspaceHeaderService.getDatabaseID()).subscribe(
      (result) => {
        this.configuredDB = result;
      }
    )
  }

  prevStepTwo() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
  }

  Start() {
    let param: any = {
      "ownerId": this.userinfoService.getUserId(),
      "workspaceId": this.workspaceHeaderService.getSelectedWorkspaceId(),
      "databaseConfig": {
        "databaseId": this.workspaceHeaderService.getDatabaseID()
      },
      "executionConfig": {
        "process": this.processDetailsObj.process,
        "outputFormat": this.processDetailsObj.outputFormat,
        "tableInclusionRule": this.processDetailsObj.tableIncRule,
        "tableInclusionRelationship": this.processDetailsObj.includeTableRelationship
      },
      "jobParams": {
        "fileSize": this.processDetailsObj.xmlSplitFileSize,
        "maxparallelProcess": this.processDetailsObj.maxParallelProcess,
        "includeTables": this.processDetailsObj.incTable,
        "includeViews": this.processDetailsObj.incView,
        "includeRecordsCount": this.processDetailsObj.incRecordCount,
        "splitDateInXmlForxDBCompatiblity": this.processDetailsObj.xmlXDBCompability,
        "extractLOBwithinXml": this.processDetailsObj.extractLOBWithXML
      }

    };

    this.dbExtractorService.dbExtractor(param).subscribe((result) => {
      console.log(result);
    });
  }

  close(){
    this.router.navigate(['/status']);
  }
}
