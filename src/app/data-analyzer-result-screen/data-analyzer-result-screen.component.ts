import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-analyzer-result-screen',
  templateUrl: './data-analyzer-result-screen.component.html',
  styleUrls: ['./data-analyzer-result-screen.component.css']
})
export class DataAnalyzerResultScreenComponent implements OnInit {

  res: any = {
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
  }


}
