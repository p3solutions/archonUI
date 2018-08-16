import { Component, OnInit, Pipe } from '@angular/core';
import { TableListService } from './table-list.service';
import { RelationshipInfoObject } from '../workspace-objects';
import { InMemoryDataService } from '../in-memory-data.service';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {
  public search: any = '';
  private homeStage = false;
  private isAvailable: boolean;
  private isRelationShipAvailable: boolean;
  private selectedPrimTbl: any;
  private relationshipInfo: RelationshipInfoObject[];
  private serviceActionType: string;
  private tableList: string[];
  primColArray = [];
  secColArray = [];
  secTblArray = [];
  selectedPrimColMap = new Map();
  selectedSecColMap = new Map();
  dataAModal = false;
  analysisRowCount = 3;
  selectedPrimCol = new Map();
  selectedSecTbl = new Map();
  selectedSecCol = new Map();
  enableNextBtn = false;
  // primColLoader = false;
  // secColLoader = false;
  constructor(
    private tablelistService: TableListService
  ) { }

  ngOnInit() {
    this.isAvailable = false;
    this.isRelationShipAvailable = false;
    this.getTableList();
  }
  getTableList() {
    this.tablelistService.getTableList().subscribe(res => {
      this.tableList = res;
      this.isAvailable = true;
      // console.log(this.tableList);
    });
  }

  loadRelationTable(table: any) {
    this.homeStage = true;
    this.dataAModal = false;
    this.selectedPrimTbl = table;
    this.secTblArray = [];
    // this.tablelistService.getListOfRelationTable(this.selectedPrimTbl.table_name).subscribe(result => {
    //   this.relationshipInfo = result;
    //   this.isRelationShipAvailable = true;
    //   // console.log(this.relationshipInfo);
    // });
    this.serviceActionType = this.tablelistService.getServiceActionType();
  }

  openDataAModal() {
    this.homeStage = false;
    this.dataAModal = true;
    this.getColumnsByTableName(this.selectedPrimTbl.table_name, true);
    this.resetDataAModal();
  }
  getColumnsByTableName(table_name, isPrime) {
    if (isPrime) {
      this.primColArray = [];
      // this.primColLoader = true;
    } else {
      this.secColArray = [];
      // this.secColLoader = true;
    }
    this.tablelistService.getColumnsByTableName(table_name)
    .subscribe((columns) => {
      if (isPrime) {
        this.primColArray = columns;
        // this.primColLoader = false;
      } else {
        this.secColArray = columns;
        // this.secColLoader = false;
        this.selectedSecCol.clear();
      }
    });
  }
  gotoBack() {
    this.homeStage = true;
    this.dataAModal = false;
  }
  resetDataAModal() {
    this.enableNextBtn = false;
  }

  addToTblColMap(column, isPrimary) {
    const tableColMap = isPrimary ? this.selectedPrimColMap : this.selectedSecColMap;
    const secTblVal = tableColMap.get(column.table_name);
    if (secTblVal) {
      secTblVal.push(column);
      // console.log('isPrimary', isPrimary, 'pushed', secTblVal);
    } else {
      tableColMap.set(column.table_name, [column]);
      // console.log('isPrimary', isPrimary, '1st push', tableColMap);
    }
  }
  removeFromTblColMap(column, isPrimary) {
    const tableColMap = isPrimary ? this.selectedPrimColMap : this.selectedSecColMap;
    // console.log('isPrimary', isPrimary, tableColMap);
    const secTblVal = tableColMap.get(column.table_name);
    for (let ind = 0; ind < secTblVal.length; ind++) {
      if (secTblVal[ind] === column) {
        secTblVal.splice(ind, 1);
        break;
      }
    }
    // console.log('isPrimary', isPrimary, 'deleted', tableColMap);
  }
  togglePrimaryColumns(_event, column) {
    const target = _event.target;
    if (target.checked) {
      this.selectedPrimCol.set(target.id, true);
      this.addToTblColMap(column, true);
    } else {
      this.selectedPrimCol.delete(target.id);
      this.removeFromTblColMap(column, true);
    }
    this.enableDisableNextBtn();
  }
  toggleSecTbl(_event) {
    const target = _event.target;
    if (target.checked) {
      this.selectedSecTbl.set(target.id, true);
      this.getColumnsByTableName(target.id, false);
    } else {
      this.selectedSecTbl.delete(target.id);
    }
    this.enableDisableNextBtn();
  }
  toggleSecColumns(_event, column) {
    const target = _event.target;
    if (target.checked) {
      column.selected = true;
      this.selectedSecCol.set(column.column_name, true);
      this.addToTblColMap(column, false);
    } else {
      this.selectedSecCol.delete(column.column_name);
      this.removeFromTblColMap(column, false);
    }
    this.enableDisableNextBtn();
  }
  generateSecTblArray() {
    if (this.secTblArray.length === 0) {
      this.tableList.forEach((el) => {
        if (el !== this.selectedPrimTbl) {
          this.secTblArray.push(el);
        }
      });
    }
    this.enableNextBtn = this.selectedSecTbl.size > 0;
  }
  getCurrentStep() {
    return document.querySelector('#dataAModal-carousel .item.active').getAttribute('step');
  }
  enableDisableNextBtn() {
    const currentStep = this.getCurrentStep();
    switch (currentStep) {
      case '0':
        this.enableNextBtn = this.selectedPrimCol.size > 0;
        break;
      case '1':
        this.enableNextBtn = this.selectedSecColMap.size > 0;
        break;
      case '2':
        this.enableNextBtn = this.selectedSecCol.size > 0;
        break;
      // case '3':
      //   this.enableNextBtn = this.selectedPrimCol.size > 0;
      //   break;
      default:
        break;
    }
  }
  // carousel handling codes
  addClass(elementId, classSelector) {
    document.getElementById(elementId).classList.add(classSelector);
  }
  removeClass(elementId, classSelector) {
    document.getElementById(elementId).classList.remove(classSelector);
  }

  prevStep(e) {
    document.getElementById('prev-slide').click();
    this.handleStepIindicator(false);
  }

  nextStep(e) {
    document.getElementById('next-slide').click();
    this.handleStepIindicator(true);
  }

  handleStepIindicator(isNext) {
    const slideNo = this.getCurrentStep();
    const progressSelector = 'progress-bar';
    // console.log('slideNo', slideNo, document.getElementById(progressSelector));
    switch (slideNo) {
      case '0':
        // this.removeClass(progressSelector, 'width-5-pc');
        // this.removeClass(progressSelector, 'width-5-25-pc-rev');
        // this.addClass(progressSelector, 'width-5-25-pc');
        // // this.addClass('cancel-btn', 'hide');
        this.removeClass(progressSelector, 'width-5-pc');
        this.removeClass(progressSelector, 'width-33-pc-rev');
        this.addClass(progressSelector, 'width-33-pc');
        this.removeClass('prev-btn', 'hide');
        this.generateSecTblArray();
        break;
      case '1':
        // this.removeClass(progressSelector, 'width-5-25-pc');
        this.removeClass(progressSelector, 'width-33-pc');
        if (isNext) {
          // this.addClass(progressSelector, 'width-25-50-pc');
          // this.removeClass(progressSelector, 'width-25-50-pc-rev');
          this.addClass(progressSelector, 'width-66-pc');
          this.removeClass(progressSelector, 'width-66-pc-rev');
          this.removeClass('analyse-btn', 'hide');
          this.addClass('next-btn', 'hide');
        } else {
          // this.removeClass(progressSelector, 'width-25-50-pc-rev');
          // this.addClass(progressSelector, 'width-5-25-pc-rev');
          this.removeClass(progressSelector, 'width-66-pc-rev');
          this.addClass(progressSelector, 'width-33-pc-rev');
          // this.removeClass('cancel-btn', 'hide');
          this.removeClass('next-btn', 'hide');
          this.addClass('prev-btn', 'hide');
        }
        this.enableDisableNextBtn();
        break;
      case '2':
        // this.removeClass(progressSelector, 'width-25-50-pc');
        // this.removeClass(progressSelector, 'width-50-75-pc-rev');
        this.removeClass(progressSelector, 'width-66-pc');
        // this.removeClass(progressSelector, 'width-100-pc-rev');
        if (isNext) {
          // this.removeClass(progressSelector, 'width-5-25-pc-rev');
          // this.addClass(progressSelector, 'width-50-75-pc');
          // this.removeClass(progressSelector, 'width-33-pc-rev');
        } else {
          // this.removeClass(progressSelector, 'width-75-100-pc-rev');
          // this.addClass(progressSelector, 'width-25-50-pc-rev');
          // this.addClass(progressSelector, 'width-100-pc-rev');
          this.addClass(progressSelector, 'width-66-pc-rev');
          this.addClass('analyse-btn', 'hide');
          this.removeClass('next-btn', 'hide');
        }
        break;
      // case '3':
      //   // this.removeClass(progressSelector, 'width-50-75-pc');
      //   this.removeClass(progressSelector, 'width-100-pc');
      //   if (isNext) {
      //     // this.addClass(progressSelector, 'width-75-100-pc');
      //     // this.addClass(progressSelector, 'width-75-100-pc');
      //     // this.removeClass('analyse-btn', 'hide');
      //     // this.addClass('next-btn', 'hide');
      //     // this.addClass('prev-btn', 'hide');
      //   } else {
      //     this.addClass(progressSelector, 'width-100-pc-rev');
      //   }
      //   break;
      default:
        break;
    }
  }
  dataAnalyse() {
    const progressSelector = 'progress-bar';
    this.addClass(progressSelector, 'width-100-pc');
    this.addClass('prev-btn', 'hide');
  }
}
