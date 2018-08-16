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
  selectedPrimColMap = new Map(); // map of primary column name, true
  selectedSecColMap = new Map(); // map of secondary column name, true
  dataAModal = false;
  analysisRowCount = 3;
  // selectedPrimCol = new Map();
  selectedSecTbl = new Map(); // map of secondary table name, true
  secTblColMap = new Map();
  // selectedSecCol = new Map();
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
    this.resetDataAModal();
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
  getColumnsByTableName(tableName, isPrime) {
    if (isPrime) {
      this.primColArray = [];
      // this.primColLoader = true;
    } else {
      this.secColArray = [];
      // this.secColLoader = true;
    }
    this.tablelistService.getColumnsByTableName(tableName)
    .subscribe((columns) => {
      if (isPrime) {
        this.primColArray = columns;
        // this.primColLoader = false;
      } else {
        this.secTblColMap.set(tableName, columns);
        this.secColArray = columns;
        // this.secColLoader = false;
        this.selectedSecColMap.clear();
      }
    });
  }
  gotoBack() {
    this.homeStage = true;
    this.dataAModal = false;
  }
  resetDataAModal() {
    this.enableNextBtn = false;
    this.secTblArray = [];
    this.selectedSecColMap.clear();
  }
  toggleColSelection(_event, isPrimary, column) {
    const isChecked = _event.target.checked ? true : false;
    if (isPrimary) {
      for (let i = 0; i < this.primColArray.length; i++) {
        if (this.primColArray[i].column_name === column.column_name) {
          this.primColArray[i].selected = isChecked;
          if (isChecked) {
            this.selectedPrimColMap.set(column.column_name, true);
          } else {
            this.selectedPrimColMap.delete(column.column_name);
          }
          break;
        }
      }
    } else {
      for (let i = 0; i < this.primColArray.length; i++) {
        if (this.secColArray[i].column_name === column.column_name) {
          this.secColArray[i].selected = isChecked;
          if (isChecked) {
            this.selectedSecColMap.set(column.column_name, true);
          } else {
            this.selectedSecColMap.delete(column.column_name);
          }
          break;
        }
      }
    }
    this.enableDisableNextBtn();
  }
  toggleSecTblSelection(_event, tableName) {
    const isChecked = _event.target.checked;
    for (let i = 0; i < this.secTblArray.length; i++) {
      if (this.secTblArray[i].table_name === tableName) {
        this.secTblArray[i].selected = isChecked;
        if (isChecked) {
          this.selectedSecTbl.set(tableName, true);
        } else {
          this.selectedSecTbl.delete(tableName);
          // sec col reset selection
          this.secColArray.forEach(col => {
            col.selected = false;
          });
          this.selectedSecColMap.clear();
        }
        break;
      }
    }
    this.enableDisableNextBtn();
  }
  toggleTblSelection(_event) {
    const parentDiv = $(_event.target).parents('.da-table-parent');
    const children = $(parentDiv).find('.da-table');
    children.each((i, el) => {
      el.classList.remove('selected');
    });
    if (_event.target.classList.contains('da-table')) {
      _event.target.classList.add('selected');
    } else {
      $(_event.target).parents('.da-table').addClass('selected');
    }
  }
  highlightTable(_event, isPrime, table) {
    this.toggleTblSelection(_event);
    if (isPrime) {
      this.loadRelationTable(table);
    } else {
      const secTbl = _event.target.children.namedItem(table.table_name);
      if (secTbl) {
        secTbl.checked = true;
      }
      this.showSecTblCols(table.table_name);
    }
  }
  showSecTblCols(tableName) {
    if (this.secTblColMap.has(tableName)) {
      this.secColArray = this.secTblColMap.get(tableName);
      this.selectedSecColMap.clear();
      this.secColArray.forEach(col => {
        if (col.selected) {
          this.selectedSecColMap.set(col.column_name, true);
        }
      });
    } else {
      this.getColumnsByTableName(tableName, false);
    }
  }
  generateSecTblArray() {
    if (this.secTblArray.length === 0) {
      this.tableList.forEach((el) => {
        if (el !== this.selectedPrimTbl) {
          this.secTblArray.push(el);
        }
      });
    }
    // this.enableNextBtn = this.selectedSecTbl.size > 0;
  }
  getCurrentStep() {
    return document.querySelector('#dataAModal-carousel .item.active').getAttribute('step');
  }
  enableDisableNextBtn() {
    const currentStep = this.getCurrentStep();
    switch (currentStep) {
      case '0':
        this.enableNextBtn = this.selectedPrimColMap.size > 0;
        break;
      case '1':
        this.enableNextBtn = this.selectedSecColMap.size > 0;
        break;
      case '2':
        // this.enableNextBtn = this.selectedSecCol.size > 0;
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
