import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import {
  ErtTableListObj, FilterConfigTree, ErtColumnListObj, TableDetailsListObj, AvilErtTable,
  ColumnListObj, UsrDefinedColumnListObj, DataOrderConfig, FilterAndOrderConfig, ErtTableObj
} from '../ert-landing-page/ert';
import {
  addFilterNode, FilterConfigNode, Tree, searchTree,
  getPreorderDFS, ColumnConfigFunction, deleteNode, columnConfigFunctionList
} from './ert-filter';
import { NgxSpinnerService } from 'ngx-spinner';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { MatAccordion } from '@angular/material';
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
  orderFilterConfigColumnNameList: string[] = [];
  userDefinedList: { 'prefix': string, 'column': string, 'suffix': string }[] = [];
  ertJobId = '';
  configColumnObject: { selectedColumnName: string, selectedConfigFunction: string, outputType: string } =
    { selectedColumnName: '', selectedConfigFunction: null, outputType: '' };
  configColumnList: { selectedColumnName: string, selectedConfigFunction: string, outputType: string }[] = [];
  selectedTableId = '';
  configColumnQuery = '';
  maxNode = 3;
  ertAvillableTableList: AvilErtTable = new AvilErtTable();
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
  page = 1;
  ErtTablesearchList: ErtTableListObj = new ErtTableListObj();
  usrDefinedQueryViewMode = '';
  enableUserDefined = false;
  usrDefinedAlertMessage = '';
  columnConfigFunctionList: ColumnConfigFunction[] = [];
  ertedittable: boolean;
  lastPage = 1;
  storeSelectedTables: TableDetailsListObj[] = [];
  itemsPerPage = 49;
  avilableStartIndex = 1;
  availPage = 1;
  avilableTableCount = 0;
  storeAvaliableTables: ErtTableObj[] = [];
  showAvilableBtn = false;
  showNoTablesMsg = false;
  toCreateQuery = false;
  isCombinedQueryMode = null;
  availItemsPerPage = 49;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  constructor(private _fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    private ertService: ErtService, private spinner: NgxSpinnerService,
    private workspaceHeaderService: WorkspaceHeaderService, private cst: ChangeDetectorRef) {
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
    if (this.from !== 'data-record' && this.from !== 'SIP' && this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.showAvilableBtn = true;
    }
    if (this.from === 'data-record') {
      this.getERTtableListForDataRecord();
    } else if (this.from === 'SIP') {
      this.getERTtableListForSIP();
    } else {
      this.ertedittable = true;
      if (this.ertJobId !== '' && this.ertJobId !== undefined) {
        document.getElementById('back-to-job-config').classList.add('hide');
      }
      if (this.ertJobId !== '' && this.ertService.selectedList.length !== 0) {
        this.schemaResultsTableCount = this.ertService.schemaResultsTableCount;
        this.selectedTableList = this.ertService.selectedList;
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.storeSelectedTables = this.ertService.storeSelectedTables;
        this.getERTcolumnlist(this.selectedTableId, '');
      } else if (this.ertJobId !== '') {
        this.getERTtableList();
      } else if (this.ertService.selectedList.length === 0) {
        this.getERTtableList();
      } else {
        this.schemaResultsTableCount = this.ertService.schemaResultsTableCount;
        this.selectedTableList = this.ertService.selectedList;
        this.storeSelectedTables = this.ertService.storeSelectedTables;
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
      if (this.ertService.selectedList.length !== 0) {
        this.selectedTableList = this.ertService.selectedList;
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.getERTcolumnlist(this.selectedTableId, '');
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
      if (this.ertService.selectedList.length !== 0) {
        this.selectedTableList = this.ertService.selectedList;
        this.selectedTableId = this.selectedTableList[0].tableId;
        this.getERTcolumnlist(this.selectedTableId, '');
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

  getErtAvailableTable(page) {
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.ertService.getErtAvailableTable(this.ertJobId, this.avilableStartIndex).subscribe(result => {
        this.ertAvillableTableList = result;
        console.log(this.ertAvillableTableList);
        this.avilableTableCount = this.ertAvillableTableList.erttableList.sourceTableCount -
          this.ertAvillableTableList.erttableList.selectedTableCount;
      });
    }
  }

  getPage(page: number) {
    this.selectedTableList = [];
    this.startIndex = page;
    this.getERTtableList();
  }

  getERTtableList() {
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getERTtableList(this.workspaceId, this.ertJobId, this.startIndex).subscribe((result) => {
      this.ErtTableList = result;
      if (this.ErtTableList.ertTableList !== undefined) {
        this.schemaResultsTableCount = result.sourceTableCount;
        if (result.selectedTableCount !== 0) {
          this.schemaResultsTableCount = result.selectedTableCount;
        }
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
          if (this.storeSelectedTables.findIndex(a => a.tableId === tempObj.tableId) === -1) {
            this.selectedTableList.push(tempObj);
          }
        }
        if (this.ertJobId !== '' && this.ertJobId !== undefined) {
          for (const item of this.selectedTableList) {
            this.getERTcolumnlist(item.tableId, '');
          }
        }
        if (this.selectedTableList.length > 0) {
          this.selectedTableId = this.selectedTableList[0].tableId;
          this.getERTcolumnlist(this.selectedTableId, '');
        }
        console.log(this.selectedTableList);
        console.log(this.storeSelectedTables);
        if (this.startIndex === 1) {
          this.selectedTableList = this.storeSelectedTables.concat(this.selectedTableList);
          if (this.ertJobId !== '' && this.ertJobId !== undefined) {
            this.storeSelectedTables = this.selectedTableList.filter(a => a.isSelected === true);
          }
          this.itemsPerPage = this.itemsPerPage + this.storeSelectedTables.length;
        } else {
          this.itemsPerPage = 49;
        }
        if (result.selectedTableCount !== 0) {
          this.itemsPerPage = 49;
        }
      } else {
        this.showNoTablesMsg = true;
      }
    });
  }

  searchTablelist() {
    if (this.from !== 'data-record' && this.from !== 'SIP') {
      if (this.searchTableName !== '') {
        this.selectedTableList = [];
        const temp: TableDetailsListObj[] = [];
        this.ertService.getERTtablesearchList(this.workspaceId, this.searchTableName.toUpperCase(), this.ertJobId).subscribe((result) => {
          this.ErtTablesearchList = result;
          for (const item of this.ErtTablesearchList.ertTableList) {
            const tempObj: TableDetailsListObj = new TableDetailsListObj();
            tempObj.tableId = item.tableId;
            tempObj.tableName = item.tableName;
            tempObj.modifiedTableName = item.modifiedTableName;
            if (this.ertJobId !== '' && this.ertJobId !== undefined) {
              tempObj.isSelected = true;
            }
            if (this.storeSelectedTables.findIndex(a => a.tableId === tempObj.tableId) === -1) {
              temp.push(tempObj);
            } else {
              temp.push(this.storeSelectedTables.filter(a => a.tableId === tempObj.tableId)[0]);
            }
          }
          this.selectedTableList = temp;
        });
      } else {
        this.page = 1;
        this.getPage(1);
      }
    }
  }

  getERTcolumnlist(tableId: string, event) {
    this.spinner.show();
    this.selectedTableId = tableId;
    this.modifiedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
    this.tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    if (this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList.length === 0) {
      this.ertService.getERTcolumnlist(this.ertJobId, this.workspaceId, tableId).subscribe((result) => {
        this.spinner.hide();
        this.ErtTableColumnList = result;
        this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = this.ErtTableColumnList;
      });
    } else {
      this.spinner.hide();
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
      this.storeSelectedTables.push(this.selectedTableList.filter(a => a.tableId === tableId)[0]);
    } else {
      this.selectedTableList.filter(a => a.tableId === tableId)[0].isSelected = false;
      const index = this.storeSelectedTables.findIndex(a => a.tableId === tableId);
      if (index === -1) {
        this.storeSelectedTables.splice(index, 1);
      }
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
    this.accordion.closeAll();
    this.userDefinedList = [];
    this.usrDefinedColumnName = '';
    this.usrDefinedQueryView = '';
    this.usrDefinedQueryViewMode = '';
    this.disabledUserDefinedColName = false;
    this.closeUserDefinedAlert();
    this.ursDefinedColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    if (columnName !== 'addNewColumn') {
      this.enableUserDefined = false;
      this.usrDefinedColumnName = columnName;
      this.disabledUserDefinedColName = true;
      const temp = this.selectedTableList.filter
        (a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList.filter(b => b.originalColumnName === columnName)[0];
      if (temp === undefined) {
        const temp1 = this.selectedTableList.filter
          (a => a.tableId === this.selectedTableId)[0].columnList.filter(b => b.originalColumnName === columnName)[0];
        this.userDefinedList = JSON.parse(temp1.userColumnQuery.replace(/'/g, '"'));
        if (this.userDefinedList.length === 0) {
          this.usrDefinedQueryViewMode = temp1.viewQuery;
        } else {
          this.usrDefinedQueryView = temp1.viewQuery;
        }
      } else if (temp.userColumnQuery !== null) {
        this.userDefinedList = JSON.parse(temp.userColumnQuery.replace(/'/g, '"'));
        if (this.userDefinedList.length === 0) {
          this.usrDefinedQueryViewMode = temp.viewQuery;
        } else {
          this.usrDefinedQueryView = temp.viewQuery;
        }
        if (this.userDefinedList.length !== 0) {
          for (const item of this.userDefinedList) {
            const tempIndex = this.ursDefinedColumnNameList.findIndex(a => a
              === item.column);
            if (tempIndex !== -1) {
              this.ursDefinedColumnNameList.splice(tempIndex, 1);
            }
          }
        }
      }
    } else {
      this.enableUserDefined = true;
    }
  }
  setQueryModeUserDefined() {
    if (this.usrDefinedQueryView !== '' && this.usrDefinedColumnName !== '') {
      this.enableUserDefined = false;
    } else if (this.usrDefinedQueryViewMode === '') {
      this.enableUserDefined = true;
    } else if (this.usrDefinedColumnName !== '') {
      this.enableUserDefined = false;
    } else {
      this.enableUserDefined = true;
    }
  }

  queryMode() {
    if (this.userDefinedList.length !== 0) {
      this.usrDefinedQueryViewMode = '';
    } else if (this.usrDefinedColumnName !== '' && this.usrDefinedQueryViewMode !== '') {
      this.enableUserDefined = false;
    } else if (this.usrDefinedColumnName !== '' && this.userDefinedList.length !== 0) {
      this.enableUserDefined = false;
    } else {
      this.enableUserDefined = true;
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
      this.columnConfigFunctionList = columnConfigFunctionList.filter(a => a.dataType.toUpperCase() === dataType.trim().toUpperCase());
      const temp = this.selectedTableList.filter
        (a => a.tableId === this.selectedTableId)[0].columnList.filter(b => b.originalColumnName === columnName)[0];
      if (temp.userColumnQuery != null && temp.viewQuery) {
        this.configColumnList = JSON.parse(temp.userColumnQuery.replace(/'/g, '"'));
        this.configColumnQuery = temp.viewQuery;
      }
    }
  }

  saveColumnConfig() {
    let tempString = '';
    if (this.configColumnObject.selectedConfigFunction !== null) {
      this.configColumnObject.outputType = this.columnConfigFunctionList.
        filter(a => a.function === this.configColumnObject.selectedConfigFunction)[0].outputType;
    }
    if (this.configColumnObject.selectedConfigFunction !== null) {
      this.configColumnList.push(this.configColumnObject);
    }
    const tempColumnName = this.configColumnObject.selectedColumnName;
    this.configColumnObject = { selectedColumnName: tempColumnName, selectedConfigFunction: null, outputType: null };
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
      const tempIndex = this.ursDefinedColumnNameList.findIndex(a => a
        === control.controls[i].value.column);
      if (tempIndex !== -1) {
        this.ursDefinedColumnNameList.splice(tempIndex, 1);
      }
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
    this.setQueryModeUserDefined();
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

  deleteUsrDefinedCol(i: number, columnName) {
    this.userDefinedList.splice(i, 1);
    this.ursDefinedColumnNameList.push(columnName);
    this.createUsrDefinedCONCATString();
  }

  deleteColumnCOnfig(i: number) {
    this.configColumnList.splice(i, 1);
    this.saveColumnConfig();
  }

  gotoExtractDigestExtraction() {
    if (this.startIndex !== 1) {
      this.selectedTableList = this.storeSelectedTables.concat(this.selectedTableList.filter(a => a.isSelected === false));
    }
    if (this.selectedTableList.filter(a => a.isSelected === true).length === 0) {
      this.errorMsg = 'Please select a table';
    } else {
      this.ertService.setSelectedList(this.selectedTableList, this.schemaResultsTableCount, this.storeSelectedTables);
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
    if (!this.isCombinedQueryMode) {
      this.validateQueryMode();
      if (this.toCreateQuery) {
        this.usrDefinedQueryView = '';
        this.userDefinedList = [];
        this.ursDefinedColumnNameList = this.selectedTableList.filter
          (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
        this.setQueryModeUserDefined();
      }
    } else if (this.isCombinedQueryMode) {
      this.validateCombinedColumnQueryMode();
      if (this.toCreateQuery) {
        this.usrDefinedQueryViewMode = '';
        this.setQueryModeUserDefined();
      }
    }
  }

  saveUserDefinedAfterValidate() {
    if (this.toCreateQuery) {
      const tempUsrDefinedObj = new UsrDefinedColumnListObj();
      tempUsrDefinedObj.originalColumnName = this.usrDefinedColumnName.toUpperCase().trim();
      tempUsrDefinedObj.modifiedColumnName = this.usrDefinedColumnName.toUpperCase().trim();
      if (!this.isCombinedQueryMode) {
        this.usrDefinedQueryView = '';
        this.userDefinedList = [];
        this.ursDefinedColumnNameList = this.selectedTableList.filter
          (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
        this.setQueryModeUserDefined();
      } else if (this.isCombinedQueryMode) {
        this.usrDefinedQueryViewMode = '';
        this.setQueryModeUserDefined();
      }
      if (this.usrDefinedQueryViewMode !== '') {
        tempUsrDefinedObj.viewQuery = this.usrDefinedQueryViewMode;
      }
      if (this.usrDefinedQueryView !== '') {
        tempUsrDefinedObj.viewQuery = this.usrDefinedQueryView;
      }
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
      document.getElementById('usr-defined-close').click();

    } else {
      document.getElementById('query-alert').classList.remove('alert-hide');
    }
  }

  validateQueryMode() {
    const param: any = {
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'query': this.usrDefinedQueryViewMode,
      'tableId': this.selectedTableId
    };
    this.ertService.validQuery(param).subscribe(res => {
      if (res.data === undefined) {
        this.usrDefinedAlertMessage = 'Something Went Wrong, please try again.';
        this.toCreateQuery = false;
        document.getElementById('query-alert').classList.remove('alert-hide');
      } else if (res.data.trim().toLowerCase() !== 'valid query') {
        this.usrDefinedAlertMessage = 'Invalid Query, please check.';
        this.toCreateQuery = false;
        document.getElementById('query-alert').classList.remove('alert-hide');
      } else {
        this.usrDefinedAlertMessage = '';
        this.toCreateQuery = true;
        this.saveUserDefinedAfterValidate();
      }
    });
  }


  validateCombinedColumnQueryMode() {
    if (this.userDefinedList.length < 2) {
      this.usrDefinedAlertMessage = 'Invalid Query, please add two columns to create combined column query.';
      this.toCreateQuery = false;
      document.getElementById('query-alert').classList.remove('alert-hide');
    } else {
      this.usrDefinedAlertMessage = '';
      this.toCreateQuery = true;
      this.saveUserDefinedAfterValidate();
    }
  }

  closeUserDefinedAlert() {
    document.getElementById('query-alert').classList.add('alert-hide');
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
    if (this.from === 'data-record' || this.from === 'SIP') {
      if (this.selectedTableList[0].tableId === this.selectedTableId) {
        document.getElementById('addFilterModelId').click();
      } else {
        document.getElementById('warning-popup-btn').click();
      }
    } else {
      document.getElementById('addFilterModelId').click();
    }
    this.filterdata = new Tree();
    this.filterConfigColumnNameList = [];
    this.dataOrderList = [];
    this.maxNode = 3;
    let filterMap = new Map();
    this.filterConfigColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    this.orderFilterConfigColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const filterConfigNode = new FilterConfigNode(1, null, false, false, null, null, '', 0, []);
    this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode));
    if (temp.filterAndOrderConfig !== null && temp.filterAndOrderConfig.filterConfig !== '' &&
      temp.filterAndOrderConfig.filterQuery !== '' && temp.filterAndOrderConfig.filterConfig !== null &&
      temp.filterAndOrderConfig.filterQuery !== null) {
      filterMap = new Map(JSON.parse(temp.filterAndOrderConfig.filterConfig.replace(/'/g, '"')));
      if (filterMap.get('filterList') !== '') {
        this.filterdata = JSON.parse(filterMap.get('filterList').replace(/'/g, '"'));
      }
      if (filterMap.get('orderLIst') !== '') {
        this.dataOrderList = JSON.parse(filterMap.get('orderList').replace(/'/g, '"'));
      }
    }
    this.removeDuplicateColumnForOrder();
  }

  removeDuplicateColumnForOrder() {
    if (this.dataOrderList.length !== 0) {
      for (const item of this.dataOrderList) {
        const index = this.orderFilterConfigColumnNameList.findIndex(a => a.trim().toLowerCase() === item.column.trim().toLowerCase());
        if (index !== -1) {
          this.orderFilterConfigColumnNameList.splice(index, 1);
        }
      }
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
    const filterMap = new Map();
    let treeStack = [];
    let Expression;
    let tempString = 'order by';
    const temp = this.validateTree(this.filterdata.root);
    if (temp === null) {
      treeStack = getPreorderDFS(this.filterdata);
      Expression = this.constructExpression(treeStack.reverse());
      filterMap.set('filterList', JSON.stringify(this.filterdata));
      if (this.dataOrderList.length !== 0) {
        filterMap.set('orderList', JSON.stringify(this.dataOrderList));
        for (const item of this.dataOrderList) {
          tempString = tempString + item.column + ' ';
          if (item.order !== null) {
            tempString = tempString + item.order;
          }
          tempString = tempString + ',';
        }
      } else {
        tempString = '';
        filterMap.set('orderList', '');
      }
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.
        filterConfig = JSON.stringify(Array.from(filterMap.entries())).replace(/"/g, '\'');
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.filterQuery
        = Expression + tempString.substring(0, tempString.length - 1);
    } else {
      if (this.filterdata.root.children.length === 0) {
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.
          filterConfig = '';
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.filterQuery = '';
        filterMap.set('filterList', '');
        filterMap.set('orderList', JSON.stringify(this.dataOrderList));
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.
          filterConfig = JSON.stringify(Array.from(filterMap.entries())).replace(/"/g, '\'');
        tempString = tempString + ' ';
        for (const item of this.dataOrderList) {
          tempString = tempString + item.column + ' ';
          if (item.order !== null) {
            tempString = tempString + item.order;
          }
          tempString = tempString + ',';
        }
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.
          filterQuery = tempString.substring(0, tempString.length - 1);
      } else {
        if (this.dataOrderList.length !== 0) {
          console.log(this.dataOrderList);
        }
        // alert('Invalid Filter Condition');
      }
    }
  }
  // tslint:disable-next-line: no-shadowed-variable
  validateTree(element) {
    if (element.children.length === 0) {
      if (element.column === null || element.condition === null || element.value === '') {
        return false;
      }
    } else if (element.children != null) {
      let i;
      let result = null;
      for (i = 0; result == null && i < element.children.length; i++) {
        result = this.validateTree(element.children[i]);
      }
      return result;
    }
    return null;
  }


  insertFilterNode(id: number, operation: string, column: string, condition: string, value: string, event) {
    if (operation === null || condition === null || value === '') {
      // alert('Please select all the value');
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

        this.maxNode = this.maxNode + 1;
        const filterConfigNode3 = new FilterConfigNode(this.maxNode, '', false, false, null, null, '', 18, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode3));

      }
    }
    event.stopPropagation();
  }

  constructExpression(postfix: string[]): string {
    const expressionStack: string[] = [];
    for (let i = 0; i < postfix.length; i++) {
      if (postfix[i] !== 'AND' && postfix[i] !== 'OR') {
        expressionStack.push(postfix[i]);
      } else {
        const temp1 = expressionStack.pop();
        const temp2 = expressionStack.pop();
        if (temp1 === undefined || temp2 === undefined) {
          return 'Invalid';
        } else {
          const temp = '(' + temp1 + ' ' + postfix[i] + ' ' + temp2 + ')';
          expressionStack.push(temp);
        }
      }
    }
    return expressionStack[0].substring(1, expressionStack[0].length - 1);
  }

  addAvailableTable() {
    for (const item of this.storeAvaliableTables.filter(a => a.isSelected === true)) {
      const tempObj: TableDetailsListObj = new TableDetailsListObj();
      if (item.isSelected) {
        tempObj.tableId = item.tableId;
        tempObj.tableName = item.tableName;
        tempObj.modifiedTableName = item.modifiedTableName;
        this.selectedTableList.push(tempObj);
      }
    }
    this.storeAvaliableTables = [];
  }

  deleteFilterConfigTreeNode(id: number) {
    let id1: number;
    if (id % 2 === 0) {
      id1 = id + 1;
    } else {
      id1 = id - 1;
    }
    const filterTreeNode1 = searchTree(this.filterdata.root, id);
    const filterTreeNode2 = searchTree(this.filterdata.root, id1);
    this.filterdata = deleteNode(this.filterdata, filterTreeNode1);
    this.filterdata = deleteNode(this.filterdata, filterTreeNode2);
  }

  addOrder() {
    if (this.dataOrderObj.column !== null && this.dataOrderObj.order !== null) {
      this.dataOrderList.push(this.dataOrderObj);
      this.dataOrderObj = new DataOrderConfig();
      this.removeDuplicateColumnForOrder();
    }
  }

  deleteOrderConfig(column, index) {
    this.dataOrderList.splice(index, 1);
    this.orderFilterConfigColumnNameList.push(column);
  }

  cancel() {
    this.router.navigate(['/workspace/ert/ert-jobs']);
  }

  getAvilableTablePage(page) {
    console.log(page);
    this.ertAvillableTableList.erttableList.ertTableList = [];
    this.avilableStartIndex = page;
    this.getErtAvailableTable(page);
  }

  selectAvaliableTable(tableId: string, event) {
    const tempSelected = this.selectedTableList.filter(a => a.tableId === tableId)[0];
    if (tempSelected === undefined) {
      if (event.target.checked === true) {
        const temp = this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tableId)[0]
        temp.isSelected = true;
        this.storeAvaliableTables.push(temp);
      } else {
        const temp = this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tableId)[0];
        temp.isSelected = false;
        const index = this.storeAvaliableTables.findIndex(a => a.tableId === tableId);
        if (index === -1) {
          this.storeAvaliableTables.splice(index, 1);
        }
      }
    }
    event.stopPropagation();
  }
  columnModeOpen() {
    // this.usrDefinedQueryViewMode = '';
    // this.setQueryModeUserDefined();
    this.isCombinedQueryMode = true;
  }

  queryModeOpen() {
    this.isCombinedQueryMode = false;
    // this.usrDefinedQueryView = '';
    // this.userDefinedList = [];
    // this.ursDefinedColumnNameList = this.selectedTableList.filter
    //   (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    // this.setQueryModeUserDefined();
  }

}




