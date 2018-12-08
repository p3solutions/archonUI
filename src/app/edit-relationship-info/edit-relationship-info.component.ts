import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { EditRelationshipInfoService } from './edit-relationship-info.service';
import { JoinValues, SecondaryColumn} from './edit-relationship-info-object';

@Component({
  selector: 'app-edit-relationship-info',
  templateUrl: './edit-relationship-info.component.html',
  styleUrls: ['./edit-relationship-info.component.css']
})
export class EditRelationshipInfoComponent implements OnInit, OnChanges {
  @Input() relation: any;
  @Input() workspaceID: any;
  primaryTable: string;
  secondaryTable: string;
  userValues: any;
  joinDetails: JoinValues[];
  primaryColumns = [];
  secondaryColumns = [];
  primaryTableId: any;
  secondaryTabelId: any;
  joinDetailsArray: JoinValues[];
  resultantValues: any[] = [];
  joinName: any;


  constructor(private editRelationshipInfo: EditRelationshipInfoService) { }

  ngOnInit() {

  }

  ngOnChanges(change: SimpleChanges) {
   const value: SimpleChange = change.relation;
   this.userValues = value.currentValue;
   this.populateValues(this.userValues);
  }

  populateValues(userValues) {
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
    let example: any = {};
    let insert: number;
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
    if ( insert === 0) {
      this.resultantValues.push(test);
    } else if (insert === 1) {
      console.log();
    } else {
      this.resultantValues.push(test);
    }
  }

  updateRelation() {
    for (const i of this.resultantValues) {
      delete i.indexData;
    }
    this.editRelationshipInfo.updateRealation(this.primaryTableId, this.workspaceID, this.joinName, this.resultantValues).subscribe(res => {
      if (res && res.success) {
      console.log('Updated Successfully');
      }
    });
  }
}
