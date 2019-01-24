import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExecuteQueryObj } from '../db-extractor';

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
  constructor(private router: Router, private dbExtractorService: DbExtractorService) { }


  ngOnInit() {
    this.createExecQueryForm();
  }

  createExecQueryForm() {
    this.executeQueryForm = new FormGroup({
      query: new FormControl('', [Validators.required]),
      queryTitle: new FormControl('', [Validators.required]),
      isQueryFile: new FormControl(false),
      queryFileToUpload: new FormControl('', [Validators.required])
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
    console.log(1);
    this.isQueryFileExist = file != null ? true : false;
    console.log(this.isQueryFileExist);
    this.enableNextBtn = this.isQueryFileExist == true ? false : true;
    console.log(this.enableNextBtn);
  }

  setUploadQueryFile() {
    this.showFileUpload = !this.showFileUpload;
    this.enableNextBtn = this.showFileUpload == true ? true : false;
  }



  gotoStepTwo() {
    console.log(123);
    console.log(this.showFileUpload,this.executeQueryForm.valid);
    if (this.showFileUpload == false&&this.executeQueryForm.valid==true) {  
      console.log(11);
        this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
        this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
      
    }
    else if (this.executeQueryForm.valid &&this.isQueryFileExist==true) {
      console.log(1234);
        this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
        this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
    }

  }
  prevStepOne() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 })
    this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
  }
}
