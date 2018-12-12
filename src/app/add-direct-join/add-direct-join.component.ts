import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { takeLast } from 'rxjs/operators';
import { AddDirectJoinService } from './add-direct-join.service';


@Component({
  selector: 'app-add-direct-join',
  templateUrl: './add-direct-join.component.html',
  styleUrls: ['./add-direct-join.component.css']
})
export class AddDirectJoinComponent implements OnInit, OnChanges {
  @Input() directJoin: any;
  @Input() tableList: any[];
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

  constructor(private addDirectJoinService: AddDirectJoinService) { }

  ngOnInit() {}

  ngOnChanges (change: SimpleChanges) {
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

  secTable(table) {
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
    } else if (secondaryTableName  === 'Select') {
     secObject.columnName = 'Select';
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
    if (temp.secondaryColumn.columnName === 'Select') {
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
this.resultArray = this.joinListTemp;
for (const i of this.resultArray) {
  delete i.indexData;
}
const param = {
  workspaceId: this.workspaceID,
  primaryTable: {
    tableId: this.primaryTableId,
    tableName: this.primaryTableName
  },
  secondaryTable: {
    tableId: this.secondaryTableId,
    tableName: this.secondaryTableName
  },
  joinListInfo: this.resultArray
};

this.addDirectJoinService.addNewJoin(param).subscribe(res => {
  if (res && res.success) {
    this.updateEvent.emit(true);
    this.updateSuccess = true;
    this.joinListTemp = [];
  } else {
    this.errorMsg = res.errors;
    this.updateNotif = true;
    this.resultArray = [];
  }
});

}

closeErrorMsg() {
  this.errorMsg = '';
  this.updateNotif = false;
  this.updateSuccess = false;
}

}

