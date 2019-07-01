import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from './db-extractor.service';
import { ProgressBarObj } from '../db-extractor';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ConfiguredDB } from '../workspace-objects';
import { ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { UserinfoService } from '../userinfo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-db-extractor',
  templateUrl: './db-extractor.component.html',
  styleUrls: ['./db-extractor.component.css']
})
export class DbExtractorComponent implements OnInit {
  progressBarObj: ProgressBarObj;
  zone: any;
  ExtractData = true;
  uploadData = false;
  sipData = false;
  text: any;
  workspaceName = '';
  configuredDB = new ConfiguredDB();
  // step 1
  processDetailsMap: Map<string, string[]> = new Map<string, string[]>();
  processDetailsList: ProcessDetails[] = [];
  processList: string[] = [];
  outputFormatList: string[] = [];
  processDetailsObj = new ProcessDetailsObj();
  isDisabled: boolean;
  // step 3
  workspaceID: string;
  isSuccessMsg: boolean;
  successMsg: string;
  @ViewChild('click') button: ElementRef;
  scheduleNow: boolean;
  instanceId: any;
  // query mode
  showFileUpload = false;
  executeQueryForm: FormGroup;
  enableNextBtn = true;
  isQueryFileExist = false;
  ProcessDetailsObj: ProcessDetailsObj = new ProcessDetailsObj();
  queryFileToUpload: File = null;
  queryFileName = '';
  errorMessgae = '';
  ExtractDatacheck: boolean;

  constructor(public router: Router, private dbExtractorService: DbExtractorService,
    private workspaceHeaderService: WorkspaceHeaderService, private userinfoService: UserinfoService) {
    this.dbExtractorService.setProcessDetailsObj(null);
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
  }
  ngOnInit() {
    this.dbExtractorService.updatedProgressBarObj.subscribe((progressBarObj) => {
      this.progressBarObj = progressBarObj;
      // this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
    });
    this.workspaceName = this.workspaceHeaderService.getSelectedWorkspaceName();
    this.dbExtractorService.getDBInfoByID(this.workspaceHeaderService.getDatabaseID()).subscribe(
      (result) => {
        this.configuredDB = result;
      }
    );
    this.getProcessDetails();
  }

  getProcessDetails() {
    this.dbExtractorService.getProcessDetails().subscribe((processDetailsList) => {
      this.processDetailsList = processDetailsList;
      console.log(this.processDetailsList, 'detatils');
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
    if (!process) {
      this.ExtractData = true;
    }
  }

  setOutputFormat(outputFormat: string) {
    if (!outputFormat) {
      this.ExtractData = true;
    } else {
      this.ExtractData = false;
    }
    if (outputFormat === 'sip') {
      this.ExtractData = true;
      if (this.processDetailsObj.sipApplicationName === '' && this.processDetailsObj.holdingPrefix === '') {
        this.ExtractData = true;
      } else {
        this.ExtractData = false;
      }
      this.sipData = true;
    } else {
      this.sipData = false;
    }
    this.processDetailsObj.outputFormat = outputFormat;
  }

  enableNextBtnFn() {
    if (this.processDetailsObj.outputFormat === 'sip') {
      this.ExtractData = true;
      if (this.processDetailsObj.sipApplicationName === '' || this.processDetailsObj.holdingPrefix === '') {
        this.ExtractData = true;
      } else {
        this.ExtractData = false;
      }
    }
  }
  updateaccess() {
    if (this.processDetailsObj.incTable === true) {
      console.log(this.processDetailsObj.incTable, 'test');
      this.ExtractDatacheck = true;
    }  else {
      console.log(this.processDetailsObj.incTable, 'test3');
      this.ExtractDatacheck = false;
    }

  }

  setXMLFileSplitSize(xmlSliderObj: any) {
    this.processDetailsObj.xmlSplitFileSize = xmlSliderObj;
  }

  setMaxParallelProcess(maxParallelSliderObj: any) {
    this.processDetailsObj.maxParallelProcess = maxParallelSliderObj;
  }

  gotoLastStep() {
   if (this.showFileUpload) {
    this.processDetailsObj.ExecuteQueryObj.queryFileToUpload = this.queryFileToUpload ?
    this.queryFileToUpload : this.processDetailsObj.ExecuteQueryObj.queryFileToUpload;
      this.processDetailsObj.ExecuteQueryObj.query = '';
    } else {
      this.processDetailsObj.ExecuteQueryObj.queryFileToUpload = null;
    }
    this.dbExtractorService.setProcessDetailsObj(this.processDetailsObj);
  }

  close() {
    if (this.isSuccessMsg) {
      if (this.scheduleNow) {
        this.router.navigate(['/activity/status']);
      } else {
        this.router.navigate(['/activity/schedule-monitoring']);
      }
    } else {
      this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
    }
  }

  Start($event) {
    const el: HTMLElement = this.button.nativeElement as HTMLElement;
    this.scheduleNow = $event.scheduleNow;
    if ($event.ins === 'Local') {
      this.instanceId = '';
    } else {
    this.instanceId = $event.ins;
  }
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
      'sipConfig': {
        'sipApplicationName': this.processDetailsObj.sipApplicationName,
       'sipHoldingPrefix': this.processDetailsObj.holdingPrefix
     },
      'scheduledConfig': $event
    };
    delete param.scheduledConfig['ins'];
    param = this.modifiedParamAccToProcess(param);
    this.dbExtractorService.dbExtractor(param, this.processDetailsObj.ExecuteQueryObj.queryFileToUpload,
      this.instanceId).subscribe((result) => {
      el.click();
      if (result.httpStatus === 200) {
        this.isSuccessMsg = true;
        this.successMsg = 'Your Job has Started';
      } else {
        this.isSuccessMsg = false;
        this.successMsg = 'Unable to Process Your Job';
      }
    });
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


  // query mode
  setUploadQueryFile(event) {
    this.showFileUpload = event.source.checked;
    this.processDetailsObj.ExecuteQueryObj.isQueryFile = this.showFileUpload;
  }

  uploadQueryFile(files: FileList) {
    this.uploadData = false;
    const ext = files.item(0).name.match(/\.([^\.]+)$/)[1];
    this.isQueryFileExist = files != null ? true : false;
    // if (this.executeQueryForm.value.queryTitle && this.isQueryFileExist
    //   && this.executeQueryForm.value.isQueryFile === true && ext === 'sql') {
    //   this.enableNextBtn = false;
    // }
    this.queryFileToUpload = files.item(0);
    if (ext === 'sql') {
      this.uploadData = true;
      this.queryFileName = files.item(0).name;
      this.ProcessDetailsObj.ExecuteQueryObj.queryFileName = this.queryFileName;
    } else {
      this.enableNextBtn = true;
      this.uploadData = true;
      this.queryFileName = 'please upload .sql file only';
    }
  }

  closeMessage () {
    this.uploadData = false;
    this.processDetailsObj.ExecuteQueryObj.queryFileToUpload = null;
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
