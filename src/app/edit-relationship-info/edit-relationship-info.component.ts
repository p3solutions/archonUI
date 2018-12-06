import { Component, OnInit, Input, SimpleChange, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-edit-relationship-info',
  templateUrl: './edit-relationship-info.component.html',
  styleUrls: ['./edit-relationship-info.component.css']
})
export class EditRelationshipInfoComponent implements OnInit, OnChanges {
  @Input() relation: any;
  primaryTable: string;
  secondaryTable: string;
  userValues: any;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(change: SimpleChanges) {
   const value: SimpleChange = change.relation;
   this.userValues = value.currentValue;
   this.populateValues(this.userValues);
  }

  populateValues(userValues) {
    this.primaryTable = this.userValues.primaryTable.tableName;
    this.secondaryTable = this.userValues.secondaryTable.tableName;
  }
}
