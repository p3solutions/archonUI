import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StoredProcView, SelectedTableNameListObj, TableNameAndRelatingTable, SpvInfo, SpvNameList, ColumnList, RelatingTableList } from './stored-proc-view';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { stringify } from '@angular/compiler/src/util';
import { StoredProcViewService } from './stored-proc-view.service';
import { ConstantPool, isNgTemplate } from '@angular/compiler';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-stored-proc-view',
  templateUrl: './stored-proc-view.component.html',
  styleUrls: ['./stored-proc-view.component.css']
})
export class StoredProcViewComponent implements OnInit {
  tableName: string;
  tableNameAndRelatingTableObj: TableNameAndRelatingTable = new TableNameAndRelatingTable();
  spvTableId = '';
  spvName = '';
  spvType = '';
  disableSubmitBtn = true;
  primaryTableId = '';
  workspaceid = '';
  updateNotif: boolean;
  updateSuccess: boolean;
  errorMsg: any;
  isSPVAvailable: boolean;
  displayedColumns: string[] = ['pColumn', 'sColumn', 'dataType'];
  columnsList: any;
  homeStage: boolean;
  dataSource: MatTableDataSource<ColumnList>;
  columnlength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectedTable = '';
  SpvInfoList: SpvInfo[] = [];
  successMsg = '';
  constructor(private workspaceHeaderService: WorkspaceHeaderService,
    private storedProcViewService: StoredProcViewService,
    private spinner: NgxSpinnerService,
    private router: Router, private tablelistService: TableListService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.tableName = this.storedProcViewService.tableName;
    this.workspaceid = this.workspaceHeaderService.getSelectedWorkspaceId();
    try {
      this.storedProcViewService.getSPVNameList(this.workspaceid, this.tableName).subscribe((result) => {
        if (result.tableId !== null || result.spvInfoList !== null) {
          this.primaryTableId = result.tableId;
          let tempObj = new SpvInfo();
          if (result.spvInfoList !== undefined) {
            for (const spvItem of result.spvInfoList) {
              tempObj = new SpvInfo();
              tempObj.name = spvItem.name;
              tempObj.type = spvItem.type;
              this.SpvInfoList.push(tempObj);
            }
            this.isSPVAvailable = true;
          }
          if (this.SpvInfoList.length === 0) {
            this.isSPVAvailable = false;
          }
        }
        this.spinner.hide();
      }, (err: HttpErrorResponse) => {
        if (err.error) {
          this.spinner.hide();
        }
      });
    } catch {
      this.spinner.hide();
    }
  }


  getTableNameList(name: string) {
    try {
      this.columnlength = 0;
      this.spvName = name;
      const tempRelatedList1 = this.SpvInfoList.filter(a => a.name === name)[0].relatingTableList;
      // Request for relatingTable
      if (tempRelatedList1.length === 0) {
        this.spinner.show();
        this.storedProcViewService.getRelatingTableNameList(this.workspaceid, this.tableName, name).subscribe((result) => {
          this.tableNameAndRelatingTableObj = result;
          let tableName: string;
          let relatedObj = new RelatingTableList();
          const tempRelatedList = this.SpvInfoList.filter(a => a.name === result.spvInfo.name)[0].relatingTableList;
          for (const item of this.tableNameAndRelatingTableObj.spvInfo.relatingTableList) {
            relatedObj = new RelatingTableList();
            relatedObj.tableId = item.tableId;
            relatedObj.tableName = item.tableName;
            tableName = item.tableName;
            tempRelatedList.push(relatedObj);
            for (const joinItem of item.joinInfoList) {
              relatedObj.spvRelatedTableList.push({
                tableId: item.tableId,
                tableName: tableName, pColumn: joinItem.primaryColumn.columnName,
                sColumn: joinItem.secondaryColumn.columnName, dataType: joinItem.primaryColumn.dataType
              });
            }
          }
          this.spinner.hide();
        });
      } else {
        this.showTables();
      }
    } catch {
      this.spinner.hide();
    }
  }

  selectSPVName(spvName: string, evt) {
    this.spvName = spvName;
    this.columnlength = 0;
    if (evt.target.checked) {
      this.SpvInfoList.filter(a => a.name === spvName)[0].isSelected = true;
    } else {
      this.SpvInfoList.filter(a => a.name === spvName)[0].isSelected = false;
      this.SpvInfoList.filter(a => a.name === spvName)[0].relatingTableList.forEach(b => b.isSelected = false);
    }
    this.getTableNameList(spvName);
    this.enableSubmitBtn();
    this.columnlength = 0;
    evt.stopPropagation();
  }

