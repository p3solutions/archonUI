import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { TableListService } from '../table-list/table-list.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { MatStepper } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-data-analyzer-result-screen',
  templateUrl: './data-analyzer-result-screen.component.html',
  styleUrls: ['./data-analyzer-result-screen.component.css']
})
export class DataAnalyzerResultScreenComponent implements OnInit, AfterViewInit {

  primaryColMap = new Map();
  secTableIdMap = new Map();
  primaryColDetailsMap = new Map();
  resultantMap = new Map();
  SecondaryTableList = [];
  SecondaryColumnList = [];
  finalSecondaryArray = [];
  secTableNameMap = new Map();
  activateSecondary = true;
  activatePrimary = false;
  resultant = [];
  populatePrimaryValuesArray: any;
  populateSecondaryValuesArray: any;
  primaryTableId: any;
  primaryTableName: any;
  secodaryTableId: any;
  secondaryTableName: any;
  workspaceId: any;
  selectedPrimaryColumn: any;
  secondaryTableListArray: any;
  dtOptions: DataTables.Settings = {};
  selectedSecondaryTable: any;
  updateSuccess = false;
  errorMsg: any;
  updateNotif = false;
  p = 1;
  jobId: any;
  @ViewChild('stepper') stepper: MatStepper;
  value: any;
  dataSource = new MatTableDataSource<any>(this.populateSecondaryValuesArray);
  displayedColumns: string[] = ['primaryColumn', 'dataType', 'secondaryColumnName', 'matchPercentage', 'checked'];
  columnlength = 0;
  dataSource1 = new MatTableDataSource<any>(this.populatePrimaryValuesArray);
  displayedColumns1: string[] = ['tableName', 'dataType', 'secondaryColumnName', 'matchPercentage', 'checked'];
  columnlength1 = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  toggleBoolean = false;
  selectedRow: any;
  selectedIndex = 0;
  pricheckvalueMap = new Map();
  seccheckvalueMap = new Map();

  constructor(private tablelistService: TableListService,
    private addDirectJoinService: AddDirectJoinService,
    private router: Router) {
  }


  ngOnInit() {
    this.tablelistService.currentResultArray.subscribe(res => {
      if (res[0] !== undefined) {
        this.workspaceId = res[0].workspaceId,
          this.resultant = res[0].relationDetails;
        this.primaryTableId = res[0].primaryTableId;
        this.primaryTableName = res[0].primaryTableName;
        this.jobId = res[0].jobId;
        this.secodaryTableId = res[0].secondaryTableId;
        this.secondaryTableName = res[0].secondaryTableName;
      }
    });
    this.getPrimaryColumns();
    this.getSecondaryColumns();
  }

  ngAfterViewInit() {
    this.selectRow();
    this.value = document.querySelectorAll('.mat-horizontal-stepper-header');
    if (this.value[0] !== undefined && this.value[1] !== undefined && this.value[2] !== undefined && this.value[3] !== undefined) {
      this.value[0].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">crop_portrait</i>';
      this.value[1].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">table_chart</i>';
      this.value[2].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">insert_chart_outlined</i>';
      this.value[3].querySelector('.mat-step-icon-content').innerHTML = '<i class="material-icons">format_list_bulleted</i>';
      this.value[0].children[1].classList.add('finished-step');
      this.value[1].children[1].classList.add('finished-step');
      this.value[2].children[1].classList.add('finished-step');
      this.value[3].children[1].classList.add('active-step');
      this.value[3].children[2].classList.add('active-text-color');
      const a = document.getElementsByClassName('mat-horizontal-stepper-header');
      const b = document.querySelectorAll('.mat-horizontal-stepper-header-container');
      a[1].classList.add('mat-auth-psedu');
      a[2].classList.add('mat-review-psedu');
      a[0].classList.add('mat-psedu');
      a[1].classList.add('mat-k-psedu');
      b[0].children[1].classList.add('mat-horizental-line');
      b[0].children[3].classList.add('mat-horizental-line');
      b[0].children[5].classList.add('mat-horizental-line');
      a[3].classList.add('mat-analyze-psedu-before');
      a[2].classList.add('mat-analyze-psedu');
    }
  }

