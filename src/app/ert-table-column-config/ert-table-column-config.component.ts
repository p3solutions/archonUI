import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { TableDetailsListObj } from '../ert-landing-page/ert';

@Component({
  selector: 'app-ert-table-column-config',
  templateUrl: './ert-table-column-config.component.html',
  styleUrls: ['./ert-table-column-config.component.css']
})
export class ErtTableColumnConfigComponent implements OnInit {
  ertJobId = '';
  from = '';
  selectedTableList: TableDetailsListObj[] = [];
  selectedTableId = '';
  constructor(public router: Router, private workspaceHeaderService: WorkspaceHeaderService,
    private ertService: ErtService, private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) { }

  ngOnInit() {
    this.selectedTableList = this.ertService.selectedList.filter(a => a.isSelected === true);
    // this.selectedTableId = this.selectedTableList[0].tableId;
  }

  showColumns() {
    if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
      return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    } else {
      return [];
    }
  }

  gotoExtractData() {
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.router.navigate(['workspace/ert/ert-extract-ingest', this.ertJobId]);
    } else {
      this.router.navigate(['workspace/ert/ert-extract-ingest']);
    }
  }

  saveERTJob(ertJobStatus: string) {
    for (const item of this.ertService.selectedList.filter(a => a.isSelected === true)) {
      if (item.filterAndOrderConfig.filterConfig === '' && item.filterAndOrderConfig.filterQuery === '') {
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
      delete item['isSelected'];
    }

    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    let param: any = {
      'userId': this.userinfoService.getUserId(),
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'ertJobStatus': ertJobStatus,
      'schemaResultsTableCount': this.ertService.schemaResultsTableCount.toString(),
      'databaseConfig': {
        'databaseId': this.workspaceHeaderService.getDatabaseID()
      },
      'ertJobParams': this.ertService.ertJobParams,
      'tableDetailsList': this.ertService.selectedList,
      'ingestionDataConfig': this.ertService.ingestionDataConfig,
      'extractDataConfigInfo': this.ertService.extractDataConfigInfo
    };

    param = this.modifiedParamForEdit(param);
    console.log(param);
    this.ertService.saveErtJob(param).subscribe(result => {
      if (result.httpStatus !== 200) {
        alert('Job has not saved successfully');
      }
      this.router.navigate(['workspace/ert/ert-jobs']);
    });
  }

  modifiedParamForEdit(param: any): any {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      param.ertJobId = this.ertJobId;
    }
    if (this.from === 'data-record') {
      param.mmrVersion = this.ertService.mmrVersion;
    }
    return param;
  }
}
