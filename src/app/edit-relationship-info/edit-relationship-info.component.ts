import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { JoinValues, SecondaryColumn, JoinValueColumn} from './edit-relationship-info-object';

@Component({
  selector: 'app-edit-relationship-info',
  templateUrl: './edit-relationship-info.component.html',
  styleUrls: ['./edit-relationship-info.component.css']
})
export class EditRelationshipInfoComponent implements OnInit, OnChanges {
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
  resultantValues: any[] = [];
  joinName: any;
  removeIndexValue: any[];
  updateNotif: boolean;


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

  selectedValues(primaryValues, index , secondaryColumn) {
    let example: any;
    let insert = 0;
    for (const i of this.secondaryColumns) {
      if (i.columnName === secondaryColumn) {
        example = i;
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
      secondaryColumn: {
        columnId: example.columnId,
        columnName: example.columnName,
        dataType: example.columnDataType
      }
     };
    for (const i of this.resultantValues) {
      if (i.indexData === index) {
        if (secondaryColumn === 'Select') {
          const indexx = this.resultantValues.indexOf(i);
          this.resultantValues.splice(indexx, 1);
          insert = 1;
        } else {
          const indexx = this.resultantValues.indexOf(i);
          this.resultantValues.splice(indexx, 1);
        }
      }
    }
    if ( insert === 0) {
      this.resultantValues.push(test);
    }
  }

  updateRelation() {
    for (const i of this.joinDetails) {
      for (const j of this.resultantValues) {
      if (i.relationshipId === j.relationshipId || j.relationshipId === '') {
      } else {
      this.resultantValues.push(i);
      }
      }
    }
    this.removeIndexValue = this.resultantValues;
    for (const i of this.removeIndexValue) {
      delete i.indexData;
    }
    console.log(this.removeIndexValue);
    this.editRelationshipInfo.updateRealation(this.primaryTableId, this.workspaceID, this.joinName, this.removeIndexValue)
    .subscribe(res => {
      this.resultantValues = [];
      this.removeIndexValue = [];
      if (res && res.success) {
        this.updateEvent.emit(true);
        const close: HTMLButtonElement = document.querySelector('.modal-header .close');
        close.click();
      } else {
        this.updateNotif = true;
        }
    });
   }
   closeErrorMsg() {
    this.updateNotif = false;
  }

   resetSelection() {
     this.populateValues();
     this.resultantValues = [];
     this.removeIndexValue = [];
}

}
