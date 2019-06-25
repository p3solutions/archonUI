import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { TableDetailsListObj, IngestionDataConfig, ColumnListObj } from '../ert-landing-page/ert';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3';
import { zoom, zoomTransform, zoomIdentity } from "d3-zoom";
import { interpolate } from "d3-interpolate";

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
  errorMessage = '';
  option = {
    useWorker: false,
    zoom: true,
    zoomScaleExtent: [0.1, 1.2]
  };
  graphInstance: any = '';
  dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node [shape="plain" padding="0.2" fontsize="5" fontname = "Roboto" pad="0.5" ];edge [shape="plain" fontsize="2" fontname = "Roboto" arrowsize="0.3" ]rankdir=LR;';
  constructor(public router: Router, private workspaceHeaderService: WorkspaceHeaderService, private spinner: NgxSpinnerService,
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
      this.createDOTActualTable(this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList);
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
    try {
      this.errorMessage = '';
      this.spinner.show();
      this.isDisabled = false;
      this.issaveDisabled = false;
      let selectedList: any = '';
      if (ertJobStatus === 'READY') {
        this.isDisabled = true;
      } else if (ertJobStatus === 'DRAFT') {
        this.issaveDisabled = true;
      }
      for (const item of this.ertService.selectedList) {
        if (item.filterAndOrderConfig !== undefined &&
          item.filterAndOrderConfig.filterConfig === '' && item.filterAndOrderConfig.filterQuery === '') {
          delete item['filterAndOrderConfig'];
        } else if (item.filterAndOrderConfig !== undefined
          && item.filterAndOrderConfig.filterConfig === null && item.filterAndOrderConfig.filterQuery === null) {
          delete item['filterAndOrderConfig'];
        }
        if (item.usrDefinedColumnList !== undefined && item.usrDefinedColumnList.length === 0) {
          delete item['usrDefinedColumnList'];
        }
        if (item.relatedTableDetails !== undefined && item.relatedTableDetails.length === 0) {
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
        this.spinner.hide();
        const msg = ertJobStatus.trim().toUpperCase() === 'DRAFT' ? 'Job successfully saved as draft.' :
          'Job successfully marked as completed.';
        this.spinner.hide();
        document.getElementById('message-popup-btn').click();
        this.successMsg = msg;
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
          document.getElementById('not-saved-popup-btn').click();
          this.errorMessage = err.error.message;
        }
      });
    } catch {
      this.spinner.hide();
    }
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
    this.dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node [shape="plain" fontname = "Roboto" fontsize ="5" ];edge [shape="plain" fontname = "Roboto" arrowsize="0.3" fontsize ="2" ]rankdir=LR;';
    this.selectedTableId = tableId;
    this.selectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    this.ExpectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
    // graphviz('#graph', this.option).resetZoom(d3.transition('smooth'));
    d3.select('svg').remove();
    this.createDOTActualTable(this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList);
  }

  createDOTActualTable(columnList: ColumnListObj[]) {
    this.dotString = this.dotString + this.selectedTableName + 'original' + '[label=<<table border="0" cellborder="1" cellspacing="0">';
    this.dotString = this.dotString + '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left">' + this.selectedTableName + '   </td></tr>';
    for (const item of columnList.filter(a => a.dataType !== 'USERDEFINED')) {
      this.dotString = this.dotString + '<tr><td align="left" port = "' +
        item.originalColumnName + 'start"' + '> ' + item.originalColumnName + '  </td></tr>';
    }
    this.dotString = this.dotString + '</table>>];';
    this.createDOTExpectedTable(columnList);

  }

  createDOTExpectedTable(columnList: ColumnListObj[]) {
    this.dotString = this.dotString + this.ExpectedTableName + 'expected' + '[label=<<table border="0" cellborder="1" cellspacing="0">';
    this.dotString = this.dotString + '<tr><td bgcolor="#eef2f9" cellspacing="1" align="left">' + this.ExpectedTableName + '   </td></tr>';
    for (const item of columnList.filter(a => a.isSelected === true && a.dataType !== 'USERDEFINED')) {
      this.dotString = this.dotString + '<tr><td align="left" port = "' +
        item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
    }
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];

    if (tempObj.usrDefinedColumnList.length !== 0) {
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        this.dotString = this.dotString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
      }
    } if (tempObj.usrDefinedColumnList.length === 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        this.dotString = this.dotString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '>' + item.modifiedColumnName + '  </td></tr>';
      }
    }

    this.dotString = this.dotString + '</table>>];';
    this.createTableLink(columnList);
  }


  createTableLink(columnList: ColumnListObj[]) {
    for (const item of columnList.filter(a => a.isSelected === true && a.dataType !== 'USERDEFINED')) {
      this.dotString = this.dotString + this.selectedTableName + 'original:' + item.originalColumnName + 'start' + ' -> ' +
        this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end; ';
    }
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];

    if (tempObj.usrDefinedColumnList.length !== 0) {
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        const a = JSON.parse(item.userColumnQuery.replace(/'/g, '"'));
        for (const list of a) {
          this.dotString = this.dotString + this.selectedTableName + 'original:' + list.column + 'start' + ' -> ' +
            this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end' + '[label="' + item.viewQuery + '"]' + '; ';
        }
      }
    }
    if (tempObj.usrDefinedColumnList.length === 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType === 'USERDEFINED')) {
        const a = JSON.parse(item.userColumnQuery.replace(/'/g, '"'));
        for (const list of a) {
          this.dotString = this.dotString + this.selectedTableName + 'original:' + list.column + 'start' + ' -> ' +
            this.ExpectedTableName + 'expected:' + item.modifiedColumnName + 'end' + '[label="' + item.viewQuery + '"]' + '; ';
        }
      }
    }

    this.dotString = this.dotString + '}';
    this.drawTableRelationship();
  }

  drawTableRelationship() {
    this.graphInstance = graphviz('#graph', this.option).attributer(this.attributer).renderDot(this.dotString);
    d3.select(window).on("click", this.resetZoom());
    d3.forceSimulation().force('center', d3.forceCenter(1000 / 2, 1000 / 4))
  }


  resetZoom() {
    graphviz('#graph', this.option).resetZoom(d3.transition().duration(1000));
  }

  attributer(datum, index, nodes) {
    const selection = d3.select(this);
    if (datum.tag === 'svg') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      selection
        .attr('width', width)
        .attr('height', height);
      datum.attributes.width = width - 30;
      datum.attributes.height = height - 30;
    }
  }

  resizeSVG() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3.select('#graph').selectWithoutDataPropagation('svg');
    svg
      .transition()
      .duration(700)
      .attr('width', width - 40)
      .attr('height', height - 40);
    const d = svg.datum();
    d.attributes['width'] = width - 30;
    d.attributes['height'] = height - 30;
  };
}
