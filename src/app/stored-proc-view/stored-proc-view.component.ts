import { Component, OnInit, Input } from '@angular/core';
import { StoredProcView, SelectedTableNameListObj, TableNameAndRelatingTable, SpvInfo, SpvNameList } from './stored-proc-view';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { stringify } from '@angular/compiler/src/util';
import { StoredProcViewService } from './stored-proc-view.service';
import { ConstantPool, isNgTemplate } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';

@Component({
  selector: 'app-stored-proc-view',
  templateUrl: './stored-proc-view.component.html',
  styleUrls: ['./stored-proc-view.component.css']
})
export class StoredProcViewComponent implements OnInit {
  tableName: string;
  spvRelatedTableList: { tableId: string, tableName: string, pColumn: string, sColumn: string, dataType: string }[] = [];
  spvTableNameList: { isTableChecked: boolean, tableName: string, isBorderSet: boolean, tableId: string }[] = [];
  spvInfoListTwo: { isSPVChecked: boolean, type: string, name: string, isBorderSet: boolean }[] = [];
  spvInfoList: SpvNameList = new SpvNameList();
  tableNameAndRelatingTableObj: TableNameAndRelatingTable = new TableNameAndRelatingTable();
  spvTableId = '';
  spvName = '';
  spvType = '';
  disableSubmitBtn = true;
  primaryTableId = '';
  selectedSPVJoinList: { type: string, name: string, relatingTableList: SelectedTableNameListObj[] }[] = [];
  selectedRelatingTableNameList: { tableId: string, tableName: string, }[] = [];
  selectedSPVName: { type: string, name: string };
  tempSPVObj: { isSPVChecked: boolean, type: string, name: string, isBorderSet: boolean }
    = { isSPVChecked: false, type: '', name: '', isBorderSet: false };
  workspaceid = '';
  updateNotif: boolean;
  updateSuccess: boolean;
  errorMsg: any;
  isSPVAvailable: boolean;
  displayedColumns: string[] = ['PrimaryColumn', 'SecondaryColumn', 'DataType'];
  columnsList: any;
  homeStage: boolean;
  dataSource = new MatTableDataSource<any>(this.columnsList);
  constructor(private workspaceHeaderService: WorkspaceHeaderService,
    private storedProcViewService: StoredProcViewService, private router: Router, private tablelistService: TableListService) {
  }

  ngOnInit() {
    this.tableName = this.storedProcViewService.tableName;
    this.workspaceid = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.storedProcViewService.getSPVNameList(this.workspaceid, this.tableName).subscribe((result) => {
      if (result.tableId !== null || result.spvInfoList !== null) {
        this.primaryTableId = result.tableId;
        this.spvInfoListTwo = result.spvInfoList.map(obj => ({ isSPVChecked: false, type: obj.type, name: obj.name, isBorderSet: false }));
        this.isSPVAvailable = true;
        if (this.spvInfoListTwo.length === 0) {
          this.isSPVAvailable = false;
        }
      }
    });
  }


  getTableNameList(name: string) {
    this.spvInfoListTwo.forEach(a => a.isBorderSet = false);
    this.tempSPVObj = this.spvInfoListTwo.filter(a => a.name === name)[0];
    this.tempSPVObj.isBorderSet = true;
    this.spvName = this.tempSPVObj.name;
    this.spvType = this.tempSPVObj.type;
    // Request for relatingTable
    this.storedProcViewService.getRelatingTableNameList(this.workspaceid, this.tableName, name).subscribe((result) => {
      this.tableNameAndRelatingTableObj = result;
      let tableName: string;
      this.spvTableNameList = [];
      this.spvRelatedTableList = [];
      this.spvTableId = '';
      for (const item of this.tableNameAndRelatingTableObj.spvInfo.relatingTableList) {
        tableName = item.tableName;
        this.spvTableNameList.push({ isTableChecked: false, tableName: tableName, isBorderSet: false, tableId: item.tableId });
        for (const joinItem of item.joinInfoList) {
          this.spvRelatedTableList.push({
            tableId: item.tableId,
            tableName: tableName, pColumn: joinItem.primaryColumn.columnName,
            sColumn: joinItem.secondaryColumn.columnName, dataType: joinItem.primaryColumn.dataType
          });
        }
      }
      this.checkSelectedTables(name); // make checkboxes true if they are already selected for add join
    });
  }

