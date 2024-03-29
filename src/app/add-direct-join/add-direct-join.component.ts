import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output, ViewChild } from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { AddDirectJoinService } from './add-direct-join.service';
import { TableListService } from '../table-list/table-list.service';
import { SecondaryColumnPipe } from '../secondary-column.pipe';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
// import { browserRefresh } from '../app.component';


@Component({
  selector: 'app-add-direct-join',
  templateUrl: './add-direct-join.component.html',
  styleUrls: ['./add-direct-join.component.css']
})
export class AddDirectJoinComponent implements OnInit, OnChanges {
  directJoin: any;
  tableList: string[];
  workspaceID: any;
  @Output() updateEvent = new EventEmitter<boolean>();
  primaryTableName: any;
  primaryTableId: any;
  primaryColumns: any[];
  secondaryColumns = [];
  secondaryTableName: any;
  secondaryTableId: any;
  enableRelation: boolean;
  joinListTemp = [];
  resultArray = [];
  updateNotif: boolean;
  errorMsg: any;
  updateSuccess: boolean;
  searchTableName;
  startIndex = 1;
  schemaResultsTableCount = 0;
  paginationRequired: boolean;
  page: number;
  selected = [];
  editColumnMode = false;
  autoColumnMatchMessage = '';
  dataSource = new MatTableDataSource<any>(this.primaryColumns);
  displayedColumns: string[] = ['columnName', 'columnDataType', 'secondaryColumns'];
  columnlength = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  enableAdd = false;
  joinbtn = true;
  editState = new Map();

  constructor(private addDirectJoinService: AddDirectJoinService,
    private spinner: NgxSpinnerService,
     private tablelistService: TableListService, private router: Router) { }

  ngOnInit() {
    // if (browserRefresh) {
    //   this.router.navigate(['/workspace/workspace-dashboard']);
    // }
    this.workspaceID = this.addDirectJoinService.workspaceID;
    this.directJoin = this.addDirectJoinService.directJoin;
    this.getTableList();
    this.enableRelation = false;
    this.populateValues();
  }

  ngOnChanges(change: SimpleChanges) {
    // this.enableRelation = false;
    // this.populateValues();
  }

  populateValues() {
    this.spinner.show();
    try {
      if (this.directJoin !== undefined) {
        this.primaryTableName = this.directJoin.tableName;
        this.primaryTableId = this.directJoin.tableId;
        this.workspaceID = this.workspaceID;
        this.addDirectJoinService.getColumnsByTableId(this.primaryTableId).subscribe(res => {
          this.primaryColumns = res;
          for (const i of this.primaryColumns) {
          i.secondaryColumn = '';
          i.autoMatch = false;
          }
          this.dataSource.data = this.primaryColumns;
          this.spinner.hide();
        }
        );
      }
    } catch {
      this.spinner.hide();
    }
  }

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
  secTable(_event, table) {
    this.spinner.show();
    try {
      this.joinListTemp = [];
      this.editColumnMode = false;
      for (const i of this.primaryColumns) {
      i.secondaryColumn = '';
      }
      this.toggleTblSelection(_event);
      this.enableRelation = true;
      this.secondaryTableName = table.tableName;
      this.secondaryTableId = table.tableId;
      this.addDirectJoinService.getColumnsByTableId(this.secondaryTableId).subscribe(res => {
        this.secondaryColumns = res;
        this.dataSource.data = this.primaryColumns;
        setTimeout(() => this.dataSource.paginator = this.paginator);
        this.dataSource.sort = this.sort;
        this.columnlength = this.primaryColumns.length;
        this.spinner.hide();
      }
      );
    } catch {
      this.spinner.hide();
    }
  }

  selectedValues(primaryTable, index, secondaryTableName) {
    this.closeAutoMatchMessage();
    const isWorthy = this.editState.get(primaryTable.columnId);
    if (isWorthy !== secondaryTableName) {
    this.editState.set(primaryTable.columnId, secondaryTableName);
    this.joinbtn = false;
    let secObject = {
      columnId: '',
      columnName: '',
      columnDataType: ''
    };
    let insert = 0;
    for (const i of this.secondaryColumns) {
      if (i.columnName === secondaryTableName) {
        secObject = i;
      }
    }
    const temp = {
      indexData: index,
      primaryColumn: {
        columnId: primaryTable.columnId,
        columnName: primaryTable.columnName,
        dataType: primaryTable.columnDataType
      },
      secondaryColumn: {
        columnId: secObject.columnId,
        columnName: secObject.columnName,
        dataType: secObject.columnDataType
      }
    };
    for (const i of this.joinListTemp) {
      if (i.indexData === index) {
        if (secondaryTableName === 'select') {
          const indexx = this.joinListTemp.indexOf(i);
          this.joinListTemp.splice(indexx, 1);
          insert = 1;
        } else {
          const indexx = this.joinListTemp.indexOf(i);
          this.joinListTemp.splice(indexx, 1);
        }
      }
    }
    if (insert === 0) {
      if (temp.secondaryColumn.columnName !== '') {
        this.joinListTemp.push(temp);
      }
    }
  this.enableAdd = this.checkDuplicateInObject(this.joinListTemp);
  if (this.enableAdd === true) {
    this.editColumnMode = false;
    this.joinbtn = true;
  }
    }
  }

