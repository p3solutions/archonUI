import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ert-table',
  templateUrl: './ert-table.component.html',
  styleUrls: ['./ert-table.component.css']
})
export class ErtTableComponent implements OnInit {
  myForm: FormGroup;
  showSaveExtractionPage = false;
  constructor(private _fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      addEditColumn: this._fb.array([
        this.initColumn(),
      ])
    });
  }

  initColumn() {
    return this._fb.group({
      prefix: [''], suffix: [''], column: ['']
    });
  }

  addColumns(i: number) {
    const control = <FormArray>this.myForm.controls['addEditColumn'];
    control.push(this.initColumn());
    control.removeAt(i);
  }

  gotoJobConfiguration() {
    this.router.navigate(['workspace/ert/ert-jobs-config']);
  }

  gotoSaveJobExtraction() {
    this.router.navigate(['workspace/ert/ert-extract-ingest']);
  }

  filterOrderConfig(event) {
    const children = document.querySelector('#nav-tab').children;
    const childrenArray = Array.from(children);
    childrenArray.forEach(a => a.classList.remove('active-tab'));
    event.target.classList.add('active-tab');
  }
}