  getPrimaryColumns() {
    for (const i of this.resultant) {
      this.finalSecondaryArray = [];
      for (const j of i.secondaryTableList) {
        const tablename = j.tableName;
        for (const z of j.secondaryColumnList) {
          const temp = {
            tableName: tablename,
            secondaryColumnId: z.secondaryColumnId,
            secondaryColumnName: z.secondaryColumnName,
            dataType: z.dataType,
            matchPercentage: z.matchPercentage,
            checked : false
          };
          this.finalSecondaryArray.push(temp);
        }
      }
      this.primaryColDetailsMap.set(i.primaryColumnName, [{
        'primaryColumnName': i.primaryColumnName,
        'primaryColumnId': i.primaryColumnId,
        'dataType': i.dataType
      }]);
      this.primaryColMap.set(i.primaryColumnName, this.finalSecondaryArray);
    }
  }

  getSecondaryColumns() {
    for (const i of this.resultant) {
      for (const j of i.secondaryTableList) {
        this.secTableNameMap.set(j.tableName, []);
      }
    }
    for (const i of this.resultant) {
      const primaryColumn = i.primaryColumnName;
      for (const j of i.secondaryTableList) {
        const tablename = j.tableName;
        const existingPrimCol = this.secTableNameMap.get(tablename);
        for (const k of j.secondaryColumnList) {
          const temp = {
            primaryColumn: primaryColumn,
            secondaryColumnId: k.secondaryColumnId,
            secondaryColumnName: k.secondaryColumnName,
            dataType: k.dataType,
            matchPercentage: k.matchPercentage,
            checked : false
          };
          existingPrimCol.push(temp);
        }
        this.secTableIdMap.set(tablename, j.tableId);
        this.secTableNameMap.set(tablename, existingPrimCol);
      }
    }
  }

  activateSecondaryFn() {
    this.activateSecondary = true;
    this.activatePrimary = false;
  }

  activatePrimaryFn() {
    this.activateSecondary = false;
    this.activatePrimary = true;
  }

  populatePrimaryValues(x, i) {
    this.selectedRow = i;
    this.populatePrimaryValuesArray = this.primaryColMap.get(x.key);
    this.dataSource1.data = this.populatePrimaryValuesArray;
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
    this.columnlength1 = this.populatePrimaryValuesArray.length;
    this.selectedPrimaryColumn = x.key;
  }

  populateSecondaryValues(x, i) {
    this.selectedRow = i;
    this.populateSecondaryValuesArray = this.secTableNameMap.get(x.key);
    this.dataSource.data = this.populateSecondaryValuesArray;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.columnlength = this.populatePrimaryValuesArray.length;
    this.selectedSecondaryTable = x.key;
  }

  checkedPriValues(x, _event, index) {
    console.log(x, event, index);
    const isChecked = _event.target.checked;
    let joinListInfoArray;
    if (isChecked) {
      x.checked = true;
      this.pricheckvalueMap.set(index, x.secondaryColumnName);
      const secColumn = {
        'columnId': x.secondaryColumnId,
        'columnName': x.secondaryColumnName,
        'dataType': x.dataType
      };
      if (this.resultantMap.has(x.tableName)) {
        joinListInfoArray = this.resultantMap.get(x.tableName);
      } else {
        this.resultantMap.set(x.tableName, []);
        joinListInfoArray = this.resultantMap.get(x.tableName);
      }
      const primaryColDetail = this.primaryColDetailsMap.get(this.selectedPrimaryColumn);
      let primaryColumn;
      for (const i of primaryColDetail) {
        primaryColumn = {
          'columnId': i.primaryColumnId,
          'columnName': i.primaryColumnName,
          'dataType': i.dataType
        };
      }
      const Obj = {
        'indexData': index,
        'primaryColumn': primaryColumn,
        'secondaryColumn': secColumn
      };
      joinListInfoArray.push(Obj);
    } else {
      this.pricheckvalueMap.delete(index);
      x.checked = false;
      joinListInfoArray = this.resultantMap.get(x.tableName);
      for (const i of joinListInfoArray) {
        if (i.indexData === index) {
          const indexx = joinListInfoArray.indexOf(i);
          joinListInfoArray.splice(indexx, 1);
        }
      }
    }
  }

