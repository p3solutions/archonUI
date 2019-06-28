import { Component, OnInit, ChangeDetectorRef, ViewChild, ɵConsole } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErtService } from '../ert-landing-page/ert.service';
import {
  ErtTableListObj, FilterConfigTree, ErtColumnListObj, TableDetailsListObj, AvilErtTable,
  ColumnListObj, UsrDefinedColumnListObj, DataOrderConfig, FilterAndOrderConfig, ErtTableObj
} from '../ert-landing-page/ert';
import {
  addFilterNode, FilterConfigNode, Tree, searchTree,
  getPreorderDFS, ColumnConfigFunction, deleteNode, columnConfigFunctionList, findParentNode, FilterOperationList, filterOperationList
} from './ert-filter';
import { NgxSpinnerService } from 'ngx-spinner';
import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { MatAccordion } from '@angular/material';
import { Observable } from 'rxjs';
import { of } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
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
  configColumnObject: {
    selectedColumnName: string, selectedConfigFunction: string, param: string
    outputType: string, startIndex: number, endIndex: number
  } =
    { selectedColumnName: '', selectedConfigFunction: null, outputType: '', startIndex: 1, endIndex: 1, param: '' };
  configColumnList: {
    selectedColumnName: string, selectedConfigFunction: string, outputType: string, startIndex: number, param: string,
    endIndex: number
  }[] = [];
  selectedTableId = '';
  configColumnQuery = '';
  maxNode = 3;
  ertAvillableTableList: AvilErtTable = new AvilErtTable();
  // expressionStack: string[] = [];
  searchTableName = '';
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
  isCombinedQueryMode = false;
  availItemsPerPage = 49;
  isQueryMode = false;
  isUserDefinedColumnInProgress = false;
  filterWhereClause = '';
  @ViewChild(MatAccordion) accordion: MatAccordion;
  originalErttableList: ErtTableListObj = new ErtTableListObj(); // to show ert table list in popup when we create or add job.
  totalItemOfOriginalErtTable = 50;
  currentPageOfOriginalErtTable = 1;
  searchOriginalTableName = '';
  tempOriginalSelectedTable: TableDetailsListObj[] = [];
  isEditErtTableLeft = false;
  editErtTableIndex = 1;
  totalEditErtTableList = 50;
  showAddTableBtn = false;
  substringStartIndex = null;
  substringEndIndex = null;
  disabledAddColumnConfigBtn = false;
  filterOperationList: FilterOperationList[] = [];
  searchAvailableTableName = '';
  errorMessagesForSelection = '';
  isAllColumnSelected = true;
  constructor(private _fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute,
    private ertService: ErtService, private spinner: NgxSpinnerService,
    private workspaceHeaderService: WorkspaceHeaderService, private cst: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.from = this.activatedRoute.snapshot.queryParamMap.get('from');
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.myForm = this._fb.group({
      addEditColumn: this._fb.array([
        this.initColumn(),
      ])
    });
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.from !== 'data-record' && this.from !== 'SIP' && this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.showAvilableBtn = true; // To add more table if job is in TABLE Mode.
    }
    if ((this.from === 'TABLE' || this.from === null) && (this.ertJobId === '' || this.ertJobId === undefined)) {
      this.showAddTableBtn = true; // Show add Btn if it is TABLE Mode.
    }
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      document.getElementById('back-to-job-config').classList.add('hide'); // Hide the Back btn if job is on edit mode.
    }
    this.checkForMode();
  }

  checkForMode() {
    if (this.ertService.selectedList.length !== 0) {
      if (this.ertService.isDataRecordGraphChange) {
        this.getERTtableListForDataRecord(); // If it is Data-record job and route from graph page.
      } else if (this.ertService.isSIPGraphChange) {
        this.getERTtableListForSIP(); // If it is SIP job and route from graph page.
      } else {
        this.getERTTableFromService(); // If data is present in service level then we restore the data from service.
      }
    } else if (this.from === 'data-record') {
      this.getERTtableListForDataRecord(); // If it is Data-record job.
    } else if (this.from === 'SIP') {
      this.getERTtableListForSIP(); // If it is SIP job.
    } else if (this.from === 'TABLE') {
      this.getERTTableForTableMode(); // If it is TABLE job.
    }
  }

  getERTTableFromService() { // to restore the data from service.
    this.selectedTableList = this.ertService.selectedList;
    this.selectedTableId = this.selectedTableList[0].tableId;
    const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    this.modifiedTableName = tempTableObj.modifiedTableName;
    this.tableName = tempTableObj.tableName;
    this.isAllColumnSelected = tempTableObj.columnList.filter(a => a.isSelected === false).length === 0 ? true : false;
  }


  getERTTableForTableMode() { // During edit mode of table then function will call.
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.getEditErtTableList(1);
    }
  }

  openCreateJobSelectTablePopup(index) { // During creating job when user click on add table btn.
    document.getElementById('create-job-select-table-popup-btn').click();
    this.getOriginalErttableList(1);
    this.currentPageOfOriginalErtTable = 1;
  }

  getOriginalErttableList(currentIndex) { // During creating job when user click on pagination of add table.
    this.spinner.show();
    this.ertService.getERTtableList(this.workspaceId, this.ertJobId, currentIndex).subscribe(response => {
      try {
        this.originalErttableList = response;
        this.totalItemOfOriginalErtTable = this.originalErttableList.sourceTableCount - this.originalErttableList.selectedTableCount;
        this.checkForAlreadySelectedTable();
        this.spinner.hide();
      } catch {
        this.spinner.hide();
      }
    });
  }

  getEditErtTableList(currentIndex) { // While Editing job, it will get the data from BE.
    this.spinner.show();
    this.ertService.getERTtableList(this.workspaceId, this.ertJobId, currentIndex).subscribe(response => {
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
          this.selectedTableId = this.selectedTableList[0].tableId;
          const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
          this.modifiedTableName = tempTableObj.modifiedTableName;
          this.tableName = tempTableObj.tableName;
          this.isAllColumnSelected = tempTableObj.columnList.filter(a => a.isSelected === false).length === 0 ? true : false;
        }
        this.getEditedERTcolumnlist(tableIds);
      } catch {
        this.spinner.hide();
      }
    });
  }

  getNextBatchOfERTTable(event) { // When we scroll in edit mode of job then it will fetch the data from BE using index.
    if (this.ertJobId !== '' && this.ertJobId !== undefined && (this.searchTableName === '' || this.searchTableName === undefined)) {
      if (this.isEditErtTableLeft && event === 'bottom') {
        this.editErtTableIndex = this.editErtTableIndex + 1;
        this.getEditErtTableList(this.editErtTableIndex);
      }
    }
  }

  getSearchoriginalTablelist() {  // During creating job when user search table.
    this.currentPageOfOriginalErtTable = 1;
    if (this.searchOriginalTableName !== '') {
      this.ertService.getERTtablesearchList(this.workspaceId, this.searchOriginalTableName.toUpperCase(),
        this.ertJobId).subscribe(response => {
          this.originalErttableList = response;
          this.checkForAlreadySelectedTable();
        });
    } else {
      this.getOriginalErttableList('1');
    }
  }

  getSearchAvailableTablelist() {  // During creating job when user search table.
    this.currentPageOfOriginalErtTable = 1;
    if (this.searchAvailableTableName !== '') {
      this.ertService.getErtSearchAvailableTable(this.ertJobId, this.searchAvailableTableName.toUpperCase(),
        '1').subscribe(response => {
          this.ertAvillableTableList = response;
          this.inEditCheckForAlreadySelectedTable();
        });
    } else {
      this.getErtAvailableTable(1);
      this.availPage = 1;
    }
  }


  checkForAlreadySelectedTable() { // Check for a selected table in add case.
    for (const tempTable of this.selectedTableList) {
      if (this.originalErttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0] !== undefined) {
        const temp = this.originalErttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0];
        if (tempTable.isSelected) {
          temp.isSelected = true;
          temp.alreadyIsSelected = true;
        } else {
          temp.isSelected = false;
          temp.alreadyIsSelected = true;
        }
      }
    }
    for (const tempTable of this.tempOriginalSelectedTable) {
      if (this.originalErttableList.ertTableList === undefined) {
        this.spinner.hide();
      } else if (this.originalErttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0] !== undefined) {
        this.originalErttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0].isSelected = true;
      }
    }
  }

  inEditCheckForAlreadySelectedTable() { // Check for a selected table in edit case.
    for (const tempTable of this.selectedTableList) {
      if (this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0] !== undefined) {
        const temp = this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0];
        if (tempTable.isSelected) {
          temp.isSelected = true;
          temp.alreadyIsSelected = true;
        } else {
          temp.isSelected = false;
          temp.alreadyIsSelected = true;
        }
      }
    }
    for (const tempTable of this.tempOriginalSelectedTable) {
      if (this.ertAvillableTableList.erttableList.ertTableList === undefined) {
        this.spinner.hide();
      } else if (this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0] !== undefined) {
        this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tempTable.tableId)[0].isSelected = true;
      }
    }
  }

  addTempOriginalSelectedTable(tableId, $event) { // when we click on checkbox of original tables
    let tempOriginalTableObj = new ErtTableObj();
    if ($event.target.checked) {
      tempOriginalTableObj = this.originalErttableList.ertTableList.filter(a => a.tableId === tableId)[0];
      const tempObj: TableDetailsListObj = new TableDetailsListObj();
      tempObj.tableId = tableId;
      tempObj.tableName = tempOriginalTableObj.tableName;
      tempObj.modifiedTableName = tempOriginalTableObj.modifiedTableName;
      if (tempOriginalTableObj.filterNconfig !== null) {
        tempObj.filterAndOrderConfig = tempOriginalTableObj.filterNconfig;
      }
      if (tempOriginalTableObj.relatedTableDetails !== null) {
        tempObj.relatedTableDetails = tempOriginalTableObj.relatedTableDetails;
      }
      tempObj.isSelected = true;
      const checkInSelectedTableList = this.selectedTableList.filter(a => a.tableId === tableId)[0];
      if (checkInSelectedTableList === undefined) {
        this.tempOriginalSelectedTable.push(tempObj);
      } else {
        checkInSelectedTableList.isSelected = true;
      }
    } else {
      const index = this.tempOriginalSelectedTable.findIndex(a => a.tableId === tableId);
      if (index !== -1) {
        this.tempOriginalSelectedTable.splice(index, 1);
      }
    }
  }

  addTempEditErtSelectedTable(tableId, $event) { // when we click on checkbox of edit ert tables.
    let tempOriginalTableObj = new ErtTableObj();
    if ($event.target.checked) {
      tempOriginalTableObj = this.ertAvillableTableList.erttableList.ertTableList.filter(a => a.tableId === tableId)[0];
      const tempObj: TableDetailsListObj = new TableDetailsListObj();
      tempObj.tableId = tableId;
      tempObj.tableName = tempOriginalTableObj.tableName;
      tempObj.modifiedTableName = tempOriginalTableObj.modifiedTableName;
      tempObj.isSelected = true;
      if (tempOriginalTableObj.filterNconfig !== null) {
        tempObj.filterAndOrderConfig = tempOriginalTableObj.filterNconfig;
      }
      if (tempOriginalTableObj.relatedTableDetails !== null) {
        tempObj.relatedTableDetails = tempOriginalTableObj.relatedTableDetails;
      }
      const checkInSelectedTableList = this.selectedTableList.filter(a => a.tableId === tableId)[0];
      if (checkInSelectedTableList === undefined) {
        this.tempOriginalSelectedTable.push(tempObj);
      } else {
        checkInSelectedTableList.isSelected = true;
      }
    } else {
      const index = this.tempOriginalSelectedTable.findIndex(a => a.tableId === tableId);
      if (index !== -1) {
        this.tempOriginalSelectedTable.splice(index, 1);
      }
    }
  }


  addSelectTableCreateJob() { // when we click on the add of ert tables.
    if (this.tempOriginalSelectedTable.length !== 0) {
      Array.prototype.push.apply(this.selectedTableList, this.tempOriginalSelectedTable);
      this.selectedTableId = this.selectedTableList[0].tableId;
      const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.modifiedTableName = tempObj.modifiedTableName;
      this.tableName = tempObj.tableName;
      const tableIds = this.tempOriginalSelectedTable.map(function (item) { return item['tableId']; });
      this.spinner.show();
      this.tempOriginalSelectedTable = [];
      this.getEditedERTcolumnlist(tableIds);
    } else {
      this.spinner.hide();
    }

  }

  closeErrorMsg() {
    this.errorMsg = '';
  }

  getERTtableListForDataRecord() { // For data Record.
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.getERTTableForTableMode(); // During Edit Mode.
    } else {
      let tableNameList: string[]; // New data- record Job.
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
        this.selectedTableList.push(tempObj);
      }
      const tableIds = this.selectedTableList.map(function (item) { return item['tableId']; });
      this.spinner.show();
      this.getEditedERTcolumnlist(tableIds);
      this.selectedTableId = this.selectedTableList[0].tableId;
      this.modifiedTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName;
      this.tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    }
  }

  getERTtableListForSIP() { // For SIP.
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.getERTTableForTableMode(); // During Edit Mode.
    } else {
      let tableNameList: string[]; // New SIP Job.
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
        this.selectedTableList.push(tempObj);
      }
      const tableIds = this.selectedTableList.map(function (item) { return item['tableId']; });
      this.spinner.show();
      this.getEditedERTcolumnlist(tableIds);
      this.selectedTableId = this.selectedTableList[0].tableId;
      const tempTableObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.modifiedTableName = tempTableObj.modifiedTableName;
      this.tableName = tempTableObj.tableName;
      this.isAllColumnSelected = tempTableObj.columnList.filter(a => a.isSelected === false).length === 0 ? true : false;
    }
  }

  refreshColumn() {  // To refresh the selected table.
    this.spinner.show();
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getERTcolumnlist(this.ertJobId, this.workspaceId, this.selectedTableId).subscribe((result) => {
      try {
        this.ErtTableColumnList = result;
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList = this.ErtTableColumnList;
        const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
        this.modifiedTableName = tempObj.tableName;
        this.tableName = tempObj.tableName;
        this.isAllColumnSelected = tempObj.columnList.filter(a => a.isSelected === false).length === 0 ? true : false;
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].usrDefinedColumnList = [];
        this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig = new FilterAndOrderConfig();
        this.spinner.hide();
      } catch {
        this.spinner.hide();
      }
    });
  }

  initColumn() {
    return this._fb.group({
      prefix: [''], suffix: [''], column: [null]
    });
  }

  openAvailableErtTablePopup(index) { // During creating job when user click on add table btn.
    document.getElementById('ert-available-table-popup-btn').click();
    this.getErtAvailableTable(1);
    this.availPage = 1;
  }

  getErtAvailableTable(page) { // to get the available ert tables.
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.spinner.show();
      this.ertService.getErtAvailableTable(this.ertJobId, page).subscribe(result => {
        try {
          this.ertAvillableTableList = result;
          this.avilableTableCount = this.ertAvillableTableList.erttableList.sourceTableCount -
            this.ertAvillableTableList.erttableList.selectedTableCount;
          this.inEditCheckForAlreadySelectedTable();
          this.spinner.hide();
        } catch {
          this.spinner.hide();
        }
      });
    }
  }

  searchTableOnEdit() {
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
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
          if (this.selectedTableList.findIndex(a => a.tableId === tempObj.tableId) === -1) {
            this.selectedTableList.push(tempObj);
          }
        }
      });
    }
  }

  getERTcolumnlist(tableId: string, event) {
    if (this.checkForColumnSelectValidation()) {
      this.spinner.show();
      this.selectedTableId = tableId;
      const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
      this.modifiedTableName = tempObj.modifiedTableName;
      this.tableName = tempObj.tableName;
      this.isAllColumnSelected = tempObj.columnList.filter(a => a.isSelected === false).length === 0 ? true : false;
      this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
      if (this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList.length === 0) {
        this.ertService.getERTcolumnlist(this.ertJobId, this.workspaceId, tableId).subscribe((result) => {
          this.ErtTableColumnList = result;
          this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = this.ErtTableColumnList;
          this.spinner.hide();
        });
      } else {
        this.spinner.hide();
      }
    }
  }

  getEditedERTcolumnlist(tableIds: string[]) { // This will call the column list API for multiple request.
    const ertTableColumnMap = new Map();
    let ertColumnList: ErtColumnListObj[] = [];
    this.workspaceId = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.ertService.getEditedtERTcolumnlist(this.ertJobId, this.workspaceId, tableIds).subscribe(response => {
      ertColumnList = response;
      try {
        for (let item = 0; item < tableIds.length; item++) {
          ertTableColumnMap.set(tableIds[item], ertColumnList[item]);
        }
        for (const tableId of tableIds) {
          this.selectedTableList.filter(a => a.tableId === tableId)[0].columnList = ertTableColumnMap.get(tableId);
        }
        this.spinner.hide();
      } catch {
        this.spinner.hide();
      }
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

  toModifiedTableName(modifiedTableName: string) {
    const tempOriginalTableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    if (this.modifiedTableName.length === 0) {
      this.modifiedTableName = tempOriginalTableName;
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName = tempOriginalTableName;
    } else {
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].modifiedTableName = this.modifiedTableName;
    }
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
      (a => a.tableId === this.selectedTableId)[0].columnList.filter(a => a.dataType !== 'USERDEFINED')
      .map(function (item) { return item['originalColumnName']; });
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
      this.setQueryModeUserDefined();
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
    this.openColumnMode();
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
    // if (value === 'SUBSTRING' && (this.substringEndIndex === null || this.substringStartIndex === null)) {
    //   this.disabledAddColumnConfigBtn = true;
    // } else {
    //   this.disabledAddColumnConfigBtn = false;
    // }
  }

  openModelForColumnConfig(columnName: string, dataType: string) {
    if (dataType !== 'USERDEFINED') {
      this.configColumnList = [];
      this.configColumnQuery = '';
      let outputType = '';
      this.configColumnObject.selectedColumnName = columnName;
      this.configColumnObject = {
        selectedColumnName: columnName, selectedConfigFunction: null, outputType: null, param: '',
        startIndex: 1, endIndex: 1
      };
      if (dataType.trim().toUpperCase() === 'SMALLINT' ||
        dataType.trim().toUpperCase() === 'INT' || dataType.trim().toUpperCase() === 'BIGINT'
        || dataType.trim().toUpperCase() === 'DECIMAL') {
        dataType = 'INT';
      } else if (dataType.trim().toUpperCase() === 'BIT') {
        dataType = '';
      } else {
        dataType = 'VARCHAR';
      }
      if (this.columnConfigFunctionList.length === 0) {
        this.columnConfigFunctionList = columnConfigFunctionList.filter(a => a.dataType.toUpperCase() === dataType.trim().toUpperCase());
      }
      const temp = this.selectedTableList.filter
        (a => a.tableId === this.selectedTableId)[0].columnList.filter(b => b.originalColumnName === columnName)[0];
      if (temp.userColumnQuery != null && temp.viewQuery) {
        this.configColumnList = JSON.parse(temp.userColumnQuery.replace(/'/g, '"'));
        this.configColumnQuery = temp.viewQuery;
      }
      if (this.configColumnList.length !== 0) {
        // Set function list acc to the last function.
        outputType = this.configColumnList[this.configColumnList.length - 1].outputType;
        this.columnConfigFunctionList = columnConfigFunctionList.filter(a => a.outputType.trim().toUpperCase() ===
          outputType.trim().toUpperCase());
      }
      if (outputType.trim().toUpperCase() === 'NUMBER') {
        // remove length function in case of number.
        const index = this.columnConfigFunctionList.findIndex(a => a.function === 'LENGTH');
        if (index !== -1) {
          this.columnConfigFunctionList.splice(index, 1);
        }
      }
    }
  }

  saveColumnConfig() {
    let tempString = '';
    let outputType = '';
    this.disabledAddColumnConfigBtn = false;
    if (this.configColumnObject.selectedConfigFunction !== null) {
      this.configColumnObject.outputType = this.columnConfigFunctionList.
        filter(a => a.function === this.configColumnObject.selectedConfigFunction)[0].outputType;
      this.configColumnList.push(this.configColumnObject);
    }
    const tempColumnName = this.configColumnObject.selectedColumnName;
    // start- To create query string.
    for (let item = 0; item < this.configColumnList.length; item++) {
      if (item === 0 && this.configColumnList[0].selectedConfigFunction.trim().toUpperCase() === 'SUBSTRING') {
        tempString = this.configColumnList[item].selectedConfigFunction + '(' + tempColumnName + ',' +
          this.configColumnList[item].startIndex + ',' + this.configColumnList[item].endIndex + ')';
      } else if (item === 0 && this.configColumnList[0].selectedConfigFunction.trim().toUpperCase() !== 'SUBSTRING') {
        tempString = this.configColumnList[item].selectedConfigFunction + '(' + tempColumnName + ')';
      } else if (this.configColumnList[item].selectedConfigFunction.trim().toUpperCase() === 'SUBSTRING') {
        tempString = this.configColumnList[item].selectedConfigFunction + '(' + tempString + ',' +
          this.configColumnList[item].startIndex + ',' + this.configColumnList[item].endIndex + ')';
      } else if (this.configColumnList[item].selectedConfigFunction.trim().toUpperCase() !== 'SUBSTRING') {
        tempString = this.configColumnList[item].selectedConfigFunction + '(' + tempString + ')';
      }
    }
    if (this.configColumnList.length > 0) {
      this.configColumnList[this.configColumnList.length - 1].param = tempString;
    }
    // end
    this.configColumnObject = {
      selectedColumnName: tempColumnName, selectedConfigFunction: null, outputType: null, param: '',
      startIndex: 1, endIndex: 1
    };
    if (this.configColumnList.length !== 0) {
      // Set function list acc to the last function.
      outputType = this.configColumnList[this.configColumnList.length - 1].outputType;
      this.columnConfigFunctionList = columnConfigFunctionList.filter(a => a.outputType.trim().toUpperCase() ===
        outputType.trim().toUpperCase());
    } else {
      // set to original function if length is zero.
      let tempDataType = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0]
        .columnList.filter(b => b.originalColumnName.trim().toUpperCase() === tempColumnName.trim().toUpperCase())[0].dataType;
      if (tempDataType.trim().toUpperCase() === 'SMALLINT' ||
        tempDataType.trim().toUpperCase() === 'INT' || tempDataType.trim().toUpperCase() === 'BIGINT'
        || tempDataType.trim().toUpperCase() === 'DECIMAL') {
        tempDataType = 'INT';
      } else if (tempDataType.trim().toUpperCase() === 'BIT') {
        tempDataType = '';
      } else {
        tempDataType = 'VARCHAR';
      }
      this.columnConfigFunctionList = columnConfigFunctionList.filter(a => a.dataType.trim().toUpperCase() ===
        tempDataType.trim().toUpperCase());
    }
    if (outputType.trim().toUpperCase() === 'NUMBER') {
      // remove length function in case of number.
      const index = this.columnConfigFunctionList.findIndex(a => a.function === 'LENGTH');
      if (index !== -1) {
        this.columnConfigFunctionList.splice(index, 1);
      }
    } else if (this.configColumnList.length !== 0) {
      // insert length function in case of other datatype.
      this.columnConfigFunctionList.push({ function: 'LENGTH', dataType: 'VARCHAR', outputType: 'NUMBER' });
    }
    this.configColumnQuery = tempString;
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const tempColumnList = temp.columnList.filter(a => a.originalColumnName === this.configColumnObject.selectedColumnName)[0];
    tempColumnList.viewQuery = this.configColumnQuery;
    tempColumnList.userColumnQuery = JSON.stringify(this.configColumnList).replace(/"/g, '\'');
  }

  setSubStringStartEndIndex(value) {
    if (this.configColumnObject.endIndex !== null && this.configColumnObject.startIndex !== null) {
      this.disabledAddColumnConfigBtn = false;
    }
  }

  selectColumns(columnName: string, isSelected: boolean) {
    const columnsList = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    this.isAllColumnSelected = columnsList.filter(a => a.isSelected === false).length === 0 ? true : false;
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
    this.openColumnMode();
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
      this.router.navigate(['workspace/ert-jobs-config']);
    }
  }

  deleteUsrDefinedCol(i: number, columnName) {
    this.userDefinedList.splice(i, 1);
    this.ursDefinedColumnNameList.push(columnName);
    this.createUsrDefinedCONCATString();
  }

  deleteColumnCOnfig(i: number) {
    this.configColumnList.length = i;
    this.saveColumnConfig();
  }

  gotoExtractDigestExtraction() {
    if (this.checkForColumnSelectValidation()) {
      if (this.selectedTableList.filter(a => a.isSelected === true).length === 0) {
        this.errorMsg = 'Please select a table';
      } else {
        this.selectedTableList = this.selectedTableList.filter(a => a.columnList.length !== 0);
        this.ertService.setSelectedList(this.selectedTableList, this.schemaResultsTableCount, this.storeSelectedTables);
        this.ertService.isSIPGraphChange = false;
        this.ertService.isDataRecordGraphChange = false;
        this.navigateToUrl('workspace/ert/ert-extract-ingest');
      }
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
        this.router.navigate([url + '/', this.ertJobId], { queryParams: { from: this.from } });
      } else {
        this.router.navigate([url]);
      }
  }
  saveUsrDefinedColumn() {
    const isColumnNameExist = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList
      .filter(b => b.originalColumnName.trim().toUpperCase().includes(this.usrDefinedColumnName.trim().toUpperCase()));
    const length = isColumnNameExist.length;
    if (!this.disabledUserDefinedColName) {
      if (length !== 1) {
        this.saveUserDefined();
      } else {
        this.usrDefinedAlertMessage = 'Kindly provide different column name.';
        document.getElementById('query-alert').classList.remove('alert-hide');
      }
    } else {
      this.saveUserDefined();
    }
  }

  saveUserDefined() {
    if (!this.isQueryMode) {
      this.validateQueryMode();
      this.setQueryModeUserDefined();
    } else if (!this.isCombinedQueryMode) {
      this.validateCombinedColumnQueryMode();
      this.setQueryModeUserDefined();
    }
    this.disabledUserDefinedColName = false;
  }

  saveUserDefinedAfterValidate() {
    if (this.toCreateQuery) {
      const tempUsrDefinedObj = new UsrDefinedColumnListObj();
      tempUsrDefinedObj.originalColumnName = this.usrDefinedColumnName.toUpperCase().trim();
      tempUsrDefinedObj.modifiedColumnName = this.usrDefinedColumnName.toUpperCase().trim();
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
    this.isUserDefinedColumnInProgress = true;
    const param: any = {
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'query': this.usrDefinedQueryViewMode,
      'tableId': this.selectedTableId
    };
    this.ertService.validQuery(param).subscribe(res => {
      this.isUserDefinedColumnInProgress = false;
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
    }, (err: HttpErrorResponse) => {
      if (err.error) {
        this.usrDefinedAlertMessage = err.error.message;
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
        this.errorMessagesForSelection = 'Filter can only be applied on primary table.';
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
    this.filterWhereClause = '';
    this.filterOperationList = filterOperationList.filter(a => a.dataType.trim().toUpperCase() === '');
    this.filterConfigColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    this.orderFilterConfigColumnNameList = this.selectedTableList.filter
      (a => a.tableId === this.selectedTableId)[0].columnList.map(function (item) { return item['originalColumnName']; });
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const filterConfigNode = new FilterConfigNode(1, null, false, false, null, null, '', 0, 0, []);
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
    let tempString = 'order by ';
    let expressionWhere = '';
    const tableName = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].tableName;
    const temp = this.validateTree(this.filterdata.root);
    if (temp === null) {
      if (this.filterdata.root.children.length !== 0) {
        this.createFilterWhereClause(this.filterdata.root, tableName).subscribe(a => {
          expressionWhere = a;
        });
      } else {
        expressionWhere = this.filterdata.root.column + ' ' + this.filterdata.root.condition + ' ' + this.filterdata.root.value;
      }
      filterMap.set('filterList', JSON.stringify(this.filterdata));
      if (this.dataOrderList.length !== 0) {
        filterMap.set('orderList', JSON.stringify(this.dataOrderList));
        for (const item of this.dataOrderList) {
          tempString = tempString + tableName + '.' + item.column + ' ';
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
      this.filterWhereClause = 'where ' + '(' + expressionWhere + ')';
      this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].filterAndOrderConfig.filterQuery
        = this.filterWhereClause + ' ' + tempString.substring(0, tempString.length - 1);
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
          tempString = tempString + tableName + '.' + item.column + ' ';
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

  createFilterWhereClause(obj, tableName): Observable<string> {
    const children = obj.children;
    for (const child of children) {
      if (child.children.length === 0) {
        // tslint:disable-next-line:max-line-length
        this.filterWhereClause = this.filterWhereClause + '(' + tableName + '.' + child.column + ' ' + child.condition + ' ' + child.value + ') ' + child.operation + ' ';
      } else {
        this.filterWhereClause = this.filterWhereClause + '(';
        this.createFilterWhereClause(child, tableName);
        this.filterWhereClause = this.filterWhereClause + ')';
      }
    }
    return of(this.filterWhereClause);
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
      const filterConfigNode = new FilterConfigNode(id, operation, false, false, column, condition, value, 0, this.maxNode, []);
      if (id === 1) {
        const filterConfigNode2 = new FilterConfigNode(2, operation, false, false, column, condition, value, 0, 1, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode2));
        const filterConfigNode3 = new FilterConfigNode(3, '', false, false, null, null, '', 0, 1, []);
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
        const parentId = id;
        this.maxNode = this.maxNode + 1;
        const filterConfigNode2 = new FilterConfigNode(this.maxNode, operation, false, false,
          column, condition, value, 18, parentId, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode2));
        this.maxNode = this.maxNode + 1;
        const filterConfigNode3 = new FilterConfigNode(this.maxNode, '', false, false, null, null, '', 18, parentId, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode3));
      }
    }
    if (event !== '') {
      event.stopPropagation();
    }
  }


  deleteFilterConfigTreeNode(id: number) {
    let attachNode = false;
    let tempNode: any = '';
    const filterTreeNode1 = searchTree(this.filterdata.root, id);
    const parentId = filterTreeNode1.parentId;
    const filterTreeNode3 = findParentNode(this.filterdata.root, parentId);
    if (filterTreeNode3.children[0].id === id && filterTreeNode3.children[0].children.length === 0) {
      if (filterTreeNode3.children[1].column === null &&
        filterTreeNode3.children[1].condition === null && filterTreeNode3.children[1].value === '') {
        attachNode = true;
      }
    }
    if (filterTreeNode3.children[1].id === id && filterTreeNode3.children[1].children.length === 0) {
      if (filterTreeNode3.children[0].column === null &&
        filterTreeNode3.children[0].condition === null && filterTreeNode3.children[0].value === '') {
        attachNode = true;
      }
    }
    if (attachNode === false) {
      if (filterTreeNode3.children[0].id === id) {
        tempNode = filterTreeNode3.children[1];
        this.filterdata = deleteNode(this.filterdata, filterTreeNode3.children[0]);
      } else {
        tempNode = filterTreeNode3.children[0];
        this.filterdata = deleteNode(this.filterdata, filterTreeNode3.children[1]);
      }
      this.filterdata = deleteNode(this.filterdata, filterTreeNode3);
      if (filterTreeNode3.parentId !== 0) {
        const filterTreeNode2 = searchTree(this.filterdata.root, filterTreeNode3.parentId);
        tempNode.parentId = filterTreeNode3.parentId;
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterTreeNode2, tempNode));
      } else {
        const filterConfigNode = new FilterConfigNode(1, null, false, false, tempNode.column, tempNode.condition, tempNode.value, 0, 0, []);
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterConfigNode, filterConfigNode));
      }
    } else if (attachNode === true) {
      this.filterdata = deleteNode(this.filterdata, filterTreeNode1);
      const filterTreeNode2 = searchTree(this.filterdata.root, parentId);
      const grandParentId = filterTreeNode2.parentId;
      this.filterdata = deleteNode(this.filterdata, filterTreeNode2);
      if (grandParentId !== 0) {
        const grandParentNode = searchTree(this.filterdata.root, grandParentId);
        filterTreeNode2.children[0].parentId = grandParentId;
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, grandParentNode, filterTreeNode2.children[0]));
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterTreeNode2.children[0], filterTreeNode2.children[0].children[0]));
        this.filterdata = JSON.parse(addFilterNode(this.filterdata, filterTreeNode2.children[0], filterTreeNode2.children[0].children[1]));
      } else {
        filterTreeNode2.children[0].parentId = 0;
        this.filterdata.root = filterTreeNode2.children[0];
      }
    }
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
    this.ertAvillableTableList.erttableList.ertTableList = [];
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

  openColumnMode() {
    if (this.usrDefinedQueryView === '' && this.usrDefinedQueryViewMode === '') {
      this.isCombinedQueryMode = false;
      this.isQueryMode = false;
    } else if (this.usrDefinedQueryViewMode !== '' && this.usrDefinedQueryView === '') {
      this.isQueryMode = false;
      this.isCombinedQueryMode = true;
    } else if (this.usrDefinedQueryViewMode === '' && this.usrDefinedQueryView !== '') {
      this.isQueryMode = true;
      this.isCombinedQueryMode = false;
    }
  }

  changeColumnName(originalColumnName, modifiedColumnName) {
    const temp = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList.
      filter(a => a.originalColumnName === originalColumnName);
    if (modifiedColumnName.length === 0) {
      temp[0].modifiedColumnName = originalColumnName;
    } else {
      temp[0].modifiedColumnName = modifiedColumnName;
    }
  }


  filterColumnSelectionChange(columnName) {
    let type = '';
    const tempSelectedTableColumns = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    const dataType = tempSelectedTableColumns.filter(a => a.originalColumnName === columnName)[0].dataType;
    if (dataType.trim().toUpperCase() === 'SMALLINT' || dataType.trim().toUpperCase() === 'BIGINT'
      || dataType.trim().toUpperCase() === 'DECIMAL' || dataType.trim().toUpperCase() === 'INT') {
      type = 'NUMBER';
    } else if (dataType.trim().toUpperCase() === 'BIT') {
      type = 'BOOLEAN';
    } else if (dataType.trim().toUpperCase() === 'DATE') {
      type = 'DATE';
    } else {
      type = '';
    }
    this.filterOperationList = filterOperationList.filter(a => a.dataType.trim().toUpperCase() === type.trim().toUpperCase());
  }

  selectAllColumns(event) {
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0].columnList;
    if (event.target.checked) {
      tempObj.forEach(a => a.isSelected = true);
      this.isAllColumnSelected = tempObj.filter(a => a.isSelected === false).length === 0 ? true : false;
    } else {
      tempObj.forEach(a => a.isSelected = false);
      this.isAllColumnSelected = tempObj.filter(a => a.isSelected === false).length === 0 ? true : false;
    }
  }

  checkForColumnSelectValidation(): boolean {
    let isValid = true;
    const tempObj = this.selectedTableList.filter(a => a.tableId === this.selectedTableId)[0];
    const temp = tempObj.columnList;
    if (tempObj.isSelected) {
      if (temp.filter(a => a.isSelected === true).length === 0) {
        this.errorMessagesForSelection = 'Please select at least one column to proceed.';
        document.getElementById('warning-popup-btn').click();
        isValid = false;
      } else {
        isValid = true;
      }
    }
    return isValid;
  }
}






