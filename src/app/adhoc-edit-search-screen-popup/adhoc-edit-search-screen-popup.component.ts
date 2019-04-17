import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchCriteria, checkOption, Option, InputFunctionsInfo, inputFunctionList } from '../adhoc-landing-page/adhoc';
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
  searchTypes: string[] = ['=', 'Starts with', 'Ends with', 'Wild', '<', '< =', '>', '> =', 'Between'
    , 'Between and Inclusion'];
  inputFunctions: string[] = ['', 'Gender Description Common', 'Gender Description to acronym',
    'Date From YYYY-MM-DD to MM-DD-YYYY', 'Date From YYYY-MM-DD to YYYYMMDD', 'Date From YYYYMMDD To MM-DD-YYYY'];
  SearchCriteria: SearchCriteria[] = [];
  SearchCriterion = new SearchCriteria();
  text = '';
  inputFunctionInfo = new InputFunctionsInfo();
  InputFunctionsList = inputFunctionList;
  @Output() showSearchEvent = new EventEmitter<boolean>();
  constructor(private adhocScreenService: AdhocScreenService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.adhocScreenService.updatedSearchCriterion.subscribe(result => {
      this.SearchCriterion = result;
    });
    this.initEditSearchForm();
  }

  initEditSearchForm() {
    this.editSearchCriteriaForm = this.formBuilder.group({
      label: new FormControl(this.SearchCriterion.label, Validators.required),
      fieldType: new FormControl(this.SearchCriterion.fieldType, Validators.required),
      searchType: new FormControl(this.SearchCriterion.searchType, Validators.required),
      inputFunction: new FormControl(this.SearchCriterion.inputFunction),
      option: new FormControl(this.SearchCriterion.optionInfo.optionString),
      isRequired: new FormControl(this.SearchCriterion.isRequired)
    }, {
        validator: checkOption('option')
      });
    this.changeFieldType(this.SearchCriterion.fieldType);
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
      this.SearchCriterion.optionInfo.optionString = this.editSearchCriteriaForm.get('option').value;
      this.createOptions();
      this.SearchCriteria.splice(index, 1, this.SearchCriterion);
      this.adhocScreenService.updateSearchCriteria(this.SearchCriteria);
      this.cancel();
    }
  }

  getInfo() {
    this.inputFunctionInfo = this.InputFunctionsList.find(a => a.functionName === this.editSearchCriteriaForm.get('inputFunction').value);
    if (this.inputFunctionInfo.functionName !== '') {
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
    if (field !== 'TEXT') {
      this.isOptionFieldDisable = false;
      this.editSearchCriteriaForm.controls['option'].setValidators([Validators.required]);
      this.editSearchCriteriaForm.controls['option'].updateValueAndValidity();
    } else {
      this.isOptionFieldDisable = true;
      this.editSearchCriteriaForm.controls['option'].clearValidators();
      this.editSearchCriteriaForm.controls['option'].updateValueAndValidity();
    }
  }

  cancel() {
    this.showSearchEvent.emit(false);
  }

}
