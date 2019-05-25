import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { Tab, ResultFields, SearchResult, InputFunctionsInfo, inputFunctionList } from '../adhoc-landing-page/adhoc';

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
  editResultFieldsForm: FormGroup;
  resultFields = new ResultFields();
  searchResult = new SearchResult();
  outputFunctionInfo = new InputFunctionsInfo();
  outputFunctionsList = inputFunctionList;
  sortingValue: string[] = ['Disable sorting in this column', 'Disable sorting in this column',
    'Enable default sort-Ascending', 'Enable default sort-Descending'];
  outputFunctions: string[] = ['', 'Gender Description Common', 'Gender Description to acronym',
    'Date From YYYY-MM-DD to MM-DD-YYYY', 'Date From YYYY-MM-DD to YYYYMMDD', 'Date From YYYYMMDD To MM-DD-YYYY'];
  maskValues: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  constructor(private adhocScreenService: AdhocScreenService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.adhocScreenService.updatedSearchResult.subscribe(result => {
      this.searchResult = result;
    });
    this.adhocScreenService.updatedResultField.subscribe(result => {
      this.resultFields = result;
    });
    this.adhocScreenService.updatedPanelChanged.subscribe(result => {
      this.openPanelIndex = result;
    });
    this.adhocScreenService.updatedInlinePanelTabChange.subscribe(result => {
      this.selectedInlineTab = result.tabOrder;
    });
    this.adhocScreenService.updatedSidePanelTabChange.subscribe(result => {
      this.selectedSideTab = result.tabOrder;
    });
    this.initEditSearchForm();
  }


  initEditSearchForm() {
    this.editResultFieldsForm = this.formBuilder.group({
      label: new FormControl(this.resultFields.label, Validators.required),
      sorting: new FormControl(this.resultFields.sorting, Validators.required),
      outputFunction: new FormControl(this.resultFields.outputFunction),
      isMaskField: new FormControl(this.resultFields.isMaskField),
      maskType: new FormControl(this.resultFields.maskDetail.maskType),
      maskLength: new FormControl(this.resultFields.maskDetail.maskLength),
      isEnableFilter: new FormControl(this.resultFields.isEnableFilter),
      isHidden: new FormControl(this.resultFields.isHidden),
      encrypted: new FormControl(this.resultFields.encrypted),
      todecrypt: new FormControl(this.resultFields.todecrypt)
    });
  }

  update() {
    const columnId = this.resultFields.columnId;
    const tableId = this.resultFields.tableId;
    const label = this.resultFields.label;
    const tempBoolean = this.checkDuplicateResultFields(this.editResultFieldsForm.get('label').value, tableId);
    if (tempBoolean) {
      this.resultFields.label = this.editResultFieldsForm.get('label').value;
    }
    this.resultFields.sorting = this.editResultFieldsForm.get('sorting').value;
    this.resultFields.outputFunction = this.editResultFieldsForm.get('outputFunction').value;
    this.resultFields.isHidden = this.editResultFieldsForm.get('isHidden').value;
    this.resultFields.isEnableFilter = this.editResultFieldsForm.get('isEnableFilter').value;
    this.resultFields.encrypted = this.editResultFieldsForm.get('encrypted').value;
    this.resultFields.todecrypt = this.editResultFieldsForm.get('todecrypt').value;
    this.resultFields.isMaskField = this.editResultFieldsForm.get('isMaskField').value;
    this.resultFields.maskDetail.maskType = this.editResultFieldsForm.get('maskType').value;
    this.resultFields.maskDetail.maskLength = this.editResultFieldsForm.get('maskLength').value;
    if (this.openedPanelIndex === 0) {
      const index = this.searchResult.mainPanel.findIndex(a => a.columnId === columnId &&
        a.tableId === tableId && a.label === label);
      if (index !== -1) {
        this.searchResult.mainPanel.splice(index, 1, this.resultFields);
      }
    } else if (this.openedPanelIndex === 1) {
      const index = this.searchResult.inLinePanel.tabs[this.selectedInlineTab].
        resultFields.findIndex(a => a.columnId === columnId && a.tableId === tableId && a.label === label);
      if (index !== -1) {
        this.searchResult.inLinePanel.tabs[this.selectedInlineTab].resultFields.splice(index, 1, this.resultFields);
      }

    } else if (this.openedPanelIndex === 2) {
      const index = this.searchResult.sidePanel.tabs[this.selectedSideTab].
        resultFields.findIndex(a => a.columnId === columnId && a.tableId === tableId && a.label === label);
      if (index !== -1) {
        this.searchResult.sidePanel.tabs[this.selectedSideTab].resultFields.splice(index, 1, this.resultFields);
      }
    }
    this.adhocScreenService.updateSearchResult(this.searchResult);
    this.cancel();
  }

  checkDuplicateResultFields(label, tableId) {
    let temp = true;
    for (const item of this.searchResult.mainPanel) {
      if ((item.label.replace(/ /g, '').toLocaleLowerCase() === label.replace(/ /g, '').toLocaleLowerCase()) &&
        (tableId === item.tableId)) {
        temp = false;
        break;
      }
    }
    for (const inlineTab of this.searchResult.inLinePanel.tabs) {
      for (const item of inlineTab.resultFields) {
        if ((item.label.replace(/ /g, '').toLocaleLowerCase() === label.replace(/ /g, '').toLocaleLowerCase()) &&
          (tableId === item.tableId)) {
          temp = false;
          break;
        }
      }
    }
    for (const sideTab of this.searchResult.sidePanel.tabs) {
      for (const item of sideTab.resultFields) {
        if ((item.label.replace(/ /g, '').toLocaleLowerCase() === label.replace(/ /g, '').toLocaleLowerCase()) &&
          (tableId === item.tableId)) {
          temp = false;
          break;
        }
      }
    }
    return temp;
  }
  getInfo() {
    this.outputFunctionInfo = this.outputFunctionsList.find(a => a.functionName.replace(/ /g, '').toLocaleLowerCase() ===
      this.editResultFieldsForm.get('outputFunction').value.replace(/ /g, '').toLocaleLowerCase());
    if (this.outputFunctionInfo !== undefined) {
      document.getElementById('openFunctionInfoModel').click();
    }
  }

  cancel() {
    this.showPanelSearchColumnEvent.emit(false);
  }
}
