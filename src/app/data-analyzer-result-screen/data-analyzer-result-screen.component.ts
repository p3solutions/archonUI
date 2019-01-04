import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges, ViewChild } from '@angular/core';
import { TableListService } from '../table-list/table-list.service';
import { AddDirectJoinService } from '../add-direct-join/add-direct-join.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-data-analyzer-result-screen',
  templateUrl: './data-analyzer-result-screen.component.html',
  styleUrls: ['./data-analyzer-result-screen.component.css']
})
export class DataAnalyzerResultScreenComponent implements OnInit {

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
  //  res = [
  //   {
  //     'primaryColumnName': 'IS_PROV',
  //     'primaryColumnId': '5c2995f9242f9a076a84f234',
  //     'dataType': 'BIT',
  //     'secondaryTableList': [
  //       {
  //         'tableName': 'dx_code',
  //         'tableId': '5c2995f9242f9a076a84f23e',
  //         'secondaryColumnList': [
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f240',
  //             'secondaryColumnName': 'DX_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f241',
  //             'secondaryColumnName': 'DX_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f245',
  //             'secondaryColumnName': 'PROC_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f246',
  //             'secondaryColumnName': 'PROC_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           }
  //         ]
  //       },
  //       {
  //         'tableName': 'proc_code',
  //         'tableId': '5c2995f9242f9a076a84f243',
  //         'secondaryColumnList': [
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f240',
  //             'secondaryColumnName': 'DX_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f241',
  //             'secondaryColumnName': 'DX_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f245',
  //             'secondaryColumnName': 'PROC_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f246',
  //             'secondaryColumnName': 'PROC_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           }
  //         ]
  //       },
  //       {
  //         'tableName': 'dx_code',
  //         'tableId': '5c2995f9242f9a076a84f23e',
  //         'secondaryColumnList': [
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f240',
  //             'secondaryColumnName': 'DX_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f241',
  //             'secondaryColumnName': 'DX_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f245',
  //             'secondaryColumnName': 'PROC_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f246',
  //             'secondaryColumnName': 'PROC_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           }
  //         ]
  //       },
  //       {
  //         'tableName': 'proc_code',
  //         'tableId': '5c2995f9242f9a076a84f243',
  //         'secondaryColumnList': [
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f240',
  //             'secondaryColumnName': 'DX_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f241',
  //             'secondaryColumnName': 'DX_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f245',
  //             'secondaryColumnName': 'PROC_CODE',
  //             'dataType': 'INT',
  //             'matchPercentage': '0'
  //           },
  //           {
  //             'secondaryColumnId': '5c2995f9242f9a076a84f246',
  //             'secondaryColumnName': 'PROC_DESC',
  //             'dataType': 'VARCHAR',
  //             'matchPercentage': '0'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];
    primaryTableId: any;
    primaryTableName: any;
    workspaceId: any;
    selectedPrimaryColumn: any;
    secondaryTableListArray: any;
    dtOptions: DataTables.Settings = {};
    selectedSecondaryTable: any;
  updateSuccess = false;
  errorMsg: any;
  updateNotif = false;




  constructor(private tablelistService: TableListService,
    private addDirectJoinService: AddDirectJoinService,
    private router: Router) { }


  ngOnInit() {
     this.tablelistService.currentResultArray.subscribe(res => {
         this.workspaceId = res[0].workspaceId,
         this.resultant = res[0].relationDetails;
         this.primaryTableId = res[0].primaryTableId;
         this.primaryTableName = res[0].primaryTableName;
     });
    // this.dtOptions = {
    //     stateSave: false,
    //     paging: true,
    //     pageLength: 10,
    //     pagingType: 'full_numbers',
    //     ordering: false,
    //     searching: false,
    //     destroy: true
    // };
     this.getPrimaryColumns();
     this.getSecondaryColumns();
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
                  matchPercentage: z.matchPercentage
              };
              this.finalSecondaryArray.push(temp);
          }
      }
      this.primaryColDetailsMap.set(i.primaryColumnName, [{'primaryColumnName': i.primaryColumnName,
      'primaryColumnId': i.primaryColumnId,
      'dataType': i.dataType}]);
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
               matchPercentage: k.matchPercentage
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

  populatePrimaryValues(x) {
  this.populatePrimaryValuesArray = this.primaryColMap.get(x.key);
  this.selectedPrimaryColumn = x.key;
  }

  populateSecondaryValues(x) {
  this.populateSecondaryValuesArray = this.secTableNameMap.get(x.key);
  this.selectedSecondaryTable = x.key;
  }

  checkedPriValues(x, _event, index) {
  const isChecked = _event.target.checked;
  let joinListInfoArray;
  if (isChecked) {
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
  const isChecked = _event.target.checked;
  let joinListInfoArray;
  if (isChecked) {
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
  const finalSecondaryTableListArray = [];
  this.resultantMap.forEach((value, key) =>  {
  let tempArray = [];
  const secTableId = this.secTableIdMap.get(key);
  const secTableName = key;
  tempArray = JSON.parse(JSON.stringify(value));
  for (const i of tempArray) {
  delete i.indexData;
  }
  const Obj1 = {
    'tableId' : secTableId,
    'tableName' : secTableName,
    'joinListInfo' : tempArray
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
  console.log(param);
  if (this.finalSecondaryArray.length > 0) {
  this.addDirectJoinService.addNewJoin(param).subscribe(res => {
    if (res && res.data.errorDetails.length === 0) {
      this.updateSuccess = true;
      this.resultantMap.clear();
      setTimeout(() =>
        this.closeScreen(), 1000);
    } else {
      this.errorMsg = res.data.errorDetails[0].errors[0].errorMessage;
      this.updateNotif = true;
    }
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
  this.router.navigate(['workspace/metalyzer/ALL/analysis']);
  }

}
