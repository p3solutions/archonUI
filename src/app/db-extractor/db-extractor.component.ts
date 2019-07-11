import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from './db-extractor.service';
import { ProgressBarObj } from '../db-extractor';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ConfiguredDB } from '../workspace-objects';
import { ProcessDetails, ProcessDetailsObj } from '../db-extractor';
import { UserinfoService } from '../userinfo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermissionService } from '../permission-utility-functions/permission.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  queryvalidate: boolean;
  splitSize = [];
  permissionToUser = '';

  constructor(public router: Router, private dbExtractorService: DbExtractorService, private permissionService: PermissionService,
    private workspaceHeaderService: WorkspaceHeaderService, private spinner: NgxSpinnerService, private userinfoService: UserinfoService) {
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
    this.xmlsplitsize();
    this.permissionToUser = this.permissionService.getRdbmsPermission();
  }

  getProcessDetails() {
    this.spinner.show();
    try {
      this.dbExtractorService.getProcessDetails().subscribe((processDetailsList) => {
        this.processDetailsList = processDetailsList;
        for (const item of this.processDetailsList) {
          this.processDetailsMap.set(item['process'], item['supportedOutputFormats']);
        }
        this.processList = Array.from(this.processDetailsMap.keys());
        if (this.dbExtractorService.getProcessDetailsObj() != null) {
          this.processDetailsObj = this.dbExtractorService.getProcessDetailsObj();
          this.outputFormatList = this.processDetailsMap.get(this.processDetailsObj.process);
        } else {
          this.processDetailsObj = new ProcessDetailsObj();
        }
        this.spinner.hide();
      });
    } catch {
      this.spinner.hide();
    }
  }
  xmlsplitsize() {
    for (let i = 1; i < 101; i++) {
      this.splitSize.push(i * 10);
    }
    return this.splitSize;
  }

  getOutputFormatListBySecProcess(process: string) {
    this.showFileUpload = false;
    this.isDisabled = false;
    if (process != null) {
      this.processDetailsObj.process = process;
      if (process === 'Extract Data') {
        this.processDetailsObj.ExecuteQueryObj.queryTitle = '';
        this.processDetailsObj.ExecuteQueryObj.query = '';
        if (this.processDetailsObj.outputFormat != null) {
          this.ExtractData = false;
        } else {
          this.ExtractData = true;
        }
      }
      if (process === 'Get Record Count') {
        this.processDetailsObj.ExecuteQueryObj.queryTitle = '';
        this.processDetailsObj.ExecuteQueryObj.query = '';
        if (this.processDetailsObj.outputFormat != null) {
          this.ExtractData = false;
        } else {
          this.ExtractData = true;
        }
      }
      if (this.processDetailsObj.outputFormat === 'sip' && process === 'Get Record Count') {
        this.sipData = false;
        this.ExtractData = true;
        this.processDetailsObj.outputFormat = null;
      }
      if (process === 'Execute Query') {
        this.isDisabled = true;
        this.processDetailsObj.tableIncRule = '';
        if (this.processDetailsObj.process === 'Execute Query') {
          if (this.processDetailsObj.ExecuteQueryObj.queryTitle === '' || this.processDetailsObj.outputFormat === null
            || this.processDetailsObj.ExecuteQueryObj.query === '') {
            this.ExtractData = true;
          } else {
            this.ExtractData = false;
          }
        }
      }
      if (process === 'Get Record Count') {
        this.processDetailsObj.ExecuteQueryObj.queryTitle = '';
        this.processDetailsObj.ExecuteQueryObj.query = '';
        this.processDetailsObj.sipApplicationName = '';
        this.processDetailsObj.holdingPrefix = '';
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
    this.ExtractData = true;
    if (!outputFormat) {
      this.ExtractData = true;
    }
    if (this.processDetailsObj.process === 'Get Record Count' && outputFormat != null) {
      this.ExtractData = false;
    }
    if (this.processDetailsObj.process === 'Extract Data' || outputFormat != null) {
      this.ExtractData = false;
    }
    if (this.processDetailsObj.process === 'Execute Query') {
      if (this.processDetailsObj.ExecuteQueryObj.queryTitle === '' || this.processDetailsObj.outputFormat === null
        || this.processDetailsObj.ExecuteQueryObj.query === '') {
        this.ExtractData = true;
      } else {
        this.ExtractData = false;
      }
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
    if (this.processDetailsObj.process === 'Execute Query' && this.showFileUpload === false) {
      if (this.processDetailsObj.ExecuteQueryObj.queryTitle === '' || this.processDetailsObj.ExecuteQueryObj.query === '' ||
        this.processDetailsObj.outputFormat === null) {
        this.ExtractData = true;
      } else {
        this.ExtractData = false;
      }
    }
    if (this.processDetailsObj.process === 'Execute Query' && this.showFileUpload === true) {
      if (this.processDetailsObj.ExecuteQueryObj.queryTitle === '' || this.ProcessDetailsObj.ExecuteQueryObj.queryFileName === '' ||
        this.processDetailsObj.outputFormat === null) {
        this.ExtractData = true;
      } else {
        this.ExtractData = false;
      }
    }
  }
  updateaccess() {
    if (this.processDetailsObj.incTable === false && this.processDetailsObj.incView === false) {
      this.ExtractDatacheck = true;
    } else {
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
    this.queryvalidate = true;
    if (this.showFileUpload) {
      this.processDetailsObj.ExecuteQueryObj.queryFileToUpload = this.queryFileToUpload ?
        this.queryFileToUpload : this.processDetailsObj.ExecuteQueryObj.queryFileToUpload;
      this.processDetailsObj.ExecuteQueryObj.query = '';
    } else {
      this.processDetailsObj.ExecuteQueryObj.queryFileToUpload = null;
    }
    if (this.showFileUpload === false && this.processDetailsObj.ExecuteQueryObj.queryTitle !== '' &&
      this.processDetailsObj.ExecuteQueryObj.query !== '') {
      this.queryvalidate = false;
      if (this.validateQuery()) {
        this.queryvalidate = true;
      }
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
    this.spinner.show();
    try {
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
          if (result.httpStatus === 200) {
            el.click();
            this.isSuccessMsg = true;
            this.successMsg = 'Your Job has Started';
          } else {
            document.getElementById('warning-popup-job').click();
            this.isSuccessMsg = false;
            this.successMsg = 'Unable to Process Your Job';
          }
          this.spinner.hide();
        }, (err: HttpErrorResponse) => {
          this.spinner.hide();
          this.successMsg = err.error.message;
          this.isSuccessMsg = false;
          document.getElementById('warning-popup-job').click();
        });
    } catch {
      this.spinner.hide();
    }
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
    this.ExtractData = true;
    this.uploadData = false;
    this.showFileUpload = event.source.checked;
    if (this.showFileUpload) {
      this.ExtractData = true;
      this.processDetailsObj.ExecuteQueryObj.query = '';
    }
    this.processDetailsObj.ExecuteQueryObj.isQueryFile = this.showFileUpload;
  }

  uploadQueryFile(files: FileList) {
    this.uploadData = false;
    this.ExtractData = true;
    const ext = files.item(0).name.match(/\.([^\.]+)$/)[1];
    this.isQueryFileExist = files != null ? true : false;
    if (this.processDetailsObj.ExecuteQueryObj.queryTitle && this.isQueryFileExist && this.processDetailsObj.outputFormat != null
      && this.processDetailsObj.ExecuteQueryObj.isQueryFile === true && ext === 'sql') {
      this.ExtractData = false;
    }
    this.queryFileToUpload = files.item(0);
    if (ext === 'sql') {
      this.uploadData = true;
      this.queryFileName = files.item(0).name;
      this.ProcessDetailsObj.ExecuteQueryObj.queryFileName = this.queryFileName;
    } else {
      this.ExtractData = true;
      this.uploadData = true;
      this.queryFileName = 'Please upload .sql file only';
    }
  }

  closeMessage() {
    this.queryFileToUpload = null;
    this.ExtractData = true;
    this.uploadData = false;
    this.processDetailsObj.ExecuteQueryObj.queryFileToUpload = null;
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

  validateQuery(): boolean {
    let isValid = true;
    const queryTitleList: string[] = [];
    let queryTitles: string[] = [];
    let query: string[] = [];
    query = this.processDetailsObj.ExecuteQueryObj.query.split(';');
    queryTitles = this.processDetailsObj.ExecuteQueryObj.queryTitle.split(';');
    for (const queryTitle of queryTitles) {
      if (queryTitleList.length === 0) {
        queryTitleList.push(queryTitle);
        isValid = true;
      } else {
        if (!queryTitleList.includes(queryTitle)) {
          queryTitleList.push(queryTitle);
          isValid = true;
        } else {
          document.getElementById('success-popup-btn').click();
          this.errorMessgae = 'Duplicate query title is present.';
          isValid = false;
          break;
        }
      }
    }
    if (isValid) {
      if (queryTitles.length !== query.length) {
        isValid = false;
        this.errorMessgae = 'Number of query title is not equal to number of query. Please check.';
        document.getElementById('success-popup-btn').click();
      }
    }
    return isValid;
  }
}
