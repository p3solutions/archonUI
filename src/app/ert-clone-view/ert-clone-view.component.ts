import { Component, OnInit } from '@angular/core';
import { ErtService } from '../ert-landing-page/ert.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErtTableListObj, TableDetailsListObj, ErtColumnListObj, ColumnListObj } from '../ert-landing-page/ert';
import { NgxSpinnerService } from 'ngx-spinner';
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3';
import { getUserId } from '../adhoc-landing-page/adhoc-utility-fn';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ert-clone-view',
  templateUrl: './ert-clone-view.component.html',
  styleUrls: ['./ert-clone-view.component.css']
})
export class ErtCloneViewComponent implements OnInit {
  workspaceId = '';
  ertJobId = '';
  searchTableName = '';
  originalErttableList: ErtTableListObj = new ErtTableListObj(); // to show ert table list in popup when we create or add job.
  totalItemOfOriginalErtTable = 50;
  currentPageOfOriginalErtTable = 1;
  searchOriginalTableName = '';
  isEditErtTableLeft = false;
  selectedTableList: TableDetailsListObj[] = [];
  selectedTableId = '';
  selectedTableName = '';
  ExpectedTableName = '';
  successMsg = '';
  errorMessage = '';
  option = {
    width: 500,
    height: 400,
    useWorker: false,
    zoomScaleExtent: [0.1, 3]
  };
  graphInstance: any = '';

  dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node [shape="plain" padding="0.2" fontsize="5" fontname = "Roboto"' +
    'pad="0.5" ];edge [shape="plain" fontsize="3" fontname = "Roboto" arrowsize="0.3" ]rankdir=LR;';
  constructor(private workspaceHeaderService: WorkspaceHeaderService, public router: Router,
    private ertService: ErtService, public activatedRoute: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    this.getEditErtTableList(this.workspaceId, this.ertJobId, 1);
  }

  getEditErtTableList(workspaceId, ertJobId, currentIndex) {
    this.spinner.show();
    this.ertService.getERTtableList(workspaceId, ertJobId, currentIndex).subscribe(response => {
      try {
        this.originalErttableList = response;
        this.isEditErtTableLeft = response.isSelectedTableLeft;
        const tableIds = this.originalErttableList.ertTableList.map(function (item) { return item['tableId']; });
        for (const tempTable of this.originalErttableList.ertTableList) {
          const tempObj: TableDetailsListObj = new TableDetailsListObj();
          tempObj.tableId = tempTable.tableId;
          tempObj.tableName = tempTable.tableName;
          tempObj.modifiedTableName = tempTable.modifiedTableName;
          if (tempTable.filterNconfig !== null) {
            tempObj.filterAndOrderConfig = tempTable.filterNconfig;
          }
          if (tempTable.relatedTableDetails !== null) {
            tempObj.relatedTableDetails = tempTable.relatedTableDetails;
          }
          tempObj.isSelected = true;
          if (this.selectedTableList.findIndex(a => a.tableId === tempTable.tableId) === -1) {
            this.selectedTableList.push(tempObj);
          }
        }
        this.getEditedERTcolumnlist(ertJobId, workspaceId, tableIds);
      } catch {
        this.spinner.hide();
      }
    });
  }

  getEditedERTcolumnlist(ertJobId, workspaceId, tableIds: string[]) {
    const ertTableColumnMap = new Map();
    let ertColumnList: ErtColumnListObj[] = [];
    this.ertService.getEditedtERTcolumnlist(ertJobId, workspaceId, tableIds).subscribe(response => {
      ertColumnList = response;
      try {
        for (let item = 0; item < tableIds.length; item++) {
          ertTableColumnMap.set(tableIds[item], ertColumnList[item]);
        }
        for (const tableId of tableIds) {
          this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = ertTableColumnMap.get(tableId);
        }
        this.spinner.hide();
        this.showTableRelationship();
      } catch {
        this.spinner.hide();
      }
    });
  }

  showTableRelationship() {
    if (this.selectedTableList[0] !== undefined) {
      this.selectedTableId = this.selectedTableList[0].tableId;
      const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.selectedTableName = tempTableObj.tableName;
      this.ExpectedTableName = tempTableObj.modifiedTableName;
      tempTableObj.isMainTable = true;
      this.createDOTActualTable(this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList);
    }
  }
  selectTable(tableId) {
    this.dotString = 'digraph {graph [pad="0.5", nodesep="0.5", ranksep="2"];node' +
      '[shape="plain" fontname = "Roboto" fontsize ="5" ];edge [shape="plain" fontname = "Roboto" ' +
      'arrowsize="0.3" fontsize ="3" ]rankdir=LR;';
    this.selectedTableId = tableId;
    this.selectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    this.ExpectedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
    // graphviz('#graph', this.option).resetZoom(d3.transition('smooth'));
    // d3.select('svg').remove();
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
      for (const item of tempObj.usrDefinedColumnList.filter(a => a.isSelected === true
        && a.dataType.trim().toUpperCase() === 'USERDEFINED')) {
        this.dotString = this.dotString + '<tr><td align="left" port = "' +
          item.modifiedColumnName + 'end"' + '> ' + item.modifiedColumnName + '  </td></tr>';
      }
    } if (tempObj.columnList.length !== 0) {
      for (const item of tempObj.columnList.filter(a => a.isSelected === true && a.dataType.trim().toUpperCase() === 'USERDEFINED')) {
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
    if (tempObj.columnList.length !== 0) {
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
    this.graphInstance = graphviz('#graph', this.option).transition(this.transitionFactory)
      .tweenShapes(false).attributer(this.attributer).renderDot(this.dotString);
    this.resetZoom();
  }

  resetZoom() {
    graphviz('#graph', this.option).resetZoom(d3.transition().duration(1000));
  }

  attributer(datum, index, nodes) {
    const selection = d3.select(this);
    if (datum.tag === 'svg') {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const x = 200;
      const y = 20;
      const scale = 2;
      selection
        .attr('width', width + 'pt')
        .attr('height', height + 'pt')
        .attr('viewBox', -x + ' ' + -y + ' ' + (width / scale) + ' ' + (height / scale));
      datum.attributes.width = width + 'pt';
      datum.attributes.height = height + 'pt';
      datum.attributes.viewBox = -x + ' ' + -y + ' ' + (width / scale) + ' ' + (height / scale);
    }
  }

  transitionFactory() {
    return d3.transition('main')
      .ease(d3.easeLinear)
      .delay(40)
      .duration(300 * 3);
  }
  createClone() {
    this.spinner.show();
    let ertJobName = '';
    this.ertService.updatedJobName.subscribe(jobName => {
      ertJobName = jobName;
    });
    const param: any = {
      'userId': getUserId(),
      'workspaceId': this.workspaceId,
      'ertJobName': ertJobName,
      'ertJobId': this.ertJobId
    };
    this.ertService.createCloneJob(param).subscribe(res => {
      this.spinner.hide();
      document.getElementById('message-popup-btn').click();
      this.successMsg = 'Job Clone Created Successfully.';
    }, (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        this.spinner.hide();
      } else {
        this.spinner.hide();
        document.getElementById('not-saved-popup-btn').click();
        this.errorMessage = err.error.message;
      }
    });
  }

  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }
}
