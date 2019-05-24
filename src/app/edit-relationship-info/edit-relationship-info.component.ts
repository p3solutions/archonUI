import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { JoinValues, SecondaryColumn, JoinValueColumn } from './edit-relationship-info-object';
import { SecondaryColumnPipe } from '../secondary-column.pipe';
import { ContentObserver } from '@angular/cdk/observers';

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
            joinValue.defaultSecondaryColumn = detail.secondaryColumn;
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
      }
      for (const i of this.joinDetailsArray) {
        if (i.relationshipId !== '') {
          this.resultantValues.push(JSON.parse(JSON.stringify(i)));
        }
      }
    });
  }

  selectedValues(primaryValues, index, secondaryColumn) {
    const example = {
      columnId: '',
      columnName: '',
      dataType: ''
    };
    let insert: number;
    let arrayIndex;
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
    if (primaryValues.defaultSecondaryColumn === false) {
      for (const i of this.resultantValues) {
        if (i.indexData === index) {
          insert = 1;
          arrayIndex = this.resultantValues.indexOf(i);
          break;
        } else {
          insert = 0;
        }
      }
      if (insert === 1) {
        if (secondaryColumn !== 'select') {
          this.resultantValues[arrayIndex].secondaryColumn = example;
        } else {
          this.resultantValues.splice(arrayIndex, 1);
        }
      } else if (insert === 0) {
        this.resultantValues.push(test);
      }
    } else {
      for (const i of this.resultantValues) {
        if (i.primaryColumn.columnName === test.primaryColumn.columnName) {
          if (secondaryColumn === 'select') {
            i.isSelected = false;
          } else {
            i.isSelected = true;
          }
        }
        if (i.isSelected && i.defaultSecondaryColumn) {
          i.relationshipId = test.relationshipId;
          if (i.defaultSecondaryColumn.columnName === secondaryColumn) {
            i.secondaryColumn = i.defaultSecondaryColumn;
            delete i.isSelected;
          } else {
            i.secondaryColumn = test.secondaryColumn;
          }
        }
      }
    }
    console.log(this.resultantValues);
  }


  updateRelation() {
    this.removeIndexValue = this.resultantValues;
    for (const i of this.removeIndexValue) {
      if (i.defaultSecondaryColumn) {
        delete i.defaultSecondaryColumn;
      }
      delete i.indexData;
      // if (i.isSelected === true || i.isSelected === false) {
      // } else {
      // const ind = this.removeIndexValue.indexOf(i);
      // this.removeIndexValue.splice(ind, 1);
      // }
    }
    console.log(this.removeIndexValue);
    this.removeIndexValue = this.removeIndexValue.filter(a => a.isSelected === false || a.isSelected === true);
    console.log(this.removeIndexValue);
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
