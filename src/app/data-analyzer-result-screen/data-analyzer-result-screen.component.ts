import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { map } from 'rxjs/operator/map';
import { TableListService } from '../table-list/table-list.service';

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
   res = [
    {
      'primaryColumnName': 'IS_PROV',
      'primaryColumnId': '5c2995f9242f9a076a84f234',
      'dataType': 'BIT',
      'secondaryTableList': [
        {
          'tableName': 'dx_code',
          'tableId': '5c2995f9242f9a076a84f23e',
          'secondaryColumnList': [
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f240',
              'secondaryColumnName': 'DX_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f241',
              'secondaryColumnName': 'DX_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f245',
              'secondaryColumnName': 'PROC_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f246',
              'secondaryColumnName': 'PROC_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            }
          ]
        },
        {
          'tableName': 'proc_code',
          'tableId': '5c2995f9242f9a076a84f243',
          'secondaryColumnList': [
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f240',
              'secondaryColumnName': 'DX_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f241',
              'secondaryColumnName': 'DX_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f245',
              'secondaryColumnName': 'PROC_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f246',
              'secondaryColumnName': 'PROC_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            }
          ]
        },
        {
          'tableName': 'dx_code',
          'tableId': '5c2995f9242f9a076a84f23e',
          'secondaryColumnList': [
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f240',
              'secondaryColumnName': 'DX_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f241',
              'secondaryColumnName': 'DX_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f245',
              'secondaryColumnName': 'PROC_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f246',
              'secondaryColumnName': 'PROC_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            }
          ]
        },
        {
          'tableName': 'proc_code',
          'tableId': '5c2995f9242f9a076a84f243',
          'secondaryColumnList': [
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f240',
              'secondaryColumnName': 'DX_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f241',
              'secondaryColumnName': 'DX_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f245',
              'secondaryColumnName': 'PROC_CODE',
              'dataType': 'INT',
              'matchPercentage': '0'
            },
            {
              'secondaryColumnId': '5c2995f9242f9a076a84f246',
              'secondaryColumnName': 'PROC_DESC',
              'dataType': 'VARCHAR',
              'matchPercentage': '0'
            }
          ]
        }
      ]
    }
  ];
    primaryTableId: any;
    primaryTableName: any;
    workspaceId: any;
    joinListInfoArray: any;
    selectedPrimaryColumn: any;
    secondaryTableListArray: any;





  constructor(private tablelistService: TableListService) { }


  ngOnInit() {
    //  this.tablelistService.currentResultArray.subscribe(res => {
    //      this.workspaceId = res[0].workspaceId,
    //      this.resultant = res[0].relationDetails;
    //      this.primaryTableId = res[0].primaryTableId;
    //      this.primaryTableName = res[0].primaryTableName;
    //  });
     this.getPrimaryColumns();
     this.getSecondaryColumns();
  }

  getPrimaryColumns() {
   for (const i of this.res) {
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
   for (const i of this.res) {
      for (const j of i.secondaryTableList) {
          this.secTableNameMap.set(j.tableName, []);
      }
  }
  for (const i of this.res) {
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
  console.log('primaryColMap', this.primaryColMap);
  console.log('primaryColDetailsMap', this.primaryColDetailsMap);
  }

  populateSecondaryValues(x) {
  this.populateSecondaryValuesArray = this.secTableNameMap.get(x.key);
  console.log('secColMap', this.secTableNameMap);
  console.log('secTableIdMap', this.secTableIdMap);
  }

  checkedPriValues(x, _event, index) {
  const isChecked = _event.target.checked;
  if (isChecked) {
  const secTableId = this.secTableIdMap.get(x.tableName);
  const secTableName = x.tableName;
  const secColumn = {
    'columnId': x.secondaryColumnId,
    'columnName': x.secondaryColumnName,
    'dataType': x.dataType
  };
  if (this.resultantMap.has(x.tableName)) {
   this.joinListInfoArray = this.resultantMap.get(x.tableName);
  } else {
    this.resultantMap.set(x.tableName, []);
    this.joinListInfoArray = this.resultantMap.get(x.tableName);
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
  this.joinListInfoArray.push(Obj);
} else {
  this.joinListInfoArray = this.resultantMap.get(x.tableName);
  for (const i of this.joinListInfoArray) {
  if (i.indexData === index) {
    const indexx = this.joinListInfoArray.indexOf(i);
    this.joinListInfoArray.splice(indexx, 1);
  }
  }
}
  this.resultantMap.set(x.tableName, this.joinListInfoArray);
  console.log(this.resultantMap);
  console.log(x, _event, index, this.joinListInfoArray);
  }

  checkedSecValues(x, _event, index) {

  }

}
