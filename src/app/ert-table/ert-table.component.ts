import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import {
  ErtTableListObj, FilterConfigTree, ErtColumnListObj, TableDetailsListObj,
  ColumnListObj, UsrDefinedColumnListObj, DataOrderConfig, FilterAndOrderConfig
} from '../ert-landing-page/ert';
import { addFilterNode, FilterConfigNode, Tree, searchTree, getPreorderDFS, deleteNode } from './ert-filter';
import { from } from 'rxjs';
@Component({
  selector: 'app-ert-table',
  templateUrl: './ert-table.component.html',
  styleUrls: ['./ert-table.component.css']
})
export class ErtTableComponent implements OnInit {
  filterdata: FilterConfigTree = new Tree();
  public selectedfilterNode: FilterConfigNode | null;
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
  filterConfigColumnNameList: string[] = [];
  userDefinedList: { 'prefix': string, 'column': string, 'suffix': string }[] = [];
  ertJobId = '';
  configColumnObject: { selectedColumnName: string, selectedConfigFunction: string } =
    { selectedColumnName: '', selectedConfigFunction: null };
  configColumnList: { selectedColumnName: string, selectedConfigFunction: string }[] = [];
  selectedTableId = '';
  configColumnQuery = '';
  maxNode = 3;
  ertAvillableTableList: ErtTableListObj = new ErtTableListObj();
  expressionStack: string[] = [];
  searchTableName: string;
  parentChildMap: { child: number, parent: number }[] = [];
  dataOrderList: DataOrderConfig[] = [];
  dataOrderObj: DataOrderConfig = new DataOrderConfig();
  schemaResultsTableCount = 0;
  from: string;
  disabledUserDefinedColName = false;
  errorMsg = '';
  startIndex = 1;
  ErtTablesearchList: ErtTableListObj = new ErtTableListObj();
  constructor(private _fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    private ertService: ErtService, private workspaceHeaderService: WorkspaceHeaderService, private cst: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    this.myForm = this._fb.group({
      addEditColumn: this._fb.array([
        this.initColumn(),
      ])
    });
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.from === 'data-record') {
      this.getERTtableListForDataRecord();
    } else if (this.from === 'SIP') {
      this.getERTtableListForSIP();
    } else {
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        document.getElementById('back-to-job-config').classList.add('hide');
      }
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
  }

  closeErrorMsg() {
    this.errorMsg = '';
  }

  getERTtableListForDataRecord() {
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      document.getElementById('back-to-job-config').classList.add('hide');
      if (this.ertJobId !== '' && this.ertService.selectedList.length !== 0) {
        this.selectedTableList = this.ertService.selectedList;
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.getERTcolumnlist(this.selectedTableId, '');
      } else {
        this.getERTtableList();
      }
    } else {
      let tableNameList: string[];
      tableNameList = this.ertService.selectedValues;
      this.schemaResultsTableCount = this.ertService.schemaResultsTableCount;
      for (let item = 0; item < tableNameList.length; item++) {
        const temp = this.ertService.joinListMap.get(tableNameList[item]);
        const tempObj: TableDetailsListObj = new TableDetailsListObj();
        tempObj.tableId = temp[0].primaryTableId;
        tempObj.tableName = temp[0].primaryTableName;
        tempObj.modifiedTableName = temp[0].primaryTableName;
        tempObj.isSelected = true;
        const relatedTable = this.ertService.joinListMap.get(tableNameList[item + 1]);
        if (relatedTable !== undefined) {
          tempObj.relatedTableDetails.push({ tableId: relatedTable[0].primaryTableId, tableName: relatedTable[0].primaryTableName });
        }
        this.getERTcolumnlistForDataRecord(tempObj.tableId);
        this.selectedTableList.push(tempObj);
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.modifiedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
        this.tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
      }
    }
  }

  getERTtableListForSIP() {
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      document.getElementById('back-to-job-config').classList.add('hide');
      if (this.ertJobId !== '' && this.ertService.selectedList.length !== 0) {
        this.selectedTableList = this.ertService.selectedList;
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.getERTcolumnlist(this.selectedTableId, '');
      } else {
        this.getERTtableList();
      }
    } else {
      let tableNameList: string[];
      tableNameList = this.ertService.selectedValues;
      this.schemaResultsTableCount = this.ertService.schemaResultsTableCount;
      for (let item = 0; item < tableNameList.length; item++) {
        const temp = this.ertService.joinListMap.get(tableNameList[item]);
        const tempObj: TableDetailsListObj = new TableDetailsListObj();
        tempObj.tableId = temp[0].primaryTableId;
        tempObj.tableName = temp[0].primaryTableName;
        tempObj.modifiedTableName = temp[0].primaryTableName;
        tempObj.isSelected = true;
        const relatedTable = this.ertService.RelationSIP.filter(a => a.id === tempObj.tableId)[0].children;
        if (relatedTable !== undefined) {
          for (const rel of relatedTable) {
            if (rel !== undefined) {
              tempObj.relatedTableDetails.push({ tableId: rel.id, tableName: rel.name });
            }
          }
        }
        this.getERTcolumnlistForDataRecord(tempObj.tableId);
        this.selectedTableList.push(tempObj);
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.modifiedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
        this.tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
      }
    }
  }

  refreshColumn() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getERTcolumnlist(this.ertJobId, this.workspaceId, this.selectedTableId).subscribe((result) => {
      this.ErtTableColumnList = result;
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList = this.ErtTableColumnList;
      this.modifiedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
      this.tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList = [];
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig = new FilterAndOrderConfig();
    });
  }

  initColumn() {
    return this._fb.group({
      prefix: [''], suffix: [''], column: [null]
    });
  }

  getErtAvailableTable() {
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.ertService.getErtAvailableTable(this.ertJobId).subscribe(result => {
        this.ertAvillableTableList = result;
      });
    }
  }

  getPage(page: number) {
    this.selectedTableList = [];
    const perPage = 50;
    this.startIndex = (page - 1) * perPage;
    this.getERTtableList();
  }

  getERTtableList() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getERTtableList(this.workspaceId, this.ertJobId, this.startIndex).subscribe((result) => {
      this.ErtTableList = result;
      this.schemaResultsTableCount = result.sourceTableCount;
      for (const item of this.ErtTableList.ertTableList) {
        const tempObj: TableDetailsListObj = new TableDetailsListObj();
        tempObj.tableId = item.tableId;
        tempObj.tableName = item.tableName;
        tempObj.modifiedTableName = item.modifiedTableName;
        if (item.filterNconfig !== null) {
          tempObj.filterAndOrderConfig = item.filterNconfig;
        }
        if (item.relatedTableDetails !== null) {
          tempObj.relatedTableDetails = item.relatedTableDetails;
        }
        if (this.ertJobId !== '' && this.ertJobId !== undefined) {
          tempObj.isSelected = true;
        }
        this.selectedTableList.push(tempObj);
      }
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        for (const item of this.selectedTableList) {
          this.getERTcolumnlist(item.tableId, '');
        }
      }
      this.selectedTableId = this.selectedTableList[0].tableId;
      this.getERTcolumnlist(this.selectedTableId, '');
    });
  }

  searchTablelist(searchTableName) {
    this.selectedTableList = [];
    const temp: TableDetailsListObj[] = [];
    this.ertService.getERTtablesearchList(this.workspaceId, searchTableName).subscribe((result) => {
      this.ErtTablesearchList = result;
      for (const item of this.ErtTablesearchList.ertTableList) {
        const tempObj: TableDetailsListObj = new TableDetailsListObj();
        tempObj.tableId = item.tableId;
        tempObj.tableName = item.tableName;
        tempObj.modifiedTableName = item.modifiedTableName;
        temp.push(tempObj);
      }
      this.selectedTableList = temp;
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
  }

  getERTcolumnlistForDataRecord(tableId: string) {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getERTcolumnlist(this.ertJobId, this.workspaceId, tableId).subscribe((result) => {
      this.ErtTableColumnList = result;
      this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = this.ErtTableColumnList;
    });
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

  openUsrDefinedColumnModel(columnName: string) {
    this.userDefinedList = [];
    this.usrDefinedColumnName = '';
    this.usrDefinedQueryView = '';
    this.disabledUserDefinedColName = false;
    this.ursDefinedColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    if (columnName !== 'addNewColumn') {
      this.usrDefinedColumnName = columnName;
      this.disabledUserDefinedColName = true;
      const temp = this.selectedTableList.filter
        (a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList.filter(b => b.originalColumnName === columnName)[0];
      if (temp === undefined) {
        const temp1 = this.selectedTableList.filter
          (a => a.tableId === this.selectedTableId)[0].columnList.filter(b => b.originalColumnName === columnName)[0];
        console.log(temp1);
        this.userDefinedList = JSON.parse(temp1.userColumnQuery.replace(/'/g, '"'));
        this.usrDefinedQueryView = temp1.viewQuery;
      } else if (temp.userColumnQuery !== null) {
        this.userDefinedList = JSON.parse(temp.userColumnQuery.replace(/'/g, '"'));
        this.usrDefinedQueryView = temp.viewQuery;
      }
    }
  }

  setColumnConfigObj(value: string) {
    this.configColumnObject.selectedConfigFunction = value;
  }

  openModelForColumnConfig(columnName: string, dataType: string) {
    if (dataType !== 'USERDEFINED') {
      this.configColumnList = [];
      this.configColumnQuery = '';
      this.configColumnObject.selectedColumnName = columnName;
      const temp = this.selectedTableList.filter
        (a => a.tableId === this.selectedTableId)[0].columnList.filter(b => b.originalColumnName === columnName)[0];
      if (temp.userColumnQuery != null && temp.viewQuery) {
        this.configColumnList = JSON.parse(temp.userColumnQuery.replace(/'/g, '"'));
        this.configColumnQuery = temp.viewQuery;
      }
    }
    // else if (dataType === 'USERDEFINED') {
    //   this.openUsrDefinedColumnModel(columnName);
    // }
  }

  saveColumnConfig() {
    let tempString = '';
    if (this.configColumnObject.selectedConfigFunction !== null) {
      this.configColumnList.push(this.configColumnObject);
    }
    const tempColumnName = this.configColumnObject.selectedColumnName;
    this.configColumnObject = { selectedColumnName: tempColumnName, selectedConfigFunction: null };
    for (const item of this.configColumnList) {
      tempString = tempString + item.selectedConfigFunction + '(';
    }
    if (this.configColumnList.length !== 0) {
      tempString = tempString + tempColumnName;
    }
    for (const item of this.configColumnList) {
      tempString = tempString + ')';
    }
    this.configColumnQuery = tempString;
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const tempColumnList = temp.columnList.filter(a => a.originalColumnName === this.configColumnObject.selectedColumnName)[0];
    tempColumnList.viewQuery = this.configColumnQuery;
    tempColumnList.userColumnQuery = JSON.stringify(this.configColumnList).replace(/"/g, '\'');
  }

  selectColumns(columnName: string, isSelected: boolean) {
    const columnsList = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    const index = columnsList.findIndex(a => a.columnName === columnName);
    if (isSelected && index !== -1) {
      const temp = columnsList.filter(a => a.columnName === columnName)[0].isSelected = true;
    } else if (!isSelected && index !== -1) {
      const temp = columnsList.filter(a => a.columnName === columnName)[0].isSelected = false;
    }
  }

  selectUserDefinedColumns(columnName: string, isSelected: boolean) {
    const columnsList = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList;
    const index = columnsList.findIndex(a => a.originalColumnName === columnName);
    if (isSelected && index !== -1) {
      columnsList.filter(a => a.originalColumnName === columnName)[0].isSelected = true;
    } else if (!isSelected && index !== -1) {
      columnsList.filter(a => a.originalColumnName === columnName)[0].isSelected = false;
    }
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
  }

  gotoJobConfiguration() {
    if (this.from === 'data-record') {
      this.router.navigate(['workspace/ert/ert-datarecord-config']);
    } else if (this.from === 'SIP') {
      this.router.navigate(['workspace/ert/ert-sip-config']);
    } else {
      this.router.navigate(['workspace/ert/ert-jobs-config']);
    }
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
    if (this.selectedTableList.filter(a => a.isSelected === true).length === 0) {
      this.errorMsg = 'Please select a table';
    } else {
      this.ertService.setSelectedList(this.selectedTableList, this.schemaResultsTableCount);
      this.navigateToUrl('workspace/ert/ert-extract-ingest');
    }
  }

  navigateToUrl(url: string) {
    if (this.from === 'data-record' || this.from === 'SIP') {
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate([url + '/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate([url + '/'], { queryParams: { from: this.from } });
      }
    } else
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        this.router.navigate([url + '/', this.ertJobId]);
      } else {
        this.router.navigate([url]);
      }
  }
  saveUsrDefinedColumn() {
    const tempUsrDefinedObj = new UsrDefinedColumnListObj();
    tempUsrDefinedObj.originalColumnName = this.usrDefinedColumnName;
    tempUsrDefinedObj.modifiedColumnName = this.usrDefinedColumnName;
    tempUsrDefinedObj.viewQuery = this.usrDefinedQueryView;
    tempUsrDefinedObj.userColumnQuery = JSON.stringify(this.userDefinedList).replace(/"/g, '\'');
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
      columnList.filter(b => b.originalColumnName === this.usrDefinedColumnName)[0];
    const tempUserDefinedObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].
      usrDefinedColumnList.filter(b => b.originalColumnName === this.usrDefinedColumnName)[0];
    if (tempObj !== undefined) {
      tempObj.userColumnQuery = tempUsrDefinedObj.userColumnQuery;
      tempObj.viewQuery = tempUsrDefinedObj.viewQuery;
    } else if (tempUserDefinedObj === undefined) {
      const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList;
      temp.push(tempUsrDefinedObj);
    } else {
      tempUserDefinedObj.userColumnQuery = tempUsrDefinedObj.userColumnQuery;
      tempUserDefinedObj.viewQuery = tempUsrDefinedObj.viewQuery;
    }
  }
  showUserDefinedColumn() {
    if (this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0] !== undefined) {
      return this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList || [];
    } else {
      return [];
    }
  }

  filterOrderConfig(event) {
    const children = document.querySelector('#nav-tab').children;
    const childrenArray = Array.from(children);
    childrenArray.forEach(a => a.classList.remove('active-tab'));
    event.target.classList.add('active-tab');
  }
  deleteUsrDefinedColumn(columnName: string) {
    const userDefinedTemp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList;
    const index = userDefinedTemp.findIndex(a => a.originalColumnName === columnName);
    if (index !== -1) {
      userDefinedTemp.splice(index, 1);
    }
  }
  deleteUsrDefinedColumnForEdit(columnName: string) {
    const userDefinedTemp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    const index = userDefinedTemp.findIndex(a => a.originalColumnName === columnName);
    if (index !== -1) {
      userDefinedTemp.splice(index, 1);
    }
  }
  openFilteronfig() {
    this.parentChildMap = [];
    this.filterdata = new Tree();
    this.filterConfigColumnNameList = [];
    this.dataOrderList = [];
    this.filterConfigColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const filterConfigNode = new FilterConfigNode(1, null, false, false, null, null, '', 0, []);
    this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode));
    if (temp.filterAndOrderConfig !== null && temp.filterAndOrderConfig.filterConfig !== '' &&
      temp.filterAndOrderConfig.filterQuery !== '') {
      this.filterdata = JSON.parse(temp.filterAndOrderConfig.filterConfig.replace(/'/g, '"'));
    }
  }

  showFilterChild(event) {
    if (event.target.querySelector('i') !== null) {
      if (event.target.querySelector('i').classList.contains('fa-chevron-down')) {
        event.target.querySelector('i').classList.remove('fa-chevron-down');
        event.target.querySelector('i').classList.add('fa-chevron-right');
      } else if (event.target.querySelector('i').classList.contains('fa-chevron-right')) {
        event.target.querySelector('i').classList.remove('fa-chevron-right');
        event.target.querySelector('i').classList.add('fa-chevron-down');
      }
    }
  }

  createFilterColumnConfig() {
    let treeStack = [];
    let Expression;
    let tempString = 'order by';
    treeStack = getPreorderDFS(this.filterdata);
    Expression = this.constructExpression(treeStack.reverse());
    this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.
      filterConfig = JSON.stringify(this.filterdata).replace(/"/g, '\'');
    if (this.dataOrderList.length !== 0) {
      for (const item of this.dataOrderList) {
        tempString = tempString + item.column + ' ';
        if (item.order !== null) {
          tempString = tempString + ' ' + item.order;
        }
        tempString = tempString + ', ';
      }
    } else {
      tempString = '';
    }
    this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.filterQuery
      = Expression + tempString.substring(0, tempString.length - 1);
  }

  insertFilterNode(id: number, operation: string, column: string, condition: string, value: string, event) {
    if (operation === null || condition === null || value === '') {
      alert('Please select all the value');
    } else {
      const filterConfigNode = new FilterConfigNode(id, operation, false, false, column, condition, value, 0, []);
      if (id === 1) {
        const filterConfigNode2 = new FilterConfigNode(2, operation, false, false, column, condition, value, 0, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode2));
        const filterConfigNode3 = new FilterConfigNode(3, '', false, false, null, null, '', 0, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode3));
        const filterTreeNode = searchTree(this.filterdata.root, 1);
        filterTreeNode.value = '';
        filterTreeNode.condition = null;
        filterTreeNode.column = null;
        filterTreeNode.operation = operation;
        this.parentChildMap.push({ child: 2, parent: 1 });
        this.parentChildMap.push({ child: 3, parent: 1 });
      } else {
        const filterTreeNode = searchTree(this.filterdata.root, id);
        filterTreeNode.operation = operation;
        filterTreeNode.value = '';
        filterTreeNode.condition = null;
        filterTreeNode.column = null;
        filterTreeNode.margin_left = 10;
        this.maxNode = this.maxNode + 1;
        const filterConfigNode2 = new FilterConfigNode(this.maxNode, operation, false, false, column, condition, value, 18, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode2));
        this.parentChildMap.push({ child: this.maxNode, parent: id });
        this.maxNode = this.maxNode + 1;
        const filterConfigNode3 = new FilterConfigNode(this.maxNode, '', false, false, null, null, '', 18, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode3));
        this.parentChildMap.push({ child: this.maxNode, parent: id });
      }
    }
    event.stopPropagation();
  }

  constructExpression(postfix: string[]): string {
    for (let i = 0; i < postfix.length; i++) {
      if (postfix[i] !== 'AND' && postfix[i] !== 'OR') {
        this.expressionStack.push(postfix[i]);
      } else {
        const temp1 = this.expressionStack.pop();
        const temp2 = this.expressionStack.pop();
        const temp = '(' + temp1 + ' ' + postfix[i] + ' ' + temp2 + ')';
        this.expressionStack.push(temp);
      }
    }
    return this.expressionStack[0].substring(1, this.expressionStack[0].length - 1);
  }

  addAvailableTable() {
    for (const item of this.ertAvillableTableList.ertTableList) {
      const tempObj: TableDetailsListObj = new TableDetailsListObj();
      if (item.isSelected) {
        tempObj.tableId = item.tableId;
        tempObj.tableName = item.tableName;
        tempObj.modifiedTableName = item.modifiedTableName;
        this.selectedTableList.push(tempObj);
      }
    }
  }

  deleteFilterConfigTreeNode(id: number) {
    const parent = this.parentChildMap.filter(a => a.child === id)[0].parent;
    for (const item of this.parentChildMap.filter(a => a.parent === parent)) {
      const filterTreeNode2 = searchTree(this.filterdata.root, item.child);
      this.filterdata = deleteNode(this.filterdata, filterTreeNode2);
      const index = this.parentChildMap.findIndex(a => a.child === item.child)[0];
      if (index !== -1) {
        this.parentChildMap.splice(index, 1);
      }
    }
  }

  addOrder() {
    if (this.dataOrderObj.column !== null) {
      this.dataOrderList.push(this.dataOrderObj);
      this.dataOrderObj = new DataOrderConfig();
    }
  }
  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }
}