  showSPVRelatedTableName(param) {
    this.spvTableId = param.tableId;
    this.columnlength = 0;
    this.showTables();
  }

  selectTableNames(tableId, event) {
    this.spvTableId = tableId;
    const spvNameObj = this.SpvInfoList.filter(a => a.name === this.spvName)[0];
    if (event.target.checked) {
      spvNameObj.isSelected = true;
      spvNameObj.relatingTableList.filter(a => a.tableId === tableId)[0].isSelected = true;
    } else {
      spvNameObj.relatingTableList.filter(a => a.tableId === tableId)[0].isSelected = false;
      const length = spvNameObj.relatingTableList.filter(a => a.isSelected === true).length;
      if (length === 0) {
        spvNameObj.isSelected = false;
      } else {
        spvNameObj.isSelected = true;
      }
    }
    if (event.target.checked) {
      this.showTables();
    }
    this.enableSubmitBtn();
    event.stopPropagation();
  }

  showTables() {
    this.columnsList = this.SpvInfoList.filter(a => a.name === this.spvName)[0].relatingTableList.
      filter(b => b.tableId === this.spvTableId)[0].spvRelatedTableList;
    this.dataSource = new MatTableDataSource(this.columnsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.columnlength = this.columnsList.length;
  }

  enableSubmitBtn() {
    const tempSpv = this.SpvInfoList.filter(a => a.isSelected === true);
    if (tempSpv.length === 0) {
      this.disableSubmitBtn = true;
    } else {
      for (const item of tempSpv) {
        if (item.relatingTableList.filter(a => a.isSelected === true).length > 0) {
          this.disableSubmitBtn = false;
          break;
        } else {
          this.disableSubmitBtn = true;
        }
      }
    }
  }

  addSPVJoin() {
    try {
      this.updateNotif = false;
      this.updateSuccess = false;
      const SpvInfoList1 = this.SpvInfoList.filter(a => a.isSelected === true);
      for (const spv of SpvInfoList1) {
        spv.relatingTableList = spv.relatingTableList.filter(a => a.isSelected === true);
      }
      const paramObj = {
        'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
        'primaryTable': {
          'tableId': this.primaryTableId,
          'tableName': this.tableName,
        },
        'spvInfoList': SpvInfoList1
      };
      this.spinner.show();
      this.storedProcViewService.createSPVAddJoin(paramObj).subscribe((res) => {
        if (res && res.errorDetails.length === 0) {
          document.getElementById('spvsmsg').click();
          this.successMsg = 'New Join Added Successfully.';
          this.updateSuccess = true;
          // this.storedProcViewService.changeSPVBooleanValue(true);
          this.spinner.hide();
        } else {
          document.getElementById('spvemsg').click();
          this.errorMsg = res.errorDetails[0].errors[0].errorMessage;
          this.updateNotif = true;
          this.spinner.hide();
        }
        this.spinner.hide();
      }, (err => {
        console.log(err);
        this.spinner.hide();
      }));
    } catch {
      this.spinner.show();
    }
  }

  closeErrorMsg() {
    this.errorMsg = '';
    this.updateNotif = false;
    this.updateSuccess = false;
  }
  gotoBack() {
    this.homeStage = true;
  }
  closeScreen() {
    this.router.navigate(['/workspace/metalyzer/ALL/analysis']);
    this.storedProcViewService.changeSPVBooleanValue(true);
  }
  selectAllSp(event) {
    // if (event.target.checked) {
    //   $('input:checkbox:not(:checked).sp-select').click();
    // } else {
    //   $('input:checkbox:checked.sp-select').click();
    // }
  }
  selectAllRelation(event) {
    // if (event.target.checked) {
    //   $('input:checkbox:not(:checked).relation-select').click();
    // } else {
    //   $('input:checkbox:checked.relation-select').click();
    // }
  }

  getRelatedTable() {
    if (this.spvName !== '') {
      return this.SpvInfoList.filter(a => a.name === this.spvName)[0].relatingTableList;
    } else {
      return [];
    }
  }
}
