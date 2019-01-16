import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-relationship-info',
  templateUrl: './relationship-info.component.html',
  styleUrls: ['./relationship-info.component.css']
})
export class RelationshipInfoComponent implements OnInit {

  @Input() tableName: string;
  @Input() homeStage: boolean;
  @Input() dataAModal: boolean;
  @Input() isRelationShipAvailable: boolean;
  @Input() relationshipInfo: any[];
  @Input() serviceActionType: string;

  constructor() { }

  ngOnInit() {

  }
}
