import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from '../db-extractor/db-extractor.service';
@Component({
  selector: 'app-db-extractor-exec-query',
  templateUrl: './db-extractor-exec-query.component.html',
  styleUrls: ['./db-extractor-exec-query.component.css']
})
export class DbExtractorExecQueryComponent implements OnInit {

  constructor(private router: Router,private dbExtractorService: DbExtractorService) { }
  showFileUpload:boolean=false;

  ngOnInit() {
    
  }

  uploadQueryFile(){
    this.showFileUpload=!this.showFileUpload;
  }

  gotoStepTwo() {
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 33.33, stepThreeProgBarValue: 0 })
      this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);  
  }
  prevStepOne(){
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue:0, stepThreeProgBarValue: 0 })
      this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
  }
}
