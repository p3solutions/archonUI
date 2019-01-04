import { Component, OnInit,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-relationship-info',
  templateUrl: './relationship-info.component.html',
  styleUrls: ['./relationship-info.component.css']
})
export class RelationshipInfoComponent implements OnInit {

@Input() tableName: string;
@Input() homeStage:boolean;
@Input() dataAModal:boolean;
@Input() isRelationShipAvailable:boolean;
@Input() relationshipInfo:any[];
@Input() serviceActionType: string;

  constructor() { }

  ngOnInit() {

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   console.log(changes);
  //   console.log(1,this.tableName);
  //   console.log(2,this.homestage);
  //   console.log(3,this.isRelationShipAvailable);
  //   console.log(4,this.relationshipInfo);
  //   console.log(5,this.dataAModal);

  // }

}
