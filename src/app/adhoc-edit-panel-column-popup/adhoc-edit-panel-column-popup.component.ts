import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { Tab, PanelColumns, PanelDetails } from '../adhoc-landing-page/adhoc';

@Component({
  selector: 'app-adhoc-edit-panel-column-popup',
  templateUrl: './adhoc-edit-panel-column-popup.component.html',
  styleUrls: ['./adhoc-edit-panel-column-popup.component.css']
})
export class AdhocEditPanelColumnPopupComponent implements OnInit {
  openPanelIndex = 0;
  selectedInlineTab = 0;
  selectedSideTab = 0;
  @Output() showPanelSearchColumnEvent = new EventEmitter<boolean>();
  @Input() openedPanelIndex: number;
  @Input() inlinePanelTab = new Tab();
  @Input() sidePanelTab = new Tab();
  editPanelColumnForm: FormGroup;
  panelColumn = new PanelColumns();
  panelDetails = new PanelDetails();
  sortingValue: string[] = ['=', 'Starts with', 'Ends with', 'Wild', '&lt', '&lt =', '&gt', '&gt =', 'Between'
    , 'Between and Inclusion'];
  outputFunctions: string[] = ['Gender Description Common', 'Gender Description to acronym',
    'Date From YYYY-MM-DD to MM-DD-YYYY', 'Date From YYYY-MM-DD to YYYYMMDD', 'Date From YYYYMMDD To MM-DD-YYYY'];
  constructor(private adhocScreenService: AdhocScreenService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.adhocScreenService.updatedPanelColumn.subscribe(result => {
      this.panelColumn = result;
    });
    this.adhocScreenService.updatedPanelChanged.subscribe(result => {
      this.openPanelIndex = result;
    });
    this.adhocScreenService.updatedInlinePanelTabChange.subscribe(result => {
      this.selectedInlineTab = result.tabIndex;
    });
    this.adhocScreenService.updatedSidePanelTabChange.subscribe(result => {
      this.selectedSideTab = result.tabIndex;
    });
    this.initEditSearchForm();
  }


  initEditSearchForm() {
    this.editPanelColumnForm = this.formBuilder.group({
      label: new FormControl(this.panelColumn.label, Validators.required),
      sortingValue: new FormControl(this.panelColumn.sortingValue, Validators.required),
      outputFunction: new FormControl(this.panelColumn.outputFunction, Validators.required),
      isMaskField: new FormControl(this.panelColumn.isMaskField),
      maskType: new FormControl(this.panelColumn.maskDetail.maskType),
      visibleTextSize: new FormControl(this.panelColumn.maskDetail.visibleTextSize),
      isEnableFilter: new FormControl(this.panelColumn.isEnableFilter),
      isHideColumn: new FormControl(this.panelColumn.isHideColumn)
    });
  }

  update() {
    this.adhocScreenService.updatedPanelDetails.subscribe(result => {
      this.panelDetails = result;
    });
    const columnId = this.panelColumn.columnId;
    const tableId = this.panelColumn.tableId;
    const label = this.panelColumn.label;
    this.panelColumn.label = this.editPanelColumnForm.get('label').value;
    this.panelColumn.sortingValue = this.editPanelColumnForm.get('sortingValue').value;
    this.panelColumn.outputFunction = this.editPanelColumnForm.get('outputFunction').value;
    this.panelColumn.isHideColumn = this.editPanelColumnForm.get('isHideColumn').value;
    this.panelColumn.isEnableFilter = this.editPanelColumnForm.get('isEnableFilter').value;
    this.panelColumn.isMaskField = this.editPanelColumnForm.get('isMaskField').value;
    this.panelColumn.maskDetail.maskType = this.editPanelColumnForm.get('maskType').value;
    this.panelColumn.maskDetail.visibleTextSize = this.editPanelColumnForm.get('visibleTextSize').value;
    if (this.checkDuplicatePanelColumn(this.editPanelColumnForm.get('label').value)) {
      if (this.openedPanelIndex === 0) {
        const index = this.panelDetails.mainPanelDetails.panelColumn.findIndex(a => a.columnId === columnId &&
          a.tableId === tableId && a.label === label);
        if (index !== -1) {
          this.panelDetails.mainPanelDetails.panelColumn.splice(index, 1, this.panelColumn);
        }
      } else if (this.openedPanelIndex === 1) {
        const index = this.panelDetails.inlinePanelDetails.tabs[this.selectedInlineTab].
          panelColumn.findIndex(a => a.columnId === columnId && a.tableId === tableId && a.label === label);
        if (index !== -1) {
          this.panelDetails.inlinePanelDetails.tabs[this.selectedInlineTab].panelColumn.splice(index, 1, this.panelColumn);
        }

      } else if (this.openedPanelIndex === 2) {
        const index = this.panelDetails.sidePanelDetails.tabs[this.selectedSideTab].
          panelColumn.findIndex(a => a.columnId === columnId && a.tableId === tableId && a.label === label);
        if (index !== -1) {
          this.panelDetails.sidePanelDetails.tabs[this.selectedSideTab].panelColumn.splice(index, 1, this.panelColumn);
        }
      }
      this.cancel();
    }
    this.adhocScreenService.updatePanelDetails(this.panelDetails);
  }

  checkDuplicatePanelColumn(label) {
    if (this.panelDetails.mainPanelDetails.panelColumn.filter(a => a.label === label).length > 0) {
      return false;
    }

    for (const inlineTab of this.panelDetails.inlinePanelDetails.tabs) {
      if (inlineTab.panelColumn.filter(a => a.label === label).length > 0) {
        return false;
      }
    }

    for (const sideTab of this.panelDetails.sidePanelDetails.tabs) {
      if (sideTab.panelColumn.filter(a => a.label === label).length > 0) {
        return false;
      }
    }
    return true;
  }
  // getInfo() {
  //   this.inputFunctionInfo = this.inputFunctionList.find(a => a.functionName === this.editSearchForm.get('inputFunction').value);
  //   document.getElementById('openFunctionInfoModel').click();
  // }

  cancel() {
    this.showPanelSearchColumnEvent.emit(false);
  }
}
