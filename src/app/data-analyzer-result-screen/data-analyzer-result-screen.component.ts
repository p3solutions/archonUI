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
   SecondaryTableList = [];
   SecondaryColumnList = [];
   finalSecondaryArray = [];
   secTableNameMap = new Map();
   activateSecondary = true;
   activatePrimary = false;
   resultant = [];
   populatePrimaryValuesArray: any;
   populateSecondaryValuesArray: any;



  constructor(private tablelistService: TableListService) { }


  ngOnInit() {
     this.tablelistService.currentResultArray.subscribe(res => this.resultant = res);
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
  }

  populateSecondaryValues(x) {
  this.populateSecondaryValuesArray = this.secTableNameMap.get(x.key);
  }


}
