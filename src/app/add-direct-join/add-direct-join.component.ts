import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { AddDirectJoinService } from './add-direct-join.service';
import { TableListService } from '../table-list/table-list.service';


@Component({
  selector: 'app-add-direct-join',
  templateUrl: './add-direct-join.component.html',
  styleUrls: ['./add-direct-join.component.css']
})
export class AddDirectJoinComponent implements OnInit, OnChanges {
  @Input() directJoin: any;
  tableList: string[];
  @Input() workspaceID: any;
  @Output() updateEvent = new EventEmitter<boolean>();
  primaryTableName: any;
  primaryTableId: any;
  primaryColumns: any[];
  secondaryColumns: any[];
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

  constructor(private addDirectJoinService: AddDirectJoinService, private tablelistService: TableListService) { }

  ngOnInit() {
    this.getTableList();
  }

  ngOnChanges(change: SimpleChanges) {
    this.enableRelation = false;
    this.populateValues();
  }

  populateValues() {
    this.primaryTableName = this.directJoin.tableName;
    this.primaryTableId = this.directJoin.tableId;
    this.workspaceID = this.workspaceID;
    this.addDirectJoinService.getColumnsByTableId(this.primaryTableId).subscribe(res => {
      this.primaryColumns = res;
    }
    );
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
    this.joinListTemp = [];
    this.toggleTblSelection(_event);
    this.enableRelation = true;
    this.secondaryTableName = table.tableName;
    this.secondaryTableId = table.tableId;
    this.addDirectJoinService.getColumnsByTableId(this.secondaryTableId).subscribe(res => {
      this.secondaryColumns = res;
    }
    );
  }

  selectedValues(primaryTable, index, secondaryTableName) {
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
        if (secondaryTableName === 'Select') {
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
      this.joinListTemp.push(temp);
    }
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
      this.addDirectJoinService.addNewJoin(param).subscribe(res => {
        if (res && res.data.errorDetails.length === 0) {
          this.updateEvent.emit(true);
          this.updateSuccess = true;
          this.joinListTemp = [];
          this.resultArray = [];
          this.resetselectedValues();
        } else {
          this.errorMsg = res.data.errorDetails[0].errors[0].errorMessage;
          this.updateNotif = true;
          this.resultArray = [];
        }
      });
    } else {
      this.errorMsg = 'Please select columns to add joins';
      this.updateNotif = true;
    }

  }
  resetselectedValues() {
    $('#testreset option').prop('selected', function () {
      return false;
    });
  }

  closeErrorMsg() {
    this.errorMsg = '';
    this.updateNotif = false;
    this.updateSuccess = false;
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

}

