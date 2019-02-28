import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ProcessDetailsObj } from '../db-extractor';
import { UserinfoService } from '../userinfo.service';
import { ConfiguredDB } from '../workspace-objects';

@Component({
  selector: 'app-db-extractor-last-step',
  templateUrl: './db-extractor-last-step.component.html',
  styleUrls: ['./db-extractor-last-step.component.css']
})


export class DbExtractorLastStepComponent implements OnInit {
  workspaceID: string;
  isSuccessMsg: boolean;
  successMsg: string;
  processDetailsObj = new ProcessDetailsObj();
  configuredDB = new ConfiguredDB();
  constructor(private router: Router, private dbExtractorService: DbExtractorService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private userinfoService: UserinfoService) { }
  ngOnInit() {
    this.processDetailsObj = this.dbExtractorService.getProcessDetailsObj();
    this.dbExtractorService.getDBInfoByID(this.workspaceHeaderService.getDatabaseID()).subscribe(
      (result) => {
        this.configuredDB = result;
      }
    );
  }

  Start($event) {
    let param: any = {
      'ownerId': this.userinfoService.getUserId(),
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'databaseConfig': {
        'databaseId': this.workspaceHeaderService.getDatabaseID()
      },
      'executionConfig': {
        'process': this.processDetailsObj.process,
        'outputFormat': this.processDetailsObj.outputFormat,
        'tableInclusionRule': this.processDetailsObj.tableIncRule,
        'tableInclusionRelationship': this.processDetailsObj.includeTableRelationship
      },
      'jobParams': {
        'fileSize': this.processDetailsObj.xmlSplitFileSize,
        'maxparallelProcess': this.processDetailsObj.maxParallelProcess,
        'includeTables': this.processDetailsObj.incTable,
        'includeViews': this.processDetailsObj.incView,
        'includeRecordsCount': this.processDetailsObj.incRecordCount,
        'splitDateInXmlForxDBCompatiblity': this.processDetailsObj.xmlXDBCompability,
        'extractLOBwithinXml': this.processDetailsObj.extractLOBWithXML
      },
      'scheduledConfig': $event
    };
    param = this.modifiedParamAccToProcess(param);
    this.dbExtractorService.dbExtractor(param, this.processDetailsObj.ExecuteQueryObj.queryFileToUpload).subscribe((result) => {
      if (result.httpStatus === 200) {
        this.isSuccessMsg = true;
        this.successMsg = 'Your Job has Started';
      } else {
        this.isSuccessMsg = false;
        this.successMsg = 'Unable to Process Your Job';
      }
    });
  }



  prevStepTwo() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 });
    this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
  }

  modifiedParamAccToProcess(param: any): any {
    if (this.processDetailsObj.process.replace(/\s+/g, '').toLowerCase() === 'executequery') {
      param.executionConfig.queryMode = {
        'queryTitle': this.processDetailsObj.ExecuteQueryObj.queryTitle,
        'query': this.processDetailsObj.ExecuteQueryObj.query,
        'isQueryFile': this.processDetailsObj.ExecuteQueryObj.isQueryFile
      };
    }
    return param;
  }


  close() {
    if (this.isSuccessMsg) {
      this.router.navigate(['/status']);
    } else {
      this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
    }
  }

  goToEdit(value: string) {
    if (value === 'editParameter') {
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 });
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
    } else if (value === 'editQueryDetails') {
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 });
      this.router.navigate(['/workspace/db-extractor/db-extractor-exec-query']);
    } else {
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
      this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
    }
  }

  getMultiConditionResultForFile() {
    if (this.processDetailsObj.process === 'Execute Query' && this.processDetailsObj.ExecuteQueryObj.isQueryFile === true) {
      return true;
    } else {
      return false;
    }
  }

  getMultiConditionResultForQuery() {
    if (this.processDetailsObj.process === 'Execute Query' && this.processDetailsObj.ExecuteQueryObj.isQueryFile === false) {
      return true;
    } else {
      return false;
    }
  }
}
