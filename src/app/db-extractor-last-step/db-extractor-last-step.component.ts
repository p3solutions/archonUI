import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DbExtractorService} from '../db-extractor/db-extractor.service'

@Component({
  selector: 'app-db-extractor-last-step',
  templateUrl: './db-extractor-last-step.component.html',
  styleUrls: ['./db-extractor-last-step.component.css']
})
export class DbExtractorLastStepComponent implements OnInit {

  
  constructor(private router:Router,private dbExtractor:DbExtractorService) { }

  ngOnInit() {
  }
  prevStepTwo(){
    this.dbExtractor.setProgressBarObj({stepTwoProgBarValue:33.33,stepThreeProgBarValue:0})
    this.router.navigate(['/workspace/db-extractor/db-extractor-parameter']);
  }

}
