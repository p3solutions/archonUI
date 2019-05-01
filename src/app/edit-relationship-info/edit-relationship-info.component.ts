import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { JoinValues, SecondaryColumn, JoinValueColumn } from './edit-relationship-info-object';

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


  constructor(private editRelationshipInfo: EditRelationshipInfoService) { }

  ngOnInit() {

  }

  ngOnChanges(change: SimpleChanges) {
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
            joinValue.defaultSecondaryColumn = true;
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
    });
  }

  selectedValues(primaryValues, index, secondaryColumn) {
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
      relationshipId: primaryValues.relationshipId,
      primaryColumn: {
        columnId: primaryValues.primaryColumn.columnId,
        columnName: primaryValues.primaryColumn.columnName,
        dataType: primaryValues.primaryColumn.columnDataType
      },
      secondaryColumn: example
    };
    for (const i of this.resultantValues) {
      if (i.indexData === index) {
        if (secondaryColumn === 'Select') {
          const indexx = this.resultantValues.indexOf(i);
          this.resultantValues.splice(indexx, 1);
          insert = 1;
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
  }


  updateRelation() {
    this.removeIndexValue = JSON.parse(JSON.stringify(this.resultantValues));
    for (const i of this.removeIndexValue) {
      delete i.indexData;
    }
    this.editRelationshipInfo.updateRealation(this.primaryTableId, this.workspaceID, this.joinName, this.removeIndexValue)
      .subscribe(res => {
        console.log(res);
        if (res && res.success) {
          this.removeIndexValue = [];
          this.resultantValues = [];
          this.updateEvent.emit(true);
          this.errorMsg = res.data;
          this.updateNotif = true;
        } else {
          this.errorMsg = res.errors;
          this.updateNotifSuccess = true;
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

}
