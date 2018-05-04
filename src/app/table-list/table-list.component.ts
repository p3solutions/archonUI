import { Component, OnInit, Pipe } from '@angular/core';
import { TableListService } from './table-list.service';
import { RelationshipInfoObject } from '../workspace-objects';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  public search: any = '';
  private homeStage: boolean;
  private isAvailable: boolean;
  private tableName: string;
  private relationshipInfo: RelationshipInfoObject[];
  constructor(
    private tablelistService: TableListService
  ) { }
  private tableList: string[];
  ngOnInit() {
    this.homeStage = true;
    this.isAvailable = false;
    this.tablelistService.getTableList().subscribe(result => {
      this.tableList = result;
      this.isAvailable = true;
    });
  }
  loadRelationTable(tableName: string) {
    this.homeStage = false;
    this.tableName = tableName;
    this.tablelistService.getListOfRelationTable(tableName).subscribe(result => {
      this.relationshipInfo = result;
      // console.log(this.relationshipInfo);
    });
  }
  extractTableInfo(info: string) {

  }

}
