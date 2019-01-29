import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProcessDetailsObj } from '../db-extractor';

@Component({
  selector: 'app-db-extractor-exec-query',
  templateUrl: './db-extractor-exec-query.component.html',
  styleUrls: ['./db-extractor-exec-query.component.css']
})
export class DbExtractorExecQueryComponent implements OnInit {
  showFileUpload: boolean = false;
  executeQueryForm: FormGroup;
  enableNextBtn: boolean = true;
  isQueryFileExist: boolean = false;
  ProcessDetailsObj: ProcessDetailsObj = new ProcessDetailsObj();
  queryFileToUpload: File = null;
  queryFileName: string = '';
  constructor(private router: Router, private dbExtractorService: DbExtractorService) { }

  ngOnInit() {
    this.ProcessDetailsObj = this.dbExtractorService.getProcessDetailsObj();
    if(this.ProcessDetailsObj===undefined){
      this.ProcessDetailsObj= new ProcessDetailsObj();
    }
    this.createExecQueryForm();
  }

  createExecQueryForm() {
    this.executeQueryForm = new FormGroup({
      query: new FormControl(this.ProcessDetailsObj.ExecuteQueryObj.query, [Validators.required]),
      queryTitle: new FormControl(this.ProcessDetailsObj.ExecuteQueryObj.queryTitle, [Validators.required]),
      isQueryFile: new FormControl(this.ProcessDetailsObj.ExecuteQueryObj.isQueryFile),
      queryFileToUpload: new FormControl('')
    });

    if (this.ProcessDetailsObj.ExecuteQueryObj.isQueryFile) {
      this.showFileUpload = true
      this.isQueryFileExist = true;
      this.enableNextBtn = this.ProcessDetailsObj.ExecuteQueryObj.queryFileToUpload ? false : true;
      this.queryFileName = this.ProcessDetailsObj.ExecuteQueryObj.queryFileName
    }
    else if (this.ProcessDetailsObj.ExecuteQueryObj.query && this.ProcessDetailsObj.ExecuteQueryObj.queryTitle) {
      this.showFileUpload = false
      this.isQueryFileExist = false;
      this.enableNextBtn = false;
    }
  }

  enableNextBtnFn() {
    if (this.executeQueryForm.value.query && this.executeQueryForm.value.queryTitle && this.executeQueryForm.value.isQueryFile == false) {
      this.enableNextBtn = false;
    } else if (this.executeQueryForm.value.queryTitle && this.isQueryFileExist && this.executeQueryForm.value.isQueryFile == true) {
      this.enableNextBtn = false;
    }
    else {
      this.enableNextBtn = true;
    }
  }

  uploadQueryFile(files: FileList) {
    this.isQueryFileExist = files != null ? true : false;
    if (this.executeQueryForm.value.queryTitle && this.isQueryFileExist && this.executeQueryForm.value.isQueryFile == true) {
      this.enableNextBtn = false;

    }
    this.queryFileToUpload = files.item(0);
    console.log( this.queryFileToUpload);
    this.queryFileName = files.item(0).name;
  }

  setUploadQueryFile() {
    this.showFileUpload = !this.showFileUpload;
    this.enableNextBtn = this.showFileUpload == true ? true : false;
    if (this.showFileUpload) {

    } else {
      if (this.ProcessDetailsObj.ExecuteQueryObj.query && this.ProcessDetailsObj.ExecuteQueryObj.queryTitle) {
        this.showFileUpload = false
        this.isQueryFileExist = false;
        this.enableNextBtn = false;
      }
      else {
        this.enableNextBtn = true;
      }
    }
  }

  setExecuteQueryObj() {
    this.ProcessDetailsObj.ExecuteQueryObj.queryTitle = this.executeQueryForm.get('queryTitle').value;
    this.ProcessDetailsObj.ExecuteQueryObj.isQueryFile = this.executeQueryForm.get('isQueryFile').value;
    if (this.executeQueryForm.get('isQueryFile').value) {
      this.ProcessDetailsObj.ExecuteQueryObj.queryFileToUpload = this.queryFileToUpload?this.queryFileToUpload: this.ProcessDetailsObj.ExecuteQueryObj.queryFileToUpload
      this.ProcessDetailsObj.ExecuteQueryObj.query = '';
      this.ProcessDetailsObj.ExecuteQueryObj.queryFileName = this.queryFileName;
    }
    else {
      this.ProcessDetailsObj.ExecuteQueryObj.query = this.executeQueryForm.get('query').value;
      this.ProcessDetailsObj.ExecuteQueryObj.queryFileToUpload = null;
      this.ProcessDetailsObj.ExecuteQueryObj.queryFileName = '';
    }
  }

  gotoStepTwo() {
    if (this.showFileUpload == false && this.executeQueryForm.get('queryTitle').value != '' &&
      this.executeQueryForm.get('query').value != '') {
      this.setExecuteQueryObj();
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
    }
    else if (this.executeQueryForm.get('queryTitle').value != '' && this.isQueryFileExist == true) {
      this.setExecuteQueryObj();
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
    }
  }

  prevStepOne() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
  }
}
