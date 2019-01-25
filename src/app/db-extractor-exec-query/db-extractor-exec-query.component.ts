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
  enableNextBtn: boolean = false;
  isQueryFileExist: boolean = false;
  ProcessDetailsObj:ProcessDetailsObj=new ProcessDetailsObj();
  queryFileToUpload:FileList=null;
  
  constructor(private router: Router, private dbExtractorService: DbExtractorService) { }


  ngOnInit() {
    this.ProcessDetailsObj=this.dbExtractorService.getProcessDetailsObj();
    this.createExecQueryForm();
    console.log(this.ProcessDetailsObj);
  }

  createExecQueryForm() {
    this.executeQueryForm = new FormGroup({
      query: new FormControl(this.ProcessDetailsObj.ExecuteQueryObj.query, [Validators.required]),
      queryTitle: new FormControl(this.ProcessDetailsObj.ExecuteQueryObj.queryTitle, [Validators.required]),
      isQueryFile: new FormControl(this.ProcessDetailsObj.ExecuteQueryObj.isQueryFile),
      queryFileToUpload: new FormControl('')
    });
    this.isQueryFile.valueChanges.subscribe((checked) => {
      if (checked) {
        this.executeQueryForm.removeControl('query');
        this.executeQueryForm.addControl('queryFileToUpload', new FormControl('', Validators.required));
      } else {
        const validators = [Validators.required];
        this.executeQueryForm.addControl('query', new FormControl('', validators));
        this.executeQueryForm.removeControl('queryFileToUpload');
      }
      this.executeQueryForm.updateValueAndValidity();
    })
  }

  get isQueryFile() {
    return this.executeQueryForm.get('isQueryFile') as FormControl;
  }

  uploadQueryFile(file: FileList) {
    this.isQueryFileExist = file != null ? true : false;
    this.enableNextBtn = this.isQueryFileExist == true ? false : true;
    this.queryFileToUpload=file;
  }

  setUploadQueryFile() {
    this.showFileUpload = !this.showFileUpload;
    this.enableNextBtn = this.showFileUpload == true ? true : false;
  }

  setExecuteQueryObj(){
    this.ProcessDetailsObj.ExecuteQueryObj.queryTitle=this.executeQueryForm.get('queryTitle').value;
    console.log(this.ProcessDetailsObj.ExecuteQueryObj.queryTitle);
    this.ProcessDetailsObj.ExecuteQueryObj.isQueryFile=this.executeQueryForm.get('isQueryFile').value;
    console.log(this.ProcessDetailsObj.ExecuteQueryObj.isQueryFile);
    if(this.executeQueryForm.get('isQueryFile').value)
    this.ProcessDetailsObj.ExecuteQueryObj.queryFileToUpload=this.queryFileToUpload;
    else 
    this.ProcessDetailsObj.ExecuteQueryObj.query=this.executeQueryForm.get('query').value;
  }

  gotoStepTwo() {
    if (this.showFileUpload == false && this.executeQueryForm.valid == true) {
      this.setExecuteQueryObj();
      console.log(this.ProcessDetailsObj);
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);      
    }
    else if (this.executeQueryForm.valid == true && this.isQueryFileExist == true) {
      this.setExecuteQueryObj();
      this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
      console.log(this.ProcessDetailsObj);
      
    }

  }

  
  prevStepOne() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
  }
}
