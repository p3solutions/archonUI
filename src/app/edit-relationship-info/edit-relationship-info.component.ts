import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { JoinValues, SecondaryColumn, JoinValueColumn } from './edit-relationship-info-object';
import { SecondaryColumnPipe } from '../secondary-column.pipe';

@Component({
  selector: 'app-edit-relationship-info',
  templateUrl: './edit-relationship-info.component.html',
  styleUrls: ['./edit-relationship-info.component.css']
})
export class EditRelationshipInfoComponent implements OnInit, OnChanges {
  newWSinfo: any;
  @Input() relation: any;
  @Input() workspaceID: any;
  @Output() updateEvent = new EventEmitter<boolean>();
  primaryTable: string;
  secondaryTable: string;
  userValues: any;
  joinDetails: any[];
  primaryColumns = [];
  secondaryColumns = [];
  primaryTableId: any;
  secondaryTabelId: any;
  joinDetailsArray: JoinValues[];
  resultantValues = [];
  joinName: any;
  removeIndexValue = [];
  updateNotif: boolean;
  errorMsg: any;
  updateNotifSuccess: boolean;
  selected = [];
  autoColumnMatch = false;
  autoColumnMatchMessage = '';

  displayedColumns: string[] = ['columnName', 'columnDataType', 'secondaryColumn'];

  constructor(private editRelationshipInfo: EditRelationshipInfoService) { }

  ngOnInit() {

  }

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
    const value: SimpleChange = change.relation;
    this.userValues = value.currentValue;
    this.populateValues();
  }

  populateValues() {
    this.primaryTable = this.userValues.primaryTable.tableName;
    this.secondaryTable = this.userValues.secondaryTable.tableName;
    this.primaryTableId = this.userValues.primaryTable.tableId;
    this.secondaryTabelId = this.userValues.secondaryTable.tableId;
    this.joinName = this.userValues.joinName;
    this.joinDetails = this.userValues.joinListInfo;
    this.editRelationshipInfo.getColumnsByTableId(this.secondaryTabelId).subscribe(x => {
      this.secondaryColumns = x;
    });
    this.editRelationshipInfo.getColumnsByTableId(this.primaryTableId).subscribe(x => {
      this.primaryColumns = x;
      this.joinDetailsArray = [];
      for (const i of this.primaryColumns) {
        const joinValue = new JoinValues();
        joinValue.primaryColumn = i;
        for (const detail of this.joinDetails) {
          if (detail.primaryColumn.columnId === i.columnId) {
            joinValue.relationshipId = detail.relationshipId;
            joinValue.secondaryColumn = detail.secondaryColumn;
            console.log(joinValue.secondaryColumn);
            joinValue.defaultSecondaryColumn = true;
            console.log(1);
            break;
          } else {
            joinValue.relationshipId = '';
            joinValue.secondaryColumn = new SecondaryColumn();
            joinValue.secondaryColumn.columnId = '';
            joinValue.secondaryColumn.columnName = '';
            joinValue.secondaryColumn.dataType = '';
          }
        }
        this.joinDetailsArray.push(joinValue);
        // console.log(this.joinDetailsArray);
      }
    });
  }

  selectedValues(primaryValues, index, secondaryColumn) {
    console.log(primaryValues, index, secondaryColumn);
    const example = {
      columnId: '',
      columnName: '',
      dataType: ''
    };
    let insert: number;
    for (const i of this.secondaryColumns) {
      if (i.columnName === secondaryColumn) {
        example.columnId = i.columnId;
        example.columnName = i.columnName;
        example.dataType = i.columnDataType;
      }
    }
    const test = {
      indexData: index,
      isSelected: true,
      relationshipId: primaryValues.relationshipId,
      primaryColumn: {
        columnId: primaryValues.primaryColumn.columnId,
        columnName: primaryValues.primaryColumn.columnName,
        dataType: primaryValues.primaryColumn.columnDataType,
        isKey: primaryValues.primaryColumn.isKey
      },
      secondaryColumn: example
    };
    for (const i of this.resultantValues) {
      if (i.indexData === index) {
        if (secondaryColumn === 'select') {
          insert = 1;
          console.log(i);
          i.isSelected = false;
        } else {
          insert = 0;
          const indexx = this.resultantValues.indexOf(i);
          this.resultantValues.splice(indexx, 1);
        }
      }
    }
    if (insert === 0) {
      this.resultantValues.push(test);
    } else if (insert === 1) {
    } else {
      this.resultantValues.push(test);
    }
    console.log(this.resultantValues);
  }


  updateRelation() {
    this.removeIndexValue = JSON.parse(JSON.stringify(this.resultantValues));
    for (const i of this.removeIndexValue) {
      delete i.indexData;
    }
    this.editRelationshipInfo.updateRealation(this.primaryTableId, this.workspaceID, this.joinName, this.removeIndexValue)
      .subscribe(res => {
        if (res && res.success) {
          this.removeIndexValue = [];
          this.resultantValues = [];
          this.updateEvent.emit(true);
          this.errorMsg = res.data;
          this.updateNotifSuccess = true;
        } else {
          this.errorMsg = res.errors;
          this.updateNotif = true;
        }
      });
  }
  closeErrorMsg() {
    this.errorMsg = '';
    this.updateNotif = false;
    this.updateNotifSuccess = false;
  }

  resetSelection() {
    this.populateValues();
    this.resultantValues = [];
    this.removeIndexValue = [];
  }

  autocolumnMatchMode() {
    const secondaryColumnNameList = this.secondaryColumns.map(function (item) { return item['columnName']; });
    let tempIndexOfColumnList = 0;
    for (const primaryColumn of this.primaryColumns) {
      if (secondaryColumnNameList.includes(primaryColumn.columnName)) {
        const index = this.joinDetailsArray.findIndex(k => k.secondaryColumn.columnName === primaryColumn.columnName);
        const primaryValues = this.joinDetailsArray.find(s => s.secondaryColumn.columnName === primaryColumn.columnName);
        const dataType = primaryValues.primaryColumn.columnDataType;
        const tableHTML = document.getElementById('edit-relationship-table');
        const tableBodyHTML = tableHTML.getElementsByTagName('tbody');
        const tableRow = tableBodyHTML[0].children[index];
        const filterSecondaryTable = new SecondaryColumnPipe().transform(this.secondaryColumns, dataType);
        for (let i = 0; i < filterSecondaryTable.length; i++) {
          tempIndexOfColumnList = i;
          if (filterSecondaryTable[i] === primaryColumn.columnName) {
            break;
          }
        }
         if (!primaryValues.defaultSecondaryColumn) {
          tableRow.children[3].querySelector('select').selectedIndex = tempIndexOfColumnList + 1;
          this.selectedValues(primaryValues, index, primaryColumn.columnName);
         }
      }
    }
    this.autoColumnMatch = true;
    this.autoColumnMatchMessage = 'Automatch column applied successfully';
  }

  closeAutoMatchMessage() {
    this.autoColumnMatch = false;
  }
}