  checkDuplicateInObject(values) {
    const valueArr = values.map(function(item) { return item.secondaryColumn.columnName; });
    const isDuplicate = valueArr.some(function(item, idx) {
    return valueArr.indexOf(item) !== idx ;
    });
    return isDuplicate;
  }

  addJoins() {
    this.updateNotif = false;
    this.updateSuccess = false;
    this.resultArray = JSON.parse(JSON.stringify(this.joinListTemp));
    for (const i of this.resultArray) {
      delete i.indexData;
    }
    const param = {
      workspaceId: this.workspaceID,
      primaryTable: {
        tableId: this.primaryTableId,
        tableName: this.primaryTableName
      },
      secondaryTableList: [{
        tableId: this.secondaryTableId,
        tableName: this.secondaryTableName,
        joinListInfo: this.resultArray
      }],
    };
    if (this.resultArray.length > 0) {
      this.addDirectJoinService.addNewJoin(param).subscribe((res) => {
        if (res) {
          document.getElementById('addssmsg').click();
          this.updateEvent.emit(true);
          this.updateSuccess = true;
          this.joinListTemp = [];
          this.resultArray = [];
          this.resetselectedValues();
        }
       }, (err: HttpErrorResponse) => {
          document.getElementById('addermsg').click();
          this.errorMsg = err.error.message;
          this.updateNotif = true;
          this.resultArray = [];
       });
    } else {
      document.getElementById('addermsg').click();
      this.errorMsg = 'Please select columns to add joins';
      this.updateNotif = true;
    }

  }
  resetselectedValues() {
    this.populateValues();
  }

  closeErrorMsg() {
    this.errorMsg = '';
    this.updateNotif = false;
    this.updateSuccess = false;
    this.editColumnMode = false;
  }

  searchTablelist() {
    this.tableList = [];
    this.tablelistService.getTablesearchList(this.workspaceID, this.searchTableName).subscribe((res: any) => {
      this.tableList = res.tableList;
    });
  }
  getTableList() {
    this.tablelistService.getTableList(this.workspaceID, this.startIndex).subscribe((res: any) => {
      this.tableList = res.tableList;
      if (res.paginationRequired) {
        this.schemaResultsTableCount = (this.startIndex + 1) * 50;
      }
    });
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


  autocolumnMatchMode() {
    this.errorMsg = '';
    this.updateNotif = false;
    this.updateSuccess = false;
    this.editState.clear();
    this.joinListTemp = [];
    this.resultArray = [];
    this.spinner.show();
    const length = this.primaryColumns.length;
    let ifAutomatch = false;
    for (let i = 0; i < this.primaryColumns.length; i++) {
     for (const j of this.secondaryColumns) {
     if (this.primaryColumns[i].columnName === j.columnName && this.primaryColumns[i].columnDataType === j.columnDataType) {
      this.primaryColumns[i].secondaryColumn = j.columnName;
      this.primaryColumns[i].autoMatch = true;
      this.selectedValues(this.primaryColumns[i], i , this.primaryColumns[i].secondaryColumn);
      ifAutomatch = true;
     }
     }
     if (!this.primaryColumns[i].autoMatch) {
      this.primaryColumns[i].secondaryColumn = '';
      this.selectedValues(this.primaryColumns[i], i , this.primaryColumns[i].secondaryColumn);
     }
     if (length - 1 === i) {
     this.spinner.hide();
     }
    }
    this.editColumnMode = true;
    if (ifAutomatch) {
      this.autoColumnMatchMessage = 'Automatch Completed';
    } else {
      this.autoColumnMatchMessage = 'No Matches Found';
      this.joinbtn = true;
    }
  }

  closeAutoMatchMessage() {
    this.editColumnMode = false;
  }

  closeScreen() {
    this.router.navigate(['/workspace/metalyzer/ALL/analysis']);
    this.addDirectJoinService.changeDJVBooleanValue(true);
    // this.tablelistService.changeBooleanValue(true);
  }

}

