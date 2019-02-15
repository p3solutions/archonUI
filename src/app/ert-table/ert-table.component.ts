import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import { ErtTableListObj, ErtColumnListObj, TableDetailsListObj, ColumnListObj, UsrDefinedColumnListObj } from '../ert-landing-page/ert';
import { TableNameAndRelatingTable } from '../stored-proc-view/stored-proc-view';
@Component({
  selector: 'app-ert-table',
  templateUrl: './ert-table.component.html',
  styleUrls: ['./ert-table.component.css']
})
export class ErtTableComponent implements OnInit {
  myForm: FormGroup;
  workspaceId = '';
  ErtTableList: ErtTableListObj = new ErtTableListObj();
  ErtTableColumnList: ErtColumnListObj[] = [];
  selectedTableList: TableDetailsListObj[] = [];
  ursDefinedColumnNameList: string[] = [];
  usrDefinedQueryView = '';
  usrDefinedColumnName = '';
  modifiedTableName = '';
  tableName = '';
  userDefinedList: { 'prefix': string, 'column': string, 'suffix': string }[] = [];
  ertJobId = '';
  configColumnObject: { selectedColumnName: string, selectedConfigFunction: string } =
    { selectedColumnName: '', selectedConfigFunction: null };
  configColumnList: { selectedColumnName: string, selectedConfigFunction: string }[] = [];
  selectedTableId = '';
  configColumnQuery = '';
  page = 1;
  constructor(private _fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    private ertService: ErtService, private workspaceHeaderService: WorkspaceHeaderService) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      addEditColumn: this._fb.array([
        this.initColumn(),
      ])
    });
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertJobId !== '' && this.ertService.selectedList.length !== 0) {
      this.selectedTableList = this.ertService.selectedList;
      this.selectedTableId = this.selectedTableList[0].tableId;
      this.getERTcolumnlist(this.selectedTableId, '');
    } else if (this.ertJobId !== '') {
      this.getERTtableList();
    } else if (this.ertService.selectedList.length === 0) {
      this.getERTtableList();
    } else {
      this.selectedTableList = this.ertService.selectedList;
      this.selectedTableId = this.selectedTableList[0].tableId;
      this.getERTcolumnlist(this.selectedTableId, '');
    }
  }

  initColumn() {
    return this._fb.group({
      prefix: [''], suffix: [''], column: [null]
    });
  }

  getERTtableList() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getERTtableList(this.workspaceId, this.ertJobId).subscribe((result) => {
      this.ErtTableList = result;
      for (const item of this.ErtTableList.ertTableList) {
        const tempObj: TableDetailsListObj = new TableDetailsListObj();
        tempObj.tableId = item.tableId;
        tempObj.tableName = item.tableName;
        tempObj.modifiedTableName = item.modifiedTableName;
        if (this.ertJobId !== '' && this.ertJobId !== undefined) {
          tempObj.isSelected = true;
        }
        this.selectedTableList.push(tempObj);
      }
      console.log(this.selectedTableList);
      this.selectedTableId = this.selectedTableList[0].tableId;
      this.getERTcolumnlist(this.selectedTableId, '');
    });
  }

  getERTcolumnlist(tableId: string, event) {
    this.selectedTableId = tableId;
    this.modifiedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
    this.tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    if (this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList.length === 0) {
      this.ertService.getERTcolumnlist(this.ertJobId, this.workspaceId, tableId).subscribe((result) => {
        this.ErtTableColumnList = result;
        this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = this.ErtTableColumnList;
      });
    }
    console.log(this.selectedTableList);
  }

  selectTable(tableId: string, tableName: string, event) {
    this.selectedTableId = tableId;
    this.getERTcolumnlist(tableId, '');
    if (event.target.checked === true) {
      this.selectedTableList.filter(a => a.tableId === tableId)[0].isSelected = true;
    } else {
      this.selectedTableList.filter(a => a.tableId === tableId)[0].isSelected = false;
    }
    event.stopPropagation();
    console.log(this.selectedTableList);
  }

  toModifiedTableName() {
    this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName = this.modifiedTableName;
  }

  showColumns() {
    if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
      return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    } else {
      return [];
    }
  }

  openUsrDefinedColumnModel() {
    this.userDefinedList = [];
    this.usrDefinedColumnName = '';
    this.usrDefinedQueryView = '';
    this.ursDefinedColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
  }

  setColumnConfigObj(value: string) {
    this.configColumnObject.selectedConfigFunction = value;
  }

  openModelForColumnConfig(columnName: string) {
    this.configColumnList = [];
    this.configColumnQuery = '';
    this.configColumnObject.selectedColumnName = columnName;
  }


  saveColumnConfig() {
    let tempString = '';
    this.configColumnList.push(this.configColumnObject);
    const tempColumnName = this.configColumnObject.selectedColumnName;
    this.configColumnObject = { selectedColumnName: tempColumnName, selectedConfigFunction: null };
    for (const item of this.configColumnList) {
      tempString = tempString + item.selectedConfigFunction + '(';
    }
    tempString = tempString + tempColumnName;
    for (const item of this.configColumnList) {
      tempString = tempString + ')';
    }
    this.configColumnQuery = tempString;
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const tempColumnList = temp.columnList.filter(a => a.originalColumnName === this.configColumnObject.selectedColumnName)[0];
    tempColumnList.viewQuery = this.configColumnQuery;
  }

  selectColumns(columnName: string, isSelected: boolean) {
    const columnsList = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    const index = columnsList.findIndex(a => a.columnName === columnName);
    if (isSelected && index !== -1) {
      const temp = columnsList.filter(a => a.columnName === columnName)[0].isSelected = true;
    } else if (!isSelected && index !== -1) {
      const temp = columnsList.filter(a => a.columnName === columnName)[0].isSelected = false;
    }
    console.log(this.selectedTableList);
  }


  addColumns(i: number) {
    const control = <FormArray>this.myForm.controls['addEditColumn'];
    if (control.controls[i].value.column !== null && control.controls[i].value.column !== '') {
      this.userDefinedList.push({
        prefix: control.controls[i].value.prefix, column: control.controls[i].value.column,
        suffix: control.controls[i].value.suffix
      });
      control.push(this.initColumn());
      control.removeAt(i);
    }
    this.createUsrDefinedCONCATString();
  }

  createUsrDefinedCONCATString() {
    let tempQueryString = '';
    for (const item of this.userDefinedList) {
      if (item.prefix !== '') {
        tempQueryString = tempQueryString + '\'' + item.prefix + '\',';
      }
      if (item.column !== '') {
        tempQueryString = tempQueryString + item.column + ',';
      }
      if (item.suffix !== '') {
        tempQueryString = tempQueryString + '\'' + item.suffix + '\',';
      }
    }
    if (tempQueryString.length > 1) {
      this.usrDefinedQueryView = 'CONCAT(' + tempQueryString.substring(0, tempQueryString.length - 1) + ')';
    } else {
      this.usrDefinedQueryView = '';
    }
    // const a = "[{'prefix':'zXCzc','column':'CITY','suffix':''},{'prefix':'','column':'CITY','suffix':''}]";
    // console.log( JSON.parse(a.replace(/'/g, '"')));
  }

  gotoJobConfiguration() {
    this.router.navigate(['workspace/ert/ert-jobs-config']);
  }

  deleteUsrDefinedCol(i: number) {
    this.userDefinedList.splice(i, 1);
    this.createUsrDefinedCONCATString();
  }

  deleteColumnCOnfig(i: number) {
    this.configColumnList.splice(i, 1);
    this.saveColumnConfig();
  }

  gotoExtractDigestExtraction() {
    this.ertService.setSelectedList(this.selectedTableList);
    console.log(this.selectedTableList);
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.router.navigate(['workspace/ert/ert-extract-ingest/', this.ertJobId]);
    } else {
      this.router.navigate(['workspace/ert/ert-extract-ingest']);
    }
  }

  getTableList(event) {
    console.log(1);
    this.page = 2;
    console.log(event);
  }

  saveUsrDefinedColumn() {
    if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].isSelected === true) {
      const tempUsrDefinedObj = new UsrDefinedColumnListObj();
      tempUsrDefinedObj.columnName = this.usrDefinedColumnName;
      tempUsrDefinedObj.modifiedColumnName = this.usrDefinedColumnName;
      tempUsrDefinedObj.viewQuery = this.usrDefinedQueryView;
      tempUsrDefinedObj.userColumnQuery = JSON.stringify(this.userDefinedList).replace(/"/g, '\'');
      const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList;
      temp.push(tempUsrDefinedObj);
    }
    console.log(this.selectedTableList);
  }

  filterOrderConfig(event) {
    const children = document.querySelector('#nav-tab').children;
    const childrenArray = Array.from(children);
    childrenArray.forEach(a => a.classList.remove('active-tab'));
    event.target.classList.add('active-tab');
  }
}

