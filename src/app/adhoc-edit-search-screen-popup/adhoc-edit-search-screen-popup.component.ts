import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdhocScreenService } from '../adhoc-search-criteria/adhoc-screen.service';
import { SearchColumn } from '../adhoc-landing-page/adhoc';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
    'Date From YYYY-MM-DD To MM-DD-YYYY', 'Date From YYYY-MM-DD To YYYYMMDD', 'Date From YYYYMMDD To MM-DD-YYYY'];
  searchColumns: SearchColumn[] = [];
  searchColumn = new SearchColumn();
  constructor(private router: Router, private adhocScreenService: AdhocScreenService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.adhocScreenService.updatedSearchColumn.subscribe(result => {
      this.searchColumn = result;
    });
    this.editSearchForm = this.formBuilder.group({
      label: new FormControl(this.searchColumn.label, Validators.required),
      fieldType: new FormControl(this.searchColumn.fieldType, Validators.required),
      searchType: new FormControl(this.searchColumn.searchType, Validators.required),
      inputFunction: new FormControl(this.searchColumn.inputFunction, Validators.required),
      options: new FormControl(this.searchColumn.option),
      isMandatoryField: new FormControl(this.searchColumn.isMandatoryField)
    });
  }

  update() {
    this.adhocScreenService.updatedSearchColumns.subscribe(result => {
      this.searchColumns = result;
    });
    const index = this.searchColumns.findIndex(a => a.columnName === this.searchColumn.columnName);
    if (index !== -1) {
      const temp = Object.assign({}, this.searchColumn);
      this.searchColumn = this.editSearchForm.value;
      this.searchColumn.columnName = temp.columnName;
      this.searchColumn.tableName = temp.tableName;
      this.searchColumns.splice(index, 1, this.searchColumn);
    }
    this.adhocScreenService.updateSearchColumns(this.searchColumns);
    this.cancel();
  }
  fieldTypeChange(field: string) {
    if (field !== 'TEXT') {
      this.isOptionFieldDisable = false;
      this.editSearchForm.controls['options'].setValidators([Validators.required]);
      this.editSearchForm.controls['options'].updateValueAndValidity();
    } else {
      this.isOptionFieldDisable = true;
      this.editSearchForm.controls['options'].clearValidators();
      this.editSearchForm.controls['options'].updateValueAndValidity();
    }
  }

  cancel() {
    this.router.navigate(['/workspace/adhoc/screen/search/column']);
  }

}
