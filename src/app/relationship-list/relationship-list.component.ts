import { Component, OnInit, Input } from '@angular/core';
import { ErrorObject } from '../error-object';
import { TableListService } from '../table-list/table-list.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { RelationshipInfoObject } from '../workspace-objects';
@Component({
  selector: 'app-relationship-list',
  templateUrl: './relationship-list.component.html',
  styleUrls: ['./relationship-list.component.css']
})
export class RelationshipListComponent implements OnInit {
  @Input() isRelationShipAvailable: boolean;
  @Input() relationshipInfo: any[];
  @Input() serviceActionType: string;
  deleteNotif = new ErrorObject();
  primaryTableId: any;
  joinListTemp: any;
  relationShipIDs = [];
  delProgress: boolean;
  tableCopy: any;
  index = '';
  editrelationshipInfo: any;
  tableName: string;
  homeStage: boolean;
  dataAModal: boolean;
  selectedPrimTblID: any;
  selectedPrimTbl: any;
  workspaceID: any;
  constructor(
    private tablelistService: TableListService,
    private workspaceHeaderService: WorkspaceHeaderService
  ) { }

  ngOnInit() {
  }
  closeErrorMsg() {
    this.deleteNotif = new ErrorObject();
  }
  confirmDelete(): void {
    this.delProgress = true;
    this.tablelistService.deleteRelationInfoData(this.workspaceID, this.primaryTableId, this.relationShipIDs).subscribe(res => {
      this.delProgress = false;
      if (res && res.success) {
        // tr.remove(); // Removing the row.
        this.postDelete();
      } else {
        this.deleteNotif.show = true;
        this.deleteNotif.message = res.data;
      }
    });
  }
  // resetDataAModal() {
  //   this.enableNextBtn = false;
  //   this.secTblArray = [];
  //   this.secColArray = [];
  //   this.selectedPrimColMap.clear();
  //   this.secTblColMap.clear();
  //   this.selectedSecColMap.clear();
  //   this.finalSecColMap.clear();
  // }

  loadRelationTable(table: any) {
    this.tableCopy = table;
    this.homeStage = true;
    this.dataAModal = false;
    this.selectedPrimTblID = table.tableId;
    this.selectedPrimTbl = table.tableName;
    // this.resetDataAModal();
    this.tablelistService.getListOfRelationTable(this.selectedPrimTblID, this.workspaceID).subscribe(result => {
      this.relationshipInfo = result;
      this.isRelationShipAvailable = true;
    });
    this.serviceActionType = this.tablelistService.getServiceActionType();
  }

  postDelete() {
    const close: HTMLButtonElement = document.querySelector('#confirmDelMemModal .cancel');
    close.click();
    this.loadRelationTable(this.tableCopy);
  }

  deleteRelationship(indexOfDelete) {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.index = indexOfDelete;
    this.editrelationshipInfo = this.relationshipInfo[this.index];
    this.primaryTableId = this.editrelationshipInfo.primaryTable.tableId;
    this.joinListTemp = this.editrelationshipInfo.joinListInfo;
    for (const x of this.joinListTemp) {
      this.relationShipIDs.push(x.relationshipId);
    }
  }
}