  checkSelectedTables(name) {
    const selectedTable: { tableId: string, tableName: string }[] = [];
    if (this.selectedSPVJoinList.length > 0) {
      const filterTemp = this.selectedSPVJoinList.filter(a => a.name === name)[0];
      if (filterTemp !== undefined) {
        const relatedTemp = filterTemp.relatingTableList;
        for (let item = 0; item < relatedTemp.length; item++) {
          this.spvTableNameList.filter(i => i.tableId === relatedTemp[item].tableId)[0].isTableChecked = true;
          selectedTable.push({ tableId: relatedTemp[item].tableId, tableName: relatedTemp[item].tableName });
        }
      }
    }
    this.selectedRelatingTableNameList = selectedTable;
  }

  selectSPVName(spvName: string, evt: MouseEvent) {
    this.spvName = spvName;
    this.spvType = this.spvInfoListTwo.filter(a => a.name === spvName)[0].type;
    this.selectedRelatingTableNameList = [];
    if (this.spvInfoListTwo.filter(a => a.name === spvName)[0].isSPVChecked) {
      const index = this.selectedSPVJoinList.findIndex(a => a.name === this.spvName);
      this.spvName = '';
      this.spvType = '';
      if (index !== -1) {
        this.selectedSPVJoinList.splice(index, 1);
      }
    }
    this.enableSubmitBtn();
    // evt.stopPropagation();
  }

  showSPVRelatedTableName(param) {
    this.spvTableId = param.tableId;
    this.spvTableNameList.forEach(a => a.isBorderSet = false);
    this.spvTableNameList.filter(a => a.tableId === this.spvTableId)[0].isBorderSet = true;
  }

  selectTableNames(tableId) {
    let tempSPVTableNameObj: { isTableChecked: boolean, tableName: string, isBorderSet: boolean, tableId: string };
    tempSPVTableNameObj = this.spvTableNameList.filter(a => a.tableId === tableId)[0];
    if (tempSPVTableNameObj.isTableChecked) {
      this.selectedRelatingTableNameList.push({ tableId: tempSPVTableNameObj.tableId, tableName: tempSPVTableNameObj.tableName });
    } else {
      this.selectedRelatingTableNameList.splice(this.selectedRelatingTableNameList.findIndex(a => a.tableId === tableId), 1);
    }
    const index = this.selectedSPVJoinList.findIndex(a => a.name === this.spvName);
    if (index !== -1) {
      this.selectedSPVJoinList.splice(this.selectedSPVJoinList.findIndex(a => a.name === this.spvName), 1);
    }
    if (this.spvName !== '' && this.spvType !== '' && this.spvInfoListTwo.filter(a => a.name === this.spvName)[0].isSPVChecked) {
      this.selectedSPVJoinList.push({ type: this.spvType, name: this.spvName, relatingTableList: this.selectedRelatingTableNameList });
    } else {
      this.spvTableNameList.forEach(a => a.isTableChecked = false);
    }
    this.enableSubmitBtn();
    this.columnsList = this.getRelatingTableList();
  this.dataSource.data = this.columnsList;
  }

  enableSubmitBtn() {
    if (this.selectedSPVJoinList.length > 0) {
      for (const item of this.selectedSPVJoinList) {
        if (item.relatingTableList.length === 0) {
          const index = this.selectedSPVJoinList.findIndex(a => a.name === item.name);
          if (index !== -1) {
            this.selectedSPVJoinList.splice(index, 1);
          }
        }
      }
      if (this.selectedSPVJoinList.length > 0) {
        this.disableSubmitBtn = false;
      } else {
        this.disableSubmitBtn = true;
      }
    } else {
      this.disableSubmitBtn = true;
    }
  }

  getRelatingTableList() {
    if (this.spvTableId !== '') {
      return this.spvRelatedTableList.filter(a => a.tableId === this.spvTableId);
    } else {
      return [];
    }
  }

  addSPVJoin() {
    this.updateNotif = false;
    this.updateSuccess = false;
    const paramObj = {
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'primaryTable': {
        'tableId': this.primaryTableId,
        'tableName': this.tableName,
      },
      'spvInfoList': this.selectedSPVJoinList};
    this.storedProcViewService.createSPVAddJoin(paramObj).subscribe((res) => {
      if (res && res.errorDetails.length === 0) {
        this.updateSuccess = true;
        this.storedProcViewService.changeSPVBooleanValue(true);
      } else {
        this.errorMsg = res.errorDetails[0].errors[0].errorMessage;
        this.updateNotif = true;
      }
    });
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
    this.tablelistService.changeBooleanValue(true);
  }
}
