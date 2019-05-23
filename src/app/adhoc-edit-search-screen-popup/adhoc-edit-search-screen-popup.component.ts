import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchCriteria, Option, InputFunctionsInfo, SearchTypesByfieldType } from '../adhoc-landing-page/adhoc';
import { inputFunctionList, checkOption, searchTypes } from '../adhoc-landing-page/adhoc-utility-fn';

import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-adhoc-edit-search-screen-popup',
  templateUrl: './adhoc-edit-search-screen-popup.component.html',
  styleUrls: ['./adhoc-edit-search-screen-popup.component.css']
})
export class AdhocEditSearchScreenPopupComponent implements OnInit {
  editSearchCriteriaForm: FormGroup;
  isOptionFieldDisable = true;
  fieldTypes: string[] = ['TEXT', 'COMBO', 'RADIO', 'CHECK'];
  searchTypes: string[] = [];
  inputFunctions: string[] = ['', 'Gender Description Common', 'Gender Description to acronym',
    'Date From YYYY-MM-DD to MM-DD-YYYY', 'Date From YYYY-MM-DD to YYYYMMDD', 'Date From YYYYMMDD To MM-DD-YYYY'];
  SearchCriteria: SearchCriteria[] = [];
  SearchCriterion = new SearchCriteria();
  text = '';
  inputFunctionInfo = new InputFunctionsInfo();
  InputFunctionsList = inputFunctionList;
  isDateRange = false;
  @Output() showSearchEvent = new EventEmitter<boolean>();
  constructor(private adhocScreenService: AdhocScreenService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.adhocScreenService.updatedSearchCriterion.subscribe(result => {
      this.SearchCriterion = result;
    });
    this.initEditSearchForm();
  }

  initEditSearchForm() {
    console.log(this.SearchCriterion.isDateRange);
    this.editSearchCriteriaForm = this.formBuilder.group({
      label: new FormControl(this.SearchCriterion.label, Validators.required),
      fieldType: new FormControl(this.SearchCriterion.fieldType, Validators.required),
      searchType: new FormControl(this.SearchCriterion.searchType, Validators.required),
      inputFunction: new FormControl(this.SearchCriterion.inputFunction),
      option: new FormControl(this.SearchCriterion.optionInfo.optionString),
      isRequired: new FormControl(this.SearchCriterion.isRequired),
      isEncrypted: new FormControl(this.SearchCriterion.isEncrypted),
      isDateRange: new FormControl(this.SearchCriterion.isDateRange)
    }, {
        validator: checkOption('option')
      });
    this.changeFieldType(this.SearchCriterion.fieldType);
    this.setSearchType(this.SearchCriterion.fieldType);
  }

  setSearchType(fieldType) {
    this.searchTypes = searchTypes.filter(a => a.fieldType === fieldType)[0].searchTypes;
  }

  update() {
    this.adhocScreenService.updatedSearchCriteria.subscribe(result => {
      this.SearchCriteria = result;
    });
    const index = this.SearchCriteria.findIndex(a => a.name === this.SearchCriterion.name);
    if (index !== -1) {
      this.SearchCriterion.label = this.editSearchCriteriaForm.get('label').value;
      this.SearchCriterion.fieldType = this.editSearchCriteriaForm.get('fieldType').value;
      this.SearchCriterion.searchType = this.editSearchCriteriaForm.get('searchType').value;
      this.SearchCriterion.inputFunction = this.editSearchCriteriaForm.get('inputFunction').value;
      this.SearchCriterion.isRequired = this.editSearchCriteriaForm.get('isRequired').value;
      this.SearchCriterion.isEncrypted = this.editSearchCriteriaForm.get('isEncrypted').value;
      this.SearchCriterion.optionInfo.optionString = this.editSearchCriteriaForm.get('option').value;
      this.SearchCriterion.isDateRange = this.editSearchCriteriaForm.get('isDateRange').value;
      this.createOptions();
      this.SearchCriteria.splice(index, 1, this.SearchCriterion);
      this.adhocScreenService.updateSearchCriteria(this.SearchCriteria);
      this.cancel();
    }
  }


  getInfo() {
    this.inputFunctionInfo = this.InputFunctionsList.find(a => a.functionName.replace(/ /g, '').toLowerCase() === 
    this.editSearchCriteriaForm.get('inputFunction').value.replace(/ /g, '').toLowerCase());
    if (this.inputFunctionInfo !== undefined) {
      document.getElementById('openFunctionInfoModel').click();
    }
  }

  createOptions() {
    const optionArray: Option[] = [];
    let tempOption;
    const tempOptions = this.editSearchCriteriaForm.get('option').value.split(/[\r\n]+/g);
    for (const option of tempOptions) {
      tempOption = option.split(',');
      if (tempOption[0] !== undefined && tempOption[1] !== undefined) {
        if (tempOption[0].trim() !== '' && tempOption[1].trim() !== '') {
          optionArray.push({ 'label': tempOption[0].trim(), 'value': tempOption[1].trim() });
        }
      }
    }
    this.SearchCriterion.optionInfo.option = optionArray;
  }

  changeFieldType(field: string) {
    if (field === 'DATE') {
      this.fieldTypes.push('DATE');
      this.editSearchCriteriaForm.get('fieldType').disable();
    } else if (this.fieldTypes.filter(a => a === 'DATE').length !== 0) {
      const index = this.fieldTypes.findIndex(a => a === 'DATE');
      this.fieldTypes.splice(index, 1);
      this.editSearchCriteriaForm.get('fieldType').enable();
    } else {
      this.editSearchCriteriaForm.get('fieldType').enable();
    }
    if (field !== 'TEXT' && field !== 'DATE') {
      this.isOptionFieldDisable = false;
      this.editSearchCriteriaForm.controls['option'].setValidators([Validators.required]);
      this.editSearchCriteriaForm.controls['option'].updateValueAndValidity();
    } else {
      this.isOptionFieldDisable = true;
      this.editSearchCriteriaForm.controls['option'].clearValidators();
      this.editSearchCriteriaForm.controls['option'].updateValueAndValidity();
    }
    this.setSearchType(field);
    if (field === 'RADIO' || field === 'CHECK') {
      this.editSearchCriteriaForm.get('searchType').disable();
      this.editSearchCriteriaForm.controls['searchType'].setValue('=');
    } else {
      this.editSearchCriteriaForm.get('searchType').enable();
    }
  }

  cancel() {
    this.showSearchEvent.emit(false);
  }

  setDateField() {
    if (this.editSearchCriteriaForm.get('isDateRange').value) {
      this.editSearchCriteriaForm.controls['searchType'].setValue('Date Range');
      this.editSearchCriteriaForm.get('searchType').disable();
    } else {
      this.editSearchCriteriaForm.controls['searchType'].setValue('=');
      this.editSearchCriteriaForm.get('searchType').enable();
    }
  }

  changeSearchType() {
    if (this.editSearchCriteriaForm.get('fieldType').value === 'DATE') {
      if (this.editSearchCriteriaForm.get('searchType').value.trim() === 'Date Range') {
        this.editSearchCriteriaForm.controls['isDateRange'].setValue(true);
      } else {
        this.editSearchCriteriaForm.controls['isDateRange'].setValue(false);
      }
    }
  }
}
