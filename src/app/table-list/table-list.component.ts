import {
  Component, OnInit, Pipe, Input, Output, EventEmitter, ViewChild,
  AfterViewInit, OnChanges, ViewContainerRef, Inject, ElementRef
} from '@angular/core';
import { TableListService } from './table-list.service';
import { RelationshipInfoObject } from '../workspace-objects';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErrorObject } from '../error-object';
import { UserinfoService } from '../userinfo.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataAnalyzerResultScreenComponent } from '../data-analyzer-result-screen/data-analyzer-result-screen.component';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { StoredProcViewService } from '../stored-proc-view/stored-proc-view.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';
import { MatStepper, MatStepHeader } from '@angular/material';
import { StoredProcViewComponent } from '../stored-proc-view/stored-proc-view.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { PermissionService } from '../permission-utility-functions/permission.service';
import { StatusService } from '../status-screen/status.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  indexExpanded = -1;
  query: string;
  search: any = '';
  homeStage = false;
  isAvailable: boolean;
  isRelationShipAvailable: boolean;
  selectedPrimTbl: any;
  tableName: string;
  relationshipInfo: any[];
  serviceActionType: string;
  tableList: string[];
  primColArray = [];
  tempPrimColArray = [];
  secColArray = [];
  secTblArray = [];
  selectedPrimColMap = new Map(); // map of primary column name, true
  selectedSecColMap = new Map(); // map of secondary column name, true
  dataAModal = false;
  analysisRowCount = 5;
  // selectedPrimCol = new Map();
  selectedSecTbl = new Map(); // map of secondary table name, true
  secTblColMap = new Map();
  finalSecColMap = new Map();
  enableNextBtn = false;
  // primColLoader = false;
  // secColLoader = false;
  prefixSecTblId = 'secTbl_';
  secTblColJoiner = '$$';
  selectedTblsColsObj: any = {};
  workspaceID: any;
  selectedPrimTblID: any;
  index = '';
  editrelationshipInfo: any;
  primaryTableId: any;
  joinListTemp: any;
  relationShipIDs = [];
  delProgress: boolean;
  deleteNotif = new ErrorObject();
  editValues: any;
  tableCopy: any;
  SecondaryTableName: string;
  SecondaryTableId: any;
  userId: any;
  finalPrimColArray: any[];
  finalSecondaryTableList: any[];
  finalSecColArray = [];
  selectedRow: any;
  dataAnalysisjobID: any;
  joinName: any;
  joinValues: any;
  metalyzerServiceId: any;
  dataSlide: string;
  JobStatus: string;
  defaultModel = true;
  resultantArray: any[];
  xml = 'xml';
  json = 'json';
  databaseID: any;
  perPage = 50;
  searchTableName;
  page;
  dynamicLoaderService: DynamicLoaderService;
  @ViewChild('storedprocView', { read: ViewContainerRef }) storedprocViewRef: ViewContainerRef;
  message;
  addDirectjoin: boolean;
  isTablelistAvailable: boolean;
  wsName: string;
  startIndex = 1;
  schemaResultsTableCount = 0;
  paginationRequired: boolean;
  currentStepNo = null;
  @ViewChild('stepper') stepper: MatStepper;
  value: any;
  searchPrimary = '';
  searchSec1;
  searchSec2;
  primaryPage = 1;
  spview = false;
  stepperIndex = 0;
  sectableList: string[];
  schemaResultssecTableCount: number;
  secstartIndex = 1;
  permissionToUser = '';
  modeForSelectAll = false;
  jobname;
  responsemsg: any;
  @ViewChild('click1') button1: ElementRef;
  @ViewChild('stopjoberror') button2: ElementRef;
  selectedSectableName = '';

  constructor(
    private tablelistService: TableListService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private userinfoService: UserinfoService,
    private storedProcViewService: StoredProcViewService,
    private router: Router,
    private route: ActivatedRoute,
    private addDirectJoinService: AddDirectJoinService,
    private spinner: NgxSpinnerService,
    @Inject(DynamicLoaderService) dynamicLoaderService,
    @Inject(ViewContainerRef) viewContainerRef,
    private permissionService: PermissionService,
    private statusService: StatusService
  ) {
    this.dynamicLoaderService = dynamicLoaderService;
    this.storedprocViewRef = viewContainerRef;
    this.userId = this.userinfoService.getUserId();

  }
  ngOnInit() {
    this.tablelistService.currentValue.subscribe(value => {
      this.homeStage = value;
      if (this.homeStage === true) {
        this.loadRelationTable(this.tableCopy);
      }
    });
    this.storedProcViewService.currentSPVValue.subscribe(value => {
      this.homeStage = value;
      if (this.homeStage === true) {
        setTimeout(() => {
          this.loadRelationTable(this.tableCopy);
        }, 1000);
      }
    });
    this.addDirectJoinService.currentDJVValue.subscribe(value => {
      this.homeStage = value;
      if (this.homeStage === true) {
        setTimeout(() => {
          this.loadRelationTable(this.tableCopy);
        }, 1000);
      }
    });
    this.isAvailable = false;
    this.isRelationShipAvailable = false;
    this.getTableList();

    this.metalyzerHeaderService.getWorkspaceName().subscribe(result => {
      this.wsName = result;
    });
    this.tablelistService.selectTables(true);
    this.permissionToUser = this.permissionService.getMetalyzerPermission();
  }


  getTableList() {
    this.spinner.show();
    try {
      this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
      this.metalyzerServiceId = this.workspaceHeaderService.getMetalyzerServiceId(this.userId);
      this.tablelistService.getTableList(this.workspaceID, this.startIndex).subscribe((res: any) => {
        this.tableList = res.tableList;
        this.sectableList = res.tableList;
        if (this.tableList.length === 0) {
          this.isTablelistAvailable = true;
          this.tablelistService.selectDropdown(false);
        } else {
          this.tablelistService.selectDropdown(true);
        }
        this.isAvailable = true;
        if (res.paginationRequired) {
          this.schemaResultssecTableCount = (this.startIndex + 1) * 50;
          this.schemaResultsTableCount = (this.startIndex + 1) * 50;
        }
        this.spinner.hide();
      });
    } catch {
      this.spinner.hide();
    }
  }

  getPage(page: number) {
    this.tableList = [];
    this.startIndex = page;
    this.tablelistService.getTableList(this.workspaceID, this.startIndex).subscribe((res: any) => {
      this.tableList = res.tableList;
      if (res.paginationRequired) {
        this.schemaResultsTableCount = (this.startIndex + 1) * 50;
      }
    });
  }

  getsecPage(page: number) {
    this.sectableList = [];
    this.secstartIndex = page;
    this.tablelistService.getTableList(this.workspaceID, this.secstartIndex).subscribe((res: any) => {
      this.secTblArray = res.tableList;
      if (res.paginationRequired) {
        this.schemaResultssecTableCount = (this.secstartIndex + 1) * 50;
      }
    });
  }

  searchTablelist() {
    this.tableList = [];
    this.tablelistService.getTablesearchList(this.workspaceID, this.searchTableName).subscribe((res: any) => {
      this.tableList = res.tableList;
    });
  }

  loadRelationTable(table: any) {
    this.spinner.show();
    try {
      this.defaultModel = false;
      this.tableCopy = table;
      this.homeStage = true;
      this.dataAModal = false;
      this.selectedPrimTblID = table.tableId;
      this.selectedPrimTbl = table.tableName;
      this.resetDataAModal();
      this.tablelistService.getListOfRelationTable(this.selectedPrimTblID, this.workspaceID).subscribe(result => {
        this.relationshipInfo = result;
        this.isRelationShipAvailable = true;
        if (this.relationshipInfo.length === 0) {
          this.isRelationShipAvailable = false;
        }
        this.spinner.hide();
      });
      this.serviceActionType = this.tablelistService.getServiceActionType();
    } catch {
      this.spinner.hide();
    }
  }

  openDataAModal() {
    this.stepperIndex = 0;
    setTimeout(() => {
      this.changeMatStepIcon();
    }, 800);
    this.tablelistService.stateManagement(this.userId, this.workspaceID, this.metalyzerServiceId).subscribe(res => {
      if (res.data.jobIds.length > 0) {
        this.homeStage = false;
        this.dataAModal = true;
        this.dataAnalysisjobID = res.data.jobIds[0];
        this.getJobStatus();
      } else {
        this.homeStage = false;
        this.dataAModal = true;
        this.getColumnsByTableName(this.selectedPrimTblID, true);
        this.resetDataAModal();
      }
    });
  }
  openEditRelationship(relation) {
    this.editValues = relation;
  }

  joinTable(table) {
    this.joinValues = table;
    this.tablelistService.selectTables(table);
  }

  getColumnsByTableName(tableId, isPrime) {
    if (isPrime) {
      this.primColArray = [];
      // this.primColLoader = true;
    } else {
      this.secColArray = [];
      // this.secColLoader = true;
    }
    this.spinner.show();
    try {
      this.tablelistService.getColumnsByTableId(tableId).subscribe((columns) => {
        if (isPrime) {
          this.primColArray = columns;
          this.tempPrimColArray = columns;
          // this.primColLoader = false;
        } else {
          this.secTblColMap.set(tableId, columns);
          this.secColArray = columns;
          // this.secColLoader = false;
          this.selectedSecColMap.clear();
        }
        this.spinner.hide();
      });
    } catch {
      this.spinner.hide();
    }
  }

  gotoBack() {
    this.homeStage = true;
    this.dataAModal = false;
    this.tablelistService.dataAnalyzerReset = true;
  }
  resetDataAModal() {
    this.enableNextBtn = false;
    this.secTblArray = [];
    this.secColArray = [];
    this.selectedPrimColMap.clear();
    this.secTblColMap.clear();
    this.selectedSecColMap.clear();
    this.finalSecColMap.clear();
    this.selectedSecTbl.clear();
    this.finalSecColArray = [];
  }
  // for selecting and mapping the checked values of table
  toggleColSelection(_event, isPrimary, column) {
    this.modeForSelectAll = false;
    const isChecked = _event.target.checked ? true : false;
    if (isPrimary) {
      for (let i = 0; i < this.primColArray.length; i++) {
        if (this.primColArray[i].columnName === column.columnName) {
          this.primColArray[i].selected = isChecked;
          if (isChecked) {
            this.selectedPrimColMap.set(column.columnName, true);
          } else {
            this.selectedPrimColMap.delete(column.columnName);
          }
          break;
        }
      }
      const totalCountPri = this.primColArray.length;
      const selectedCount = this.primColArray.filter(a => a.selected === true).length;
      const secTbl = <HTMLInputElement>document.getElementById('selectallpri');
      if (!isChecked && isPrimary) {
        if (secTbl.checked === true) {
          secTbl.indeterminate = true;
        }
      }
      if (selectedCount === 0) {
        secTbl.checked = false;
        secTbl.indeterminate = false;
      }
      if (selectedCount === totalCountPri) {
        secTbl.indeterminate = false;
        secTbl.checked = true;
      }
    } else {
      for (let i = 0; i < this.secColArray.length; i++) {
        if (this.secColArray[i].columnName === column.columnName) {
          const secColName = this.SecondaryTableName + this.secTblColJoiner + column.columnName;
          this.secColArray[i].selected = isChecked;
          if (isChecked) {
            this.selectedSecColMap.set(secColName, true);
            const secTbl = <HTMLInputElement>document.getElementById(this.prefixSecTblId + this.SecondaryTableName);
            if (!this.selectedSecTbl.has(this.SecondaryTableName)) { // if sec table unselected and sec col is checked
              secTbl.click();
            }
            this.finalSecColMap.set(secColName, true);
          } else {
            this.selectedSecColMap.delete(secColName);
            this.finalSecColMap.delete(secColName);
          }
          break;
        }
      }
    const totalCountSec = this.secColArray.length;
    const selectedCount = this.secColArray.filter(a => a.selected === true).length;
    const secTbl = <HTMLInputElement>document.getElementById(this.selectedSectableName);
      if (!isChecked) {
        if (secTbl.checked === true) {
          secTbl.indeterminate = true;
        }
      }
      if (selectedCount === 0) {
        secTbl.checked = false;
        secTbl.indeterminate = false;
        // unselect sectbl here
      (<HTMLInputElement>document.getElementsByClassName(this.selectedSectableName)[0]).click();
      (<HTMLInputElement>document.getElementById(this.prefixSecTblId + this.selectedSectableName)).click();
      }
      if (selectedCount === totalCountSec) {
        secTbl.indeterminate = false;
        secTbl.checked = true;
      }
    }
    (<HTMLInputElement>document.getElementsByClassName(this.selectedSectableName)[0]).click();
    this.enableDisableNextBtn();
  }
  toggleSecTblSelection(_event, table) {
    const isChecked = _event.target.checked;
    for (let i = 0; i < this.secTblArray.length; i++) {
      if (this.secTblArray[i].tableName === this.SecondaryTableName) {
        this.secTblArray[i].selected = isChecked;
        if (isChecked) {
          this.selectedSecTbl.set(this.SecondaryTableName, true);
        } else {
          this.selectedSecTbl.delete(this.SecondaryTableName);
          // sec col reset selection
          this.secColArray.forEach(col => col.selected = false);
          this.selectedSecColMap.clear();
          const currentSecColArr = this.secTblColMap.get(this.SecondaryTableId);
          currentSecColArr.forEach(secCol => {
            const secColName = this.SecondaryTableName + this.secTblColJoiner + secCol.columnName;
            if (this.finalSecColMap.has(secColName)) {
              this.finalSecColMap.delete(secColName);
            }
          });
        }
        break;
      }
    }
    this.enableDisableNextBtn();
  }
  // for keeping the table selected
  toggleTblSelection(_event) {
    const parentDiv = $(_event.target).parents('.da-table-parent');
    const children = $(parentDiv).find('.da-table');
    children.each((i, el) => {
      el.classList.remove('selected');
    });
    if (_event.target.classList.contains('da-table')) {
      _event.target.classList.add('selected');
    } else {
      $(_event.target).parents('.da-table').addClass('selected');
    }
  }
  // loads selected the table
  highlightTable(_event, isPrime, table) {
    this.toggleTblSelection(_event);
    if (isPrime) {
      this.tableName = table.tableName;
      this.loadRelationTable(table);
      this.resetDataAModal();
    } else {
      this.SecondaryTableName = table.tableName;
      this.SecondaryTableId = table.tableId;
      this.showSecTblCols(table.tableId);
    }
  }
  // secondary table Columns
  showSecTblCols(tableId) {
    if (this.secTblColMap.has(tableId)) {
      this.secColArray = this.secTblColMap.get(tableId);
      this.selectedSecColMap.clear();
      this.secColArray.forEach(col => {
        if (col.selected) {
          this.selectedSecColMap.set(col.columnName, true);
        }
      });
    } else {
      this.getColumnsByTableName(tableId, false);
    }
  }

  // generating secondary table array
  generateSecTblArray() {
    if (this.secTblArray.length === 0) {
      for (const i of this.sectableList) {
        if (i !== this.selectedPrimTbl) {
          this.secTblArray.push(i);
        }
      }
    }
    // this.enableNextBtn = this.selectedSecTbl.size > 0;
  }
  enableDisableNextBtn() {
    const currentStep = this.currentStepNo;
    switch (currentStep) {
      case 0:
        this.enableNextBtn = this.selectedPrimColMap.size > 0;
        break;
      case 1:
        this.enableNextBtn = this.finalSecColMap.size > 0;
        break;
      default:
        break;
    }
  }
  // carousel handling codes
  addClass(elementId, classSelector) {
    // document.getElementById(elementId).classList.add(classSelector);
  }
  removeClass(elementId, classSelector) {
    document.getElementById(elementId).classList.remove(classSelector);
  }

  prevStep(e) {
    document.getElementById('prev-slide').click();
    this.finalSecColArray = [];
    this.handleStepIindicator(false);
    this.enableNextBtn = this.selectedPrimColMap.size > 0;
  }

  nextStep(e, stepper: MatStepper) {
    this.currentStepNo = stepper.selectedIndex;
    this.stepper.selectedIndex = 1;
    this.handleStepIindicator(true);
    this.enableNextBtn = this.finalSecColMap.size > 0;
  }
  gotoSecTableAndColSelection(e, stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    setTimeout(() => {
      const a = document.getElementsByClassName('mat-horizontal-stepper-header');
      a[0].classList.add('mat-psedu');
      a[1].classList.add('mat-k-psedu');
      const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
      b[0].children[1].classList.add('mat-horizental-line');
      const a1 = document.getElementsByClassName('mat-horizontal-stepper-header');
      if (a1[1].classList.contains('mat-auth-psedu')) {
        a1[1].classList.remove('mat-auth-psedu');
        a1[2].classList.remove('mat-review-psedu');
        const b1 = document.querySelectorAll('.mat-horizontal-stepper-header-container');
        b1[0].children[3].classList.remove('mat-horizental-line');
      }
      if (steps[0].state === 'edit') {
        this.value[0].children[1].classList.add('finished-step');
      }
      if (steps[2].state === 'edit') {
        this.value[2].children[1].classList.add('finished-step');
      }
      if (steps[3].state === 'edit') {
        this.value[3].children[1].classList.add('finished-step');
      }
      this.value[1].children[1].classList.add('active-step');
      if (this.value[1].children[2].classList.contains('inactive-text-color')) {
        this.value[1].children[2].classList.remove('inactive-text-color');
      }
      this.value[1].children[2].classList.add('active-text-color');
    }, 300);
    this.currentStepNo = stepper.selectedIndex;
    this.stepper.selectedIndex = 1;
    this.handleStepIindicator(true);
    this.enableNextBtn = this.finalSecColMap.size > 0;
    setTimeout(() => {
      if (this.tablelistService.dataAnalyzerReset) {
        const inputElements = document.querySelectorAll('.sec-br input');
        for (let i = 0; i < inputElements.length; i++) {
          if ((inputElements[i] as HTMLInputElement).type === 'checkbox') {
            (inputElements[i] as HTMLInputElement).checked = false;
          }
        }
        this.tablelistService.dataAnalyzerReset = false;
      }
    }, 100);
  }
  gotoPrimarySel(e, stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    setTimeout(() => {
      const a = document.getElementsByClassName('mat-horizontal-stepper-header');
      a[0].classList.remove('mat-psedu');
      a[1].classList.remove('mat-k-psedu');
      const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
      b[0].children[1].classList.remove('mat-horizental-line');
      this.value[0].children[1].classList.add('active-step');
      if (steps[1].state === 'edit') {
        this.value[1].children[1].classList.add('finished-step');
      }
      if (steps[2].state === 'edit') {
        this.value[2].children[1].classList.add('finished-step');
      }
      if (steps[3].state === 'edit') {
        this.value[3].children[1].classList.add('finished-step');
      }
    }, 300);
    this.finalSecColArray = [];
    this.handleStepIindicator(false);
    this.enableNextBtn = this.selectedPrimColMap.size >= 1;
    this.currentStepNo = stepper.selectedIndex;
    this.stepper.selectedIndex = 0;
  }

  gotoAnalyze(e, stepper: MatStepper) {
    const steps: MatStepHeader[] = stepper._stepHeader.toArray();
    setTimeout(() => {
      const a = document.getElementsByClassName('mat-horizontal-stepper-header');
      a[1].classList.add('mat-auth-psedu');
      a[2].classList.add('mat-review-psedu');
      const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
      b[0].children[3].classList.add('mat-horizental-line');
      this.value[2].children[1].classList.add('active-step');
      if (this.value[2].children[2].classList.contains('inactive-text-color')) {
        this.value[2].children[2].classList.remove('inactive-text-color');
      }
      this.value[2].children[2].classList.add('active-text-color');
      if (steps[1].state === 'edit') {
        this.value[1].children[1].classList.add('finished-step');
      }
      if (steps[3].state === 'edit') {
        this.value[3].children[1].classList.add('finished-step');
      }
      if (steps[0].state === 'edit') {
        this.value[0].children[1].classList.add('finished-step');
      }
    }, 300);
    this.currentStepNo = stepper.selectedIndex;
    this.stepper.selectedIndex = 2;
    this.stepperIndex = 2;
    this.handleStepIindicator(true);
    this.enableNextBtn = this.finalSecColMap.size > 0;
  }


  getAllSelectedTblsCols() {
    this.finalPrimColArray = [];
    this.selectedPrimColMap.forEach((val, key) => {
      for (const i of this.primColArray) {
        if (key === i.columnName) {
          const columnObject = {
            'columnId': i.columnId,
            'columnName': i.columnName,
            'dataType': i.columnDataType
          };
          this.finalPrimColArray.push(columnObject);
        }
      }
    });
    this.selectedTblsColsObj.userId = this.userId;
    this.selectedTblsColsObj.workspaceId = this.workspaceID;
    this.selectedTblsColsObj.primaryTable = {
      'tableId': this.selectedPrimTblID,
      'tableName': this.selectedPrimTbl,
      'primaryColumnList': this.finalPrimColArray
    };
    this.selectedTblsColsObj.secondaryTableList = [];
    const secMap = new Map();
    this.finalSecColMap.forEach((val, key) => {
      const arr = key.split(this.secTblColJoiner);
      const secTbl = arr[0];
      let secColTempArray = [];
      let secTblId;
      for (const i of this.secTblArray) {
        if (secTbl === i.tableName) {
          secTblId = i.tableId;
        }
      }
      secColTempArray = this.secTblColMap.get(secTblId);
      let secCol;
      for (const i of secColTempArray) {
        if (arr[1] === i.columnName) {
          secCol = {
            'columnId': i.columnId,
            'columnName': i.columnName,
            'dataType': i.columnDataType
          };
        }
      }
      if (secMap.has(secTbl)) {
        const secCols = secMap.get(secTbl);
        secCols.push(secCol);
      } else {
        secMap.set(secTbl, [secCol]);
      }
    });
    secMap.forEach((valArray, key) => {
      let secTblId;
      for (const i of this.secTblArray) {
        if (key === i.tableName) {
          secTblId = i.tableId;
        }
      }
      this.selectedTblsColsObj.secondaryTableList.push(
        {
          'tableId': secTblId,
          'tableName': key,
          'secondaryColumnList': valArray
        }
      );
    });
    this.selectedTblsColsObj.configurationDetails = {
      'samplingPercentage': this.analysisRowCount
    };
    this.finalSecondaryTableList = this.selectedTblsColsObj.secondaryTableList;
  }
  handleStepIindicator(isNext) {
    const slideNo = this.currentStepNo;
    switch (slideNo) {
      case 0:
        if (this.selectedSecTbl.size === 0) {
          this.enableNextBtn = false;
        }
        this.generateSecTblArray();
        break;
      case 1:
        this.getAllSelectedTblsCols();
        this.enableDisableNextBtn();
        break;
    }
  }
  dataAnalyse() {
    // setTimeout(() => {
    //   const a = document.getElementsByClassName('mat-horizontal-stepper-header');
    //   a[3].classList.add('mat-analyze-psedu-before');
    //   a[2].classList.add('mat-analyze-psedu');
    //   const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
    //   b[0].children[5].classList.add('mat-horizental-line');
    //   this.value[2].children[1].classList.add('finished-step');
    //   this.value[3].children[1].classList.add('active-step');
    // }, 300);
    // this.stepper.selectedIndex = 3;
    this.tablelistService.sendValuesForTableToTableAnalysis(this.selectedTblsColsObj).subscribe(res => {
      if (res && res.success) {
        this.dataAnalysisjobID = res.data.jobId;
        this.getJobStatus();
      }
    });
  }

  getJobStatus() {
    this.tablelistService.getJobStatus(this.dataAnalysisjobID).subscribe(res => {
      this.JobStatus = res.data.jobStatus;
      // document.getElementById('close-analyzer-popup').click();
      if (this.JobStatus === 'SUCCESS') {
        this.dataAModal = false;
        this.homeStage = false;
        this.resultantArray = [{
          'workspaceId': this.workspaceID,
          'primaryTableId': res.data.tableId,
          'primaryTableName': res.data.tableName,
          'relationDetails': res.data.relationDetails,
          'secondaryTableId': res.data.relationDetails[0].secondaryTableList[0].tableId,
          'secondaryTableName': res.data.relationDetails[0].secondaryTableList[0].tableName,
          'jobId': this.dataAnalysisjobID
        }];
        this.tablelistService.changeArray(this.resultantArray);
        this.router.navigate(['workspace/metalyzer/ALL/analysis/resultant']);
      } else if (this.JobStatus === 'FAILED') {
        document.getElementById('anaerror').click();
        // this.addDirectJoinService.clearSession(this.dataAnalysisjobID).subscribe();
        // this.JobStatus = '';
      } else {
        setTimeout(() => {
          this.stepper.selectedIndex = 2;
          this.stepperIndex = 2;
          this.value[2].children[1].classList.add('active-step');
          if (document.getElementById('analyzes').classList.contains('in') === false) {
            document.getElementById('open-analyzer-popup').click();
          } else {
          }
        }, 1000);
      }
    });
  }

  changeMatStepIcon() {
    this.value = document.querySelectorAll('.mat-horizontal-stepper-header');
    this.value[0].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">crop_portrait</i>';
    this.value[1].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">table_chart</i>';
    this.value[2].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">insert_chart_outlined</i>';
    this.value[3].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">format_list_bulleted</i>';
    this.value[2].children[1].classList.add('unfinished-step');
    this.value[1].children[1].classList.add('unfinished-step');
    this.value[3].children[1].classList.add('unfinished-step');
    this.value[2].children[2].classList.add('inactive-text-color');
    this.value[1].children[2].classList.add('inactive-text-color');
    this.value[3].children[2].classList.add('inactive-text-color');
  }

  deleteRelationship(indexOfDelete) {
    this.index = indexOfDelete;
    this.editrelationshipInfo = JSON.parse(JSON.stringify(this.relationshipInfo[this.index]));
    this.joinName = this.editrelationshipInfo.joinName;
    this.primaryTableId = this.editrelationshipInfo.primaryTable.tableId;
    this.joinListTemp = this.editrelationshipInfo.joinListInfo;
    for (const x of this.joinListTemp) {
      this.relationShipIDs.push(x.relationshipId);
    }
  }

  confirmDelete(): void {
    this.delProgress = true;
    this.tablelistService.deleteRelationInfoData(this.workspaceID, this.primaryTableId, this.joinName, this.relationShipIDs)
      .subscribe((res) => {
        this.relationShipIDs = [];
        this.delProgress = false;
        if (res && res.success) {
          this.postDelete();
        }
      }, (err: HttpErrorResponse) => {
        this.deleteNotif.show = true;
        this.deleteNotif.message = err.error.message;
      });
  }
  closeErrorMsg() {
    this.deleteNotif = new ErrorObject();
    this.relationShipIDs = [];
  }
  postDelete() {
    const close: HTMLButtonElement = document.querySelector('#confirmDelMemModal #dismissmodel');
    close.click();
    this.loadRelationTable(this.tableCopy);
  }
  finalSecCol(x, i) {
    this.selectedRow = i;
    this.finalSecColArray = x.secondaryColumnList;
  }
  refreshRelation($event) {
    this.loadRelationTable(this.tableCopy);
    document.getElementById('editsuccess').click();
  }


  openStoredProcView(event) {
    // if (this.storedprocViewRef.get(0)) {
    //   this.storedprocViewRef.remove(0);
    //   this.dynamicLoaderService.setRootViewContainerRef(this.storedprocViewRef);
    //   this.dynamicLoaderService.addStoredProcViewDynamicComponent(this.tableName);
    this.homeStage = false;
    this.dataAModal = false;
    this.storedProcViewService.tableName = this.tableName;
    // const obj1 = new StoredProcViewComponent(this.workspaceHeaderService, this.storedProcViewService);
    // obj1.tableName =  this.tableName;
    // console.log(obj1.tableName, 'asf');
    this.router.navigate(['workspace/metalyzer/ALL/analysis/spview']);
    // document.getElementById('openCreateStoredViewmodal').click();
    // } else {
    //   this.dynamicLoaderService.setRootViewContainerRef(this.storedprocViewRef);
    //   this.dynamicLoaderService.addStoredProcViewDynamicComponent(this.tableName);
    //   document.getElementById('openCreateStoredViewmodal').click();
    // }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    if (this.storedprocViewRef) {
      this.storedprocViewRef.remove(0);
    }
  }

  adddirectjoin() {
    this.homeStage = false;
    this.dataAModal = false;
    this.addDirectJoinService.workspaceID = this.workspaceID;
    this.addDirectJoinService.directJoin = this.joinValues;
    //  this.addDirectjoin = true;
    this.router.navigate(['workspace/metalyzer/ALL/analysis/addjoin']);
  }

  downloadFile(content, fileType) {
    const fileName = this.wsName + '-metadata.xml';
    const type = fileType || 'xml';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.xml';
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  downloadFilejson(content, fileType) {
    const fileName = this.wsName + '-metadata.json';
    const type = fileType || 'json';
    const e = document.createEvent('MouseEvents');
    const a = document.createElement('a');
    a.download = fileName || 'output.json';
    a.href = window.URL.createObjectURL(content);
    a.dataset.downloadurl = [type, a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  }
  exportxml() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.tablelistService.getExportxml(this.workspaceID, this.databaseID, this.xml, this.selectedPrimTblID)
      .subscribe(result => {
        this.message = result.data.message;
        this.jobname = result.data.jobName;
        document.getElementById('successPop').click();
        // this.downloadFile(result, result.type);
      });
  }
  exportjson() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.tablelistService.getExportjson(this.workspaceID, this.databaseID, this.json, this.selectedPrimTblID)
      .subscribe(result => {
        this.message = result.data.message;
        this.jobname = result.data.jobName;
        document.getElementById('successPop').click();
        // this.downloadFilejson(result, result.type);
      });
  }

  selectAll(event) {
    // if (!this.modeForSelectAll) {
    //   $('input:checkbox#selectallpri').click();
    // } else {
    if (event.target.checked) {
      $('input:checkbox:not(:checked).m-r-10').click();
    } else {
      $('input:checkbox:checked.m-r-10').click();
    }
  }

  selectAllSec(event) {
    if (event.target.checked) {
      $('input:checkbox:not(:checked).m-r-10.m-r-sec').click();
    } else {
      $('input:checkbox:checked.m-r-10.m-r-sec').click();
      (<HTMLInputElement>document.getElementsByClassName(this.selectedSectableName)[0]).click();
      // (<HTMLInputElement>document.getElementById(this.prefixSecTblId + this.selectedSectableName)).click();
    }
  }

  togglePanels(index: number) {
    this.indexExpanded = index === this.indexExpanded ? -1 : index;
  }

  searchTable(value) {
    if (value !== '') {
      const tempList = this.tempPrimColArray.filter(a => a.columnName.trim().toLowerCase().includes(value.toLowerCase()));
      this.primColArray = [];
      this.primColArray = tempList;
    } else {
      this.primColArray = this.tempPrimColArray;
    }
  }

  closeScreen() {
    setTimeout(() => {
      this.addDirectJoinService.clearSession(this.dataAnalysisjobID).subscribe();
    }, 1000);
    // this.JobStatus = '';
    this.homeStage = true;
    this.dataAModal = false;
    this.router.navigate(['/workspace/metalyzer/ALL/analysis']);
  }
  bgsel(i) {
    this.selectedRow = i;
  }
  bgcol(c) {
    this.selectedRow = c;
  }

  terminateJob() {
    const el: HTMLElement = this.button1.nativeElement as HTMLElement;
    const el1: HTMLElement = this.button2.nativeElement as HTMLElement;
    this.statusService.terminateJob(this.dataAnalysisjobID).subscribe((result: any) => {
      if (result) {
        this.responsemsg = result.data;
        el.click();
      }
    }, (err: HttpErrorResponse) => {
      this.responsemsg = err.error.message;
      el1.click();
    });
  }

  afterTerminate() {
    this.closeScreen();
  }

  checkForSelectAll() {
    this.spinner.show();
    setTimeout(() => {
      const checkboxes: any = document.getElementsByName(this.selectedSectableName);
      let countSelected = 0;
      let uncountSelected = 0;
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        if (checkboxes[i].checked) {
          countSelected = countSelected + 1;
        } else {
          uncountSelected = uncountSelected + 1;
        }
        }
      if ((checkboxes.length) === countSelected) {
        // all are checked
        const a = <HTMLInputElement>document.getElementById(this.selectedSectableName);
       a.indeterminate = false;
       a.checked = true;
      }
      if ((checkboxes.length) === uncountSelected) {
        // all are unchecked
        const a = <HTMLInputElement>document.getElementById(this.selectedSectableName);
      a.indeterminate = false;
       a.checked = false;
      }
      if (countSelected !== 0 && uncountSelected !== 0) {
        // few are checked and few are not checked
        const a = <HTMLInputElement>document.getElementById(this.selectedSectableName);
        a.indeterminate = true;
      }
    this.spinner.hide();
    }, 1000);
  }

}
