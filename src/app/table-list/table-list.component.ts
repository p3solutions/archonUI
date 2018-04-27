import { Component, OnInit } from '@angular/core';
import { TableListService } from './table-list.service';
import { RelationshipInfoObject } from '../workspace-objects';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  private homeStage: boolean;
  private tableName: string;
  private relationshipInfo: RelationshipInfoObject[];
  constructor(
    private tablelistService: TableListService
  ) { }
  private tableList: string[];
  ngOnInit() {
    this.homeStage = true;
    this.tablelistService.getTableList().subscribe(result => {
      this.tableList = result;
    });
  }
  loadRelationTable(tableName: string) {
    this.homeStage = false;
    this.tableName = tableName;
    this.tablelistService.getListOfRelationTable(tableName).subscribe(result => {
      this.relationshipInfo = result;
      console.log(this.relationshipInfo);
    });
  }
  extractTableInfo(info: string) {

  }

}
