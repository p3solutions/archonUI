import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-schedule-job',
  templateUrl: './schedule-job.component.html',
  styleUrls: ['./schedule-job.component.css']
})
export class ScheduleJobComponent implements OnInit {

  colorTheme = 'theme-dark-blue';
  bsConfig: Partial<BsDatepickerConfig>  = Object.assign({}, { containerClass: this.colorTheme });
  mytime: Date = new Date();
  enddate: Date = new Date();
  startdate: Date = new Date();
  jobType;

  constructor() { }

  ngOnInit() {
  }

  // Start() {
  //   let param: any = {
  //     'ownerId': this.userinfoService.getUserId(),
  //     'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
  //     'databaseConfig': {
  //       'databaseId': this.workspaceHeaderService.getDatabaseID()
  //     },
  //     'executionConfig': {
  //       'process': this.processDetailsObj.process,
  //       'outputFormat': this.processDetailsObj.outputFormat,
  //       'tableInclusionRule': this.processDetailsObj.tableIncRule,
  //       'tableInclusionRelationship': this.processDetailsObj.includeTableRelationship
  //     },
  //     'jobParams': {
  //       'fileSize': this.processDetailsObj.xmlSplitFileSize,
  //       'maxparallelProcess': this.processDetailsObj.maxParallelProcess,
  //       'includeTables': this.processDetailsObj.incTable,
  //       'includeViews': this.processDetailsObj.incView,
  //       'includeRecordsCount': this.processDetailsObj.incRecordCount,
  //       'splitDateInXmlForxDBCompatiblity': this.processDetailsObj.xmlXDBCompability,
  //       'extractLOBwithinXml': this.processDetailsObj.extractLOBWithXML
  //     }
  //   };

  //   param = this.modifiedParamAccToProcess(param);
  //   this.dbExtractorService.dbExtractor(param, this.processDetailsObj.ExecuteQueryObj.queryFileToUpload).subscribe((result) => {
  //     if (result.httpStatus === 200) {
  //       this.isSuccessMsg = true;
  //       this.successMsg = 'Your Job has Started';
  //     } else {
  //       this.isSuccessMsg = false;
  //       this.successMsg = 'Unable to Process Your Job';
  //     }
  //   });
  // }

}
