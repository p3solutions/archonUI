import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { JoinValues, SecondaryColumn, JoinValueColumn } from './edit-relationship-info-object';
import { SecondaryColumnPipe } from '../secondary-column.pipe';
import { ContentObserver } from '@angular/cdk/observers';
import { MatTableDataSource } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

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
  defaultRelations = new Map();
  updateenable = false;
  onloadupdate = true;

  displayedColumns: string[] = ['columnName', 'columnDataType', 'secondaryColumn'];
  defaultIndex = new Map();

  constructor(private editRelationshipInfo: EditRelationshipInfoService,
    private spinner: NgxSpinnerService ) { }

  ngOnInit() {

  }

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
    const value: SimpleChange = change.relation;
    this.userValues = value.currentValue;
    this.populateValues();
  }

  populateValues() {
    this.spinner.show();
    try {
      this.primaryTable = JSON.parse(JSON.stringify(this.userValues.primaryTable.tableName));
      this.secondaryTable = JSON.parse(JSON.stringify(this.userValues.secondaryTable.tableName));
      this.primaryTableId = JSON.parse(JSON.stringify(this.userValues.primaryTable.tableId));
      this.secondaryTabelId = JSON.parse(JSON.stringify(this.userValues.secondaryTable.tableId));
      this.joinName = JSON.parse(JSON.stringify(this.userValues.joinName));
      this.joinDetails = JSON.parse(JSON.stringify(this.userValues.joinListInfo));
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
        for (let index = 0; index < this.joinDetailsArray.length; index++) {
          if (this.joinDetailsArray[index].relationshipId !== '') {
            this.resultantValues.push(JSON.parse(JSON.stringify(this.joinDetailsArray[index])));
          }
        }
         this.spinner.hide();
      });
    } catch {
      this.spinner.hide();
    }
  }

  selectedValues(primaryValues, index, secondaryColumn) {
    this.onloadupdate = false;
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
    this.updateenable = this.checkDuplicateInObject(this.resultantValues);
  }

  checkDuplicateInObject(values) {
    const valueArr = values.map(function(item) {
      console.log(item);
      let hasIsSelected =  false;
      if ('isSelected' in item) {
      hasIsSelected = true;
      }
      if (hasIsSelected === false) {
        return item.secondaryColumn.columnName;
      } else if (hasIsSelected === true) {
        if (item.isSelected === true) {
          return item.secondaryColumn.columnName;
        }
      }
     });
    console.log(valueArr);
    const resArr = valueArr.filter(arrayItem => arrayItem !== undefined);
    console.log(resArr);
    const isDuplicate = resArr.some(function(item, idx) {
    return resArr.indexOf(item) !== idx ;
    });
    return isDuplicate;
  }


  updateRelation() {
    this.removeIndexValue = JSON.parse(JSON.stringify(this.resultantValues));
    for (const i of this.removeIndexValue) {
      if (i.defaultSecondaryColumn) {
        delete i.defaultSecondaryColumn;
      }
      delete i.indexData;
    }
    console.log(this.removeIndexValue);
    this.removeIndexValue = this.removeIndexValue.filter(a => a.isSelected === false || a.isSelected === true);
    console.log(this.removeIndexValue);
    this.editRelationshipInfo.updateRealation(this.primaryTableId, this.workspaceID, this.joinName, this.removeIndexValue)
      .subscribe(res => {
        console.log(res);
        if (res && res.success) {
          const close: HTMLButtonElement = document.querySelector('#openEditRelationshipModal .cancel');
          close.click();
          // document.getElementById('editssmsg').click();
          this.removeIndexValue = [];
          this.resultantValues = [];
          this.updateEvent.emit(true);
          // this.errorMsg = res.data;
          // this.updateNotifSuccess = true;
          // setTimeout(() => {
          // const close: HTMLButtonElement = document.querySelector('#openEditRelationshipModal .cancel');
          // close.click();
          // }, 1500);
        } else {
          // console.log(res);
          // document.getElementById('editermsg').click();
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
    this.defaultRelations.clear();
    this.defaultIndex.clear();
    this.populateValues();
    this.resultantValues = [];
    this.removeIndexValue = [];
    this.updateenable = false;
    this.onloadupdate = true;
  }

  autocolumnMatchMode() {
    for (const i of this.joinDetailsArray) {
      console.log(i);
      for (const j of this.secondaryColumns) {
        console.log(j);
      if (i.primaryColumn.columnName === j.columnName && i.primaryColumn.columnDataType === j.columnDataType) {
        i.secondaryColumn.columnName = j.columnName;
        i.automatchColumn = true;
      }
      }
      if (!i.automatchColumn) {
       i.secondaryColumn.columnName = 'select';
      }
     }
     this.autoColumnMatch = true;
     this.autoColumnMatchMessage = 'Automatch Success';
  }

  closeAutoMatchMessage() {
    this.autoColumnMatch = false;
  }
}
