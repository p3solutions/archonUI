import { Component, OnInit } from '@angular/core';
import { TableListService } from './table-list.service';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(
    private tablelistService: TableListService
  ) {  }
  private tableList: string[];
  ngOnInit() {
    this.tablelistService.getTableList().subscribe(result => {
      this.tableList = result;
      console.log(this.tableList, 'TTTTTTTTTTTTTTTTTTTT');
    });
  }

}
