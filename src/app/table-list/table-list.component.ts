import { Component, OnInit, Pipe, Input } from '@angular/core';
import { TableListService } from './table-list.service';
import { RelationshipInfoObject } from '../workspace-objects';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ErrorObject } from '../error-object';
import { UserinfoService } from '../userinfo.service';

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
  private tableName: string;
  private relationshipInfo: any[];
  private serviceActionType: string;
  private tableList: any[];
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
  finalSecColMap = new Map();
  enableNextBtn = false;
  // primColLoader = false;
  // secColLoader = false;
  prefixSecTblId = 'secTbl_';
  secTblColJoiner = '$$';
  selectedTblsColsObj: any = {};
  workspaceID: any;
  selectedPrimTblID: any;
  index = '';
  editrelationshipInfo: any;
  primaryTableId: any;
  joinListTemp: any;
  relationShipIDs = [];
  delProgress: boolean;
  deleteNotif = new ErrorObject();
  tableCopy: any;
  SecondaryTableName: string;
  SecondaryTableId: any;
  userId: any;
  finalPrimColArray: any[];
  finalSecondaryTableList: any[];
  finalSecColArray: any[];

  constructor(
    private tablelistService: TableListService,
    private workspaceHeaderService: WorkspaceHeaderService,
    private userinfoService: UserinfoService
  ) {
    this.userId = this.userinfoService.getUserId();
   }
  ngOnInit() {
    // this.homeStage = true;
    this.isAvailable = false;
    this.isRelationShipAvailable = false;
    this.getTableList();
  }
  getTableList() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.tablelistService.getTableList(this.workspaceID).subscribe(res => {
      this.tableList = res;
      // console.log(this.tableList);
      this.isAvailable = true;
    });
  }

  loadRelationTable(table: any) {
    this.tableCopy = table;
    this.homeStage = true;
    this.dataAModal = false;
    this.selectedPrimTblID = table.tableId;
    this.selectedPrimTbl = table.tableName;
    this.resetDataAModal();
    this.tablelistService.getListOfRelationTable(this.selectedPrimTblID, this.workspaceID).subscribe(result => {
      this.relationshipInfo = result;
      this.isRelationShipAvailable = true;
    });
    this.serviceActionType = this.tablelistService.getServiceActionType();
  }

  openDataAModal() {
    this.homeStage = false;
    this.dataAModal = true;
    this.getColumnsByTableName(this.selectedPrimTblID, true);
    this.resetDataAModal();
  }

  getColumnsByTableName(tableId, isPrime) {
    if (isPrime) {
      this.primColArray = [];
      // this.primColLoader = true;
    } else {
      this.secColArray = [];
      // this.secColLoader = true;
    }
    this.tablelistService.getColumnsByTableId(tableId).subscribe((columns) => {
      if (isPrime) {
        this.primColArray = columns;
        // this.primColLoader = false;
      } else {
        this.secTblColMap.set(tableId, columns);
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
    this.secColArray = [];
    this.selectedPrimColMap.clear();
    this.secTblColMap.clear();
    this.selectedSecColMap.clear();
    this.finalSecColMap.clear();
  }
  // for selecting and mapping the checked values of table
  toggleColSelection(_event, isPrimary, column) {
    const isChecked = _event.target.checked ? true : false;
    if (isPrimary) {
      for (let i = 0; i < this.primColArray.length; i++) {
        if (this.primColArray[i].columnName === column.columnName) {
          this.primColArray[i].selected = isChecked;
          if (isChecked) {
            this.selectedPrimColMap.set(column.columnName, true);
          } else {
            this.selectedPrimColMap.delete(column.columnName);
          }
          break;
        }
      }
    } else {
      for (let i = 0; i < this.secColArray.length; i++) {
        if (this.secColArray[i].columnName === column.columnName) {
          const secColName = this.SecondaryTableName + this.secTblColJoiner + column.columnName;
          this.secColArray[i].selected = isChecked;
          if (isChecked) {
            this.selectedSecColMap.set(secColName, true);
            const secTbl = <HTMLInputElement> document.getElementById(this.prefixSecTblId + this.SecondaryTableName);
            if (!this.selectedSecTbl.has(this.SecondaryTableName)) { // if sec table unselected and sec col is checked
              secTbl.checked = true;
            }
            this.finalSecColMap.set(secColName, true);
          } else {
            this.selectedSecColMap.delete(secColName);
            this.finalSecColMap.delete(secColName);
          }
          break;
        }
      }
    }
    this.enableDisableNextBtn();
  }
  toggleSecTblSelection(_event, table) {
    const isChecked = _event.target.checked;
    for (let i = 0; i < this.secTblArray.length; i++) {
      if (this.secTblArray[i].tableName === this.SecondaryTableName) {
        this.secTblArray[i].selected = isChecked;
        if (isChecked) {
          this.selectedSecTbl.set(this.SecondaryTableName, true);
        } else {
          this.selectedSecTbl.delete(this.SecondaryTableName);
          // sec col reset selection
          this.secColArray.forEach(col => col.selected = false );
          this.selectedSecColMap.clear();
          const currentSecColArr = this.secTblColMap.get(this.SecondaryTableId);
          currentSecColArr.forEach(secCol => {
          const secColName = this.SecondaryTableName + this.secTblColJoiner + secCol.columnName;
            if (this.finalSecColMap.has(secColName)) {
              this.finalSecColMap.delete(secColName);
            }
          });
        }
        break;
      }
    }
    this.enableDisableNextBtn();
  }
  // for keeping the table selected
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
  // loads selected the table
  highlightTable(_event, isPrime, table) {
    this.toggleTblSelection(_event);
    if (isPrime) {
      this.tableName = table.tableName;
      this.loadRelationTable(table);
      this.resetDataAModal();
    } else {
      // const secTbl = _event.target.children.namedItem(this.prefixSecTblId + table.tableName.toLowerCase());
      // if (secTbl) {
      //   secTbl.checked = true;
      // }
      this.SecondaryTableName = table.tableName;
      this.SecondaryTableId = table.tableId;
      this.showSecTblCols(table.tableId);
    }
  }
  // secondary table Columns
  showSecTblCols(tableId) {
    if (this.secTblColMap.has(tableId)) {
      this.secColArray = this.secTblColMap.get(tableId);
      this.selectedSecColMap.clear();
      this.secColArray.forEach(col => {
        if (col.selected) {
          this.selectedSecColMap.set(col.columnName, true);
        }
      });
    } else {
      this.getColumnsByTableName(tableId , false);
    }
  }
  // generating secondary table array
  generateSecTblArray() {
    if (this.secTblArray.length === 0) {
      for (const i of this.tableList) {
        if (i.tableName !== this.selectedPrimTbl) {
          this.secTblArray.push(i);
        }
      }
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
        this.enableNextBtn = this.finalSecColMap.size > 0;
        break;
      // case '2':
      //   this.enableNextBtn
      //   break;
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

  getAllSelectedTblsCols() {
    this.finalPrimColArray = [];
    this.selectedPrimColMap.forEach((val, key) => {
      const columnObject = {
      'columnName' : key
      };
      this.finalPrimColArray.push(columnObject);
    });
    this.selectedTblsColsObj.userId = this.userId;
    this.selectedTblsColsObj.workspaceId = this.workspaceID;
    this.selectedTblsColsObj.primaryTable = {
      'tableName' : this.selectedPrimTbl,
      'primaryColumnList': this.finalPrimColArray
    };
    this.selectedTblsColsObj.secondaryTableList = [];
    const secMap = new Map();
    this.finalSecColMap.forEach((val, key) => {
      const arr = key.split(this.secTblColJoiner);
      const secTbl = arr[0];
      const secCol = {
        'columnName' : arr[1]
      };
      if (secMap.has(secTbl)) {
        const secCols = secMap.get(secTbl);
        secCols.push(secCol);
      } else {
        secMap.set(secTbl, [secCol]);
      }
    });
    secMap.forEach((valArray, key) => {
      this.selectedTblsColsObj.secondaryTableList.push(
        {
          'tableName' : key,
          'secondaryColumnList': valArray
        }
      );
    });
    this.finalSecondaryTableList = this.selectedTblsColsObj.secondaryTableList;
    this.finalSecColArray =  this.selectedTblsColsObj.secondaryTableList[0].secondaryColumnList;
    console.log('finally', this.selectedTblsColsObj);
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
        this.getAllSelectedTblsCols();
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
      //  break;
      default:
        break;
    }
  }
  dataAnalyse() {
    const progressSelector = 'progress-bar';
    this.addClass(progressSelector, 'width-100-pc');
    this.addClass('prev-btn', 'hide');
    this.addClass('analyse-btn', 'hide');
    this.removeClass('close-btn', 'hide');
  }
  deleteRelationship(indexOfDelete) {
    this.index = indexOfDelete;
    this.editrelationshipInfo  = this.relationshipInfo[this.index];
    this.primaryTableId = this.editrelationshipInfo.primaryTable.tableId;
    this.joinListTemp = this.editrelationshipInfo.joinListInfo;
    for (const x of this.joinListTemp) {
      this.relationShipIDs.push(x.relationshipId);
    }
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
    closeErrorMsg() {
      this.deleteNotif = new ErrorObject();
    }
     postDelete() {
       const close: HTMLButtonElement = document.querySelector('#confirmDelMemModal .cancel');
       close.click();
       this.loadRelationTable(this.tableCopy);
    }
    finalSecCol(x) {
      (<HTMLElement>document.querySelector('#finalSecTab tbody tr:first-child')).style.border = '1px';
      this.finalSecColArray = x.secondaryColumnList;
    }

}
