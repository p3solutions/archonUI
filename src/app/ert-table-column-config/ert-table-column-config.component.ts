import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { TableDetailsListObj, IngestionDataConfig } from '../ert-landing-page/ert';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ert-table-column-config',
  templateUrl: './ert-table-column-config.component.html',
  styleUrls: ['./ert-table-column-config.component.css']
})
export class ErtTableColumnConfigComponent implements OnInit {
  searchTableName: string;
  ertJobId = '';
  from = '';
  selectedTableList: TableDetailsListObj[] = [];
  selectedTableId = '';
  selectedTableName = '';
  ExpectedTableName = '';
  isDisabled: boolean;
  issaveDisabled: boolean;
  successMsg = '';
  constructor(public router: Router, private workspaceHeaderService: WorkspaceHeaderService,
    private ertService: ErtService, private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) { }

  ngOnInit() {
    this.selectedTableList = this.ertService.selectedList.filter(a => a.isSelected === true);
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (this.selectedTableList[0] !== undefined) {
      this.selectedTableId = this.selectedTableList[0].tableId;
      const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.selectedTableName = tempTableObj.tableName;
      this.ExpectedTableName = tempTableObj.modifiedTableName;
      tempTableObj.isMainTable = true;
    }
  }

  showColumns(value) {
    if (value === 'original') {
      if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
          columnList.filter(a => a.dataType !== 'USERDEFINED');
      } else {
        return [];
      }
    } else if (value === 'expected') {
      if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList
          .filter(a => a.isSelected === true);
      } else {
        return [];
      }
    }
  }

  showColumnsForUserDefined() {
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    if (tempObj !== undefined) {
      if (tempObj.usrDefinedColumnList !== undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
          usrDefinedColumnList.filter(a => a.dataType === 'USERDEFINED' && a.isSelected === true);
      } else if (tempObj.usrDefinedColumnList === undefined) {
        return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
          columnList.filter(a => a.dataType === 'USERDEFINED' && a.isSelected === true);
      }
    } else {
      return [];
    }
  }

  gotoExtractData() {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.from === 'data-record' || this.from === 'SIP') {
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate(['workspace/ert/ert-extract-ingest/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate(['workspace/ert/ert-extract-ingest/'], { queryParams: { from: this.from } });
      }
    } else
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate(['workspace/ert/ert-extract-ingest/', this.ertJobId]);
      } else {
        this.router.navigate(['workspace/ert/ert-extract-ingest']);
      }
  }


  saveERTJob(ertJobStatus: string) {
    this.isDisabled = false;
    this.issaveDisabled = false;
    let selectedList: any = '';
    if (ertJobStatus === 'READY') {
      this.isDisabled = true;
    } else if (ertJobStatus === 'DRAFT') {
      this.issaveDisabled = true;
    }
    for (const item of this.ertService.selectedList) {
      if (item.filterAndOrderConfig.filterConfig === '' && item.filterAndOrderConfig.filterQuery === '') {
        delete item['filterAndOrderConfig'];
      } else if (item.filterAndOrderConfig.filterConfig === null && item.filterAndOrderConfig.filterQuery === null) {
        delete item['filterAndOrderConfig'];

      }
      if (item.usrDefinedColumnList.length === 0) {
        delete item['usrDefinedColumnList'];
      }
      if (item.relatedTableDetails.length === 0) {
        delete item['relatedTableDetails'];
      }
      for (const item1 of item.columnList) {
        if (item1.userColumnQuery === null) {
          delete item1['userColumnQuery'];
        }
        if (item1.viewQuery === null) {
          delete item1['viewQuery'];
        }
      }
    }
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      selectedList = this.ertService.selectedList;
    } else {
      selectedList = this.ertService.selectedList.filter(a => a.isSelected === true);
    }
    let param: any = {
      'userId': this.userinfoService.getUserId(),
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'ertJobStatus': ertJobStatus,
      'schemaResultsTableCount': this.ertService.schemaResultsTableCount.toString(),
      'isIngest': false,
      'databaseConfig': {
        'databaseId': this.workspaceHeaderService.getDatabaseID()
      },
      'ertJobParams': this.ertService.ertJobParams,
      'tableDetailsList': selectedList,
      'ingestionDataConfig': this.ertService.ingestionDataConfig,
      'extractDataConfigInfo': this.ertService.extractDataConfigInfo
    };
    if (this.from === 'data-record') {
      delete param.extractDataConfigInfo['applicationName'];
      delete param.extractDataConfigInfo['holdingName'];
    } else if (this.from === 'SIP') {
      delete param.extractDataConfigInfo['titleName'];
    } else {
      delete param.extractDataConfigInfo['titleName'];
      delete param.extractDataConfigInfo['applicationName'];
      delete param.extractDataConfigInfo['holdingName'];
    }
    param = this.modifiedParamForEdit(param);
    if (param.ingestionDataConfig.infoArchiveName === '' || param.ingestionDataConfig.infoArchiveSchemaName === ''
      || param.ingestionDataConfig.infoArchiveUserName === '' || param.ingestionDataConfig.infoArchivePassword === '') {
      delete param['ingestionDataConfig'];
    } else {
      param.isIngest = true;
    }
    this.ertService.saveErtJob(param).subscribe(result => {
      const msg = ertJobStatus.trim().toUpperCase() === 'DRAFT' ? 'Job successfully saved as draft.' :
        'Job successfully marked as completed.';
      document.getElementById('message-popup-btn').click();
      if (result.errorMessage !== null) {
        document.getElementById('not-saved-popup-btn').click();
        this.successMsg = result.errorMessage !== null ? result.errorMessage : msg;
      } else {
        this.successMsg = msg;
      }
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
      } else {
        document.getElementById('not-saved-popup-btn').click();
        this.successMsg = err.error.errorMessage;
      }
    });
  }


  modifiedParamForEdit(param: any): any {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      param.ertJobId = this.ertJobId;
    }
    if (this.from === 'data-record' || this.from === 'SIP') {
      param.mmrVersion = this.ertService.mmrVersion;
    }
    return param;
  }
  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }
  selectTable(tableId) {
    this.selectedTableId = tableId;
    this.selectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    this.ExpectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
  }
}
