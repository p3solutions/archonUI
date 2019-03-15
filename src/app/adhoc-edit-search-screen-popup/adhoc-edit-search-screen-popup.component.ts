import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchColumn, OptionInfo, checkOption, Option, InputFunctionsInfo } from '../adhoc-landing-page/adhoc';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-adhoc-edit-search-screen-popup',
  templateUrl: './adhoc-edit-search-screen-popup.component.html',
  styleUrls: ['./adhoc-edit-search-screen-popup.component.css']
})
export class AdhocEditSearchScreenPopupComponent implements OnInit {
  editSearchForm: FormGroup;
  isOptionFieldDisable = true;
  fieldTypes: string[] = ['TEXT', 'COMBO', 'RADIO', 'CHECK'];
  searchTypes: string[] = ['=', 'Starts with', 'Ends with', 'Wild', '&lt', '&lt =', '&gt', '&gt =', 'Between'
    , 'Between and Inclusion'];
  inputFunctions: string[] = ['Gender Description Common', 'Gender Description to acronym',
    'Date From YYYY-MM-DD to MM-DD-YYYY', 'Date From YYYY-MM-DD to YYYYMMDD', 'Date From YYYYMMDD To MM-DD-YYYY'];
  searchColumns: SearchColumn[] = [];
  searchColumn = new SearchColumn();
  text = '';
  inputFunctionInfo = new InputFunctionsInfo();
  inputFunctionList: InputFunctionsInfo[] = [{
    'sequenceNo': 0,
    'functionName': 'Gender Description Common', 'functionDesc': 'Converts gender acronym into its description values.'
    , 'text': `declare function local:genderDesc1($field){\n
    if($field = 'M') then 'Male'\n
    else if($field = 'm') then 'Male'\n
    else if($field = 'F') then 'Female'\n
    else if($field = 'f') then 'Female'\n
    else if($field = 'U') then 'Unknown'\n
    else if($field = 'u') then 'Unknown' else 'Unknown'\n
    }`, 'input': ['M', 'm', 'F', 'f', 'U', 'u'], 'output': ['Male', 'Male', 'Female', 'Female', 'Unknown', 'Unknown']
  },
  {
    'sequenceNo': 1,
    'functionName': 'Gender Description to acronym', 'functionDesc': 'Converts gender description to its acronym.'
    , 'text': `declare function local:genderDesc2($field){\n
      if(lower-case($field) = 'male') then 'M'\n
      else if(lower-case($field) = 'female') then 'F'\n
      else 'U'\n
    };`, 'input': ['M', 'm', 'F', 'f', 'U', 'u'], 'output': ['Male', 'Male', 'Female', 'Female', 'Unknown', 'Unknown']
  },
  {
    'sequenceNo': 2,
    'functionName': 'Date From YYYY-MM-DD to MM-DD-YYYY', 'functionDesc': 'Convert Date from yyyy-mm-dd to mm-dd-yyyy'
    , 'text': `declare function local:dateymd2mdy($field){\n
      if($field = '')\n
      then ''\n
      else\n
        concat(substring($field,6),'-',substring($field,1,4))\n
    };`, 'input': ['2018-01-01', '1970-12-31'], 'output': ['01-01-2018', '12-31-1970']
  },
  {
    'sequenceNo': 3,
    'functionName': 'Date From YYYY-MM-DD to YYYYMMDD', 'functionDesc': 'Convert Date from yyyy-mm-dd to yyyymmdd'
    , 'text': `declare function local:dateyyyymmdd($field){\n
      if($field = '')\n
      then ''\n
      else\n
        concat(substring($field,1,4),substring($field,6,2),substring($field,9,2))\n
    };`, 'input': ['2018-01-01', '1970-12-31'], 'output': ['20180101', '19701231']
  },
  {
    'sequenceNo': 4,
    'functionName': 'Date From YYYYMMDD To MM-DD-YYYY', 'functionDesc': 'Convert Date from yyyymmdd to mm-dd-yyyy '
    , 'text': `declare function local:date_mm_dd_yyyy($field){\n
      if($field = '')\n
      then ''\n
      else\n
        concat(substring($field,5,2),'-',substring($field,7,2),'-',substring($field,1,4))\n
    };`, 'input': ['20180101', '19701231'], 'output': ['01-01-2018', '12-31-1970']
  }
  ];
  @Output() showSearchEvent = new EventEmitter<boolean>();
  constructor(private adhocScreenService: AdhocScreenService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.adhocScreenService.updatedSearchColumn.subscribe(result => {
      this.searchColumn = result;
    });
    this.initEditSearchForm();
  }

  initEditSearchForm() {
    this.editSearchForm = this.formBuilder.group({
      label: new FormControl(this.searchColumn.label, Validators.required),
      fieldType: new FormControl(this.searchColumn.fieldType, Validators.required),
      searchType: new FormControl(this.searchColumn.searchType, Validators.required),
      inputFunction: new FormControl(this.searchColumn.inputFunction, Validators.required),
      option: new FormControl(this.searchColumn.optionInfo.optionString),
      isMandatoryField: new FormControl(this.searchColumn.isMandatoryField)
    }, {
        validator: checkOption('option')
      });
    this.changeFieldType(this.searchColumn.fieldType);
  }

  update() {
    this.adhocScreenService.updatedSearchColumns.subscribe(result => {
      this.searchColumns = result;
    });
    const index = this.searchColumns.findIndex(a => a.columnName === this.searchColumn.columnName);
    if (index !== -1) {
      this.searchColumn.label = this.editSearchForm.get('label').value;
      this.searchColumn.fieldType = this.editSearchForm.get('fieldType').value;
      this.searchColumn.searchType = this.editSearchForm.get('searchType').value;
      this.searchColumn.inputFunction = this.editSearchForm.get('inputFunction').value;
      this.searchColumn.isMandatoryField = this.editSearchForm.get('isMandatoryField').value;
      this.searchColumn.optionInfo.optionString = this.editSearchForm.get('option').value;
      this.createOptions();
      this.searchColumns.splice(index, 1, this.searchColumn);
      this.adhocScreenService.updateSearchColumns(this.searchColumns);
      this.cancel();
    }
  }

  getInfo() {
    this.inputFunctionInfo = this.inputFunctionList.find(a => a.functionName === this.editSearchForm.get('inputFunction').value);
    document.getElementById('openFunctionInfoModel').click();
  }

  createOptions() {
    const optionArray: Option[] = [];
    let tempOption;
    const tempOptions = this.editSearchForm.get('option').value.split(/[\r\n]+/g);
    for (const option of tempOptions) {
      tempOption = option.split(',');
      if (tempOption[0] !== undefined && tempOption[1] !== undefined) {
        if (tempOption[0].trim() !== '' && tempOption[1].trim() !== '') {
          optionArray.push({ 'label': tempOption[0].trim(), 'value': tempOption[1].trim() });
        }
      }
    }
    this.searchColumn.optionInfo.option = optionArray;
  }

  changeFieldType(field: string) {
    if (field !== 'TEXT') {
      this.isOptionFieldDisable = false;
      this.editSearchForm.controls['option'].setValidators([Validators.required]);
      this.editSearchForm.controls['option'].updateValueAndValidity();
    } else {
      this.isOptionFieldDisable = true;
      this.editSearchForm.controls['option'].clearValidators();
      this.editSearchForm.controls['option'].updateValueAndValidity();
    }
  }

  cancel() {
    this.showSearchEvent.emit(false);
  }

}