  checkedSecValues(x, _event, index) {
    console.log(x, event, index);
    const isChecked = _event.target.checked;
    let joinListInfoArray;
    if (isChecked) {
      x.checked = true;
      this.seccheckvalueMap.set(index, x.secondaryColumnName);
      const secColumn = {
        'columnId': x.secondaryColumnId,
        'columnName': x.secondaryColumnName,
        'dataType': x.dataType
      };
      if (this.resultantMap.has(this.selectedSecondaryTable)) {
        joinListInfoArray = this.resultantMap.get(this.selectedSecondaryTable);
      } else {
        this.resultantMap.set(this.selectedSecondaryTable, []);
        joinListInfoArray = this.resultantMap.get(this.selectedSecondaryTable);
      }
      const primaryColDetail = this.primaryColDetailsMap.get(x.primaryColumn);
      let primaryColumn;
      for (const i of primaryColDetail) {
        primaryColumn = {
          'columnId': i.primaryColumnId,
          'columnName': i.primaryColumnName,
          'dataType': i.dataType
        };
      }
      const Obj = {
        'indexData': index,
        'primaryColumn': primaryColumn,
        'secondaryColumn': secColumn
      };
      joinListInfoArray.push(Obj);
    } else {
      x.checked = false;
      this.seccheckvalueMap.delete(index);
      joinListInfoArray = this.resultantMap.get(this.selectedSecondaryTable);
      for (const i of joinListInfoArray) {
        if (i.indexData === index) {
          const indexx = joinListInfoArray.indexOf(i);
          joinListInfoArray.splice(indexx, 1);
        }
      }
    }
  }

  addJoins() {
    this.updateNotif = false;
    this.updateSuccess = false;
    const finalSecondaryTableListArray = [];
    console.log(this.resultantMap, this.secTableIdMap);
    this.resultantMap.forEach((value, key) => {
      let tempArray = [];
      const secTableId = this.secTableIdMap.get(key);
      const secTableName = key;
      tempArray = JSON.parse(JSON.stringify(value));
      for (const i of tempArray) {
        delete i.indexData;
      }
      const Obj1 = {
        'tableId': this.secodaryTableId,
        'tableName': this.secondaryTableName,
        'joinListInfo': tempArray
      };
      finalSecondaryTableListArray.push(Obj1);
    });
    const param = {
      workspaceId: this.workspaceId,
      primaryTable: {
        tableId: this.primaryTableId,
        tableName: this.primaryTableName
      },
      secondaryTableList: finalSecondaryTableListArray
    };
    if (finalSecondaryTableListArray.length > 0) {
      this.addDirectJoinService.addDaNewJoin(param).subscribe(res => {
        if (res) {
          document.getElementById('datasuccessmsg').click();
          this.updateSuccess = true;
          this.resultantMap.clear();
          // setTimeout(() =>
          //   this.closeScreen(), 1000);
          // setTimeout(() => this.tablelistService.changeBooleanValue(true), 1005);
        }
      }, (err: HttpErrorResponse) => {
        this.errorMsg = err.error.message;
        this.updateNotif = true;
        document.getElementById('dataerrormsg').click();
      });
    } else {
      this.errorMsg = 'Please select columns to add joins';
      this.updateNotif = true;
    }
  }

  closeErrorMsg() {
    this.errorMsg = '';
    this.updateNotif = false;
    this.updateSuccess = false;
  }

  closeScreen() {
    this.addDirectJoinService.clearSession(this.jobId).subscribe();
    this.router.navigate(['/workspace/metalyzer/ALL/analysis']);
    this.tablelistService.dataAnalyzerReset = true;
    this.tablelistService.changeBooleanValue(true);
  }

  selectAll(_event) {
    $('input:checkbox:enabled.m-r').click();
  }

  selectRow() {
    if ((<HTMLElement>document.querySelectorAll('.sec-table div')[0]) !== undefined) {
      setTimeout(() => {
        (<HTMLElement>document.querySelectorAll('.sec-table div')[0]).click();
      }, 1);
    }
  }

  toggle() {
    this.toggleBoolean = !this.toggleBoolean;
  }
}
