import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';
import { takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-add-direct-join',
  templateUrl: './add-direct-join.component.html',
  styleUrls: ['./add-direct-join.component.css']
})
export class AddDirectJoinComponent implements OnInit {
  @Input() directJoin: any;
  @Input() tableList: any;
  @Input() workspaceID: any;
  primaryTable: any;
  primaryTableId: any;

  constructor() { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges (change: SimpleChanges) {
    this.populateValues();
   }

   populateValues() {
     this.primaryTable = this.directJoin.tableName;
     this.primaryTableId = this.directJoin.tableId;
     this.workspaceID = this.workspaceID;
  }
}
