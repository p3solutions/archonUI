import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-data-analyzer-result-screen',
  templateUrl: './data-analyzer-result-screen.component.html',
  styleUrls: ['./data-analyzer-result-screen.component.css']
})
export class DataAnalyzerResultScreenComponent implements OnInit {

   primaryColMap = new Map();
   SecondaryTableList = [];
   SecondaryColumnList = [];
   finalSecondaryArray = [];
   secTableNameMap = new Map();
   activateSecondary = true;
   activatePrimary = false;
   res = {
    'tableName': 'actor',
    'relationDetails' : [
     {
           'primaryColumn' : 'ADD_ID',
           'SecondaryTableList' : [
              {
                 'tableName' : 'Member',
                 'secondaryColumnList': [
                     {
                        'secondaryColumn' : 'MEM_ID',
                        'matchPercentage': '30'
                     },
                     {
                        'secondaryColumn' : 'SEC_TYPE',
                        'matchPercentage': '20'
                     }
                 ]
              },
              {
                 'tableName' : 'Provider',
                 'secondaryColumnList': [
                     {
                        'secondaryColumn' : 'PRO_ID',
                        'matchPercentage': '30'
                     },
                     {
                        'secondaryColumn' : 'PRO_TYPE',
                        'matchPercentage': '20'
                     }
                 ]
              }
             ]
      },
      {
        'primaryColumn' : 'ADD_ID1',
           'SecondaryTableList' : [
              {
                 'tableName' : 'Member1',
                 'secondaryColumnList': [
                     {
                        'secondaryColumn' : 'MEM_ID',
                        'matchPercentage': '30'
                     },
                     {
                        'secondaryColumn' : 'SEC_TYPE',
                        'matchPercentage': '20'
                     }
                 ]
              },
              {
                 'tableName' : 'Provider1',
                 'secondaryColumnList': [
                     {
                        'secondaryColumn' : 'PRO_ID',
                        'matchPercentage': '30'
                     },
                     {
                        'secondaryColumn' : 'PRO_TYPE',
                        'matchPercentage': '20'
                     }
                 ]
              }
             ]
      }
    ]
 };


  constructor() { }

  ngOnInit() {
     this.getPrimaryColumns();
     this.getSecondaryColumns();
  }

  getPrimaryColumns() {
   for (const i of this.res.relationDetails) {
      this.finalSecondaryArray = [];
      for (const j of i.SecondaryTableList) {
          const tablename = j.tableName;
          for (const z of j.secondaryColumnList) {
              const temp = {
                  tableName: tablename,
                  secondaryColumn: z.secondaryColumn,
                  matchPercentage: z.matchPercentage
              };
              this.finalSecondaryArray.push(temp);
          }
      }
      this.primaryColMap.set(i.primaryColumn, this.finalSecondaryArray);
   }
  }

  getSecondaryColumns() {
   for (const i of this.res.relationDetails) {
      for (const j of i.SecondaryTableList) {
          this.secTableNameMap.set(j.tableName, []);
      }
  }
  for (const i of this.res.relationDetails) {
      const primaryColumn = i.primaryColumn;
      for (const j of i.SecondaryTableList) {
          const tablename = j.tableName;
          const existingPrimCol = this.secTableNameMap.get(tablename);
          for (const k of j.secondaryColumnList) {
              const temp = {
               primaryColumn: primaryColumn,
               secondaryColumn: k.secondaryColumn,
               matchPercentage: k.matchPercentage
              };
              existingPrimCol.push(temp);
          }
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

}
