import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from './db-extractor.service';
import { ProgressBarObj } from '../db-extractor';
@Component({
  selector: 'app-db-extractor',
  templateUrl: './db-extractor.component.html',
  styleUrls: ['./db-extractor.component.css']
})
export class DbExtractorComponent implements OnInit {
  progressBarObj: ProgressBarObj;
  zone: any;
  constructor(public router: Router, private dbExtractorService: DbExtractorService) {
    this.dbExtractorService.setProcessDetailsObj(null);
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
  }
  ngOnInit() {
    this.dbExtractorService.updatedProgressBarObj.subscribe((progressBarObj) => {
      this.progressBarObj = progressBarObj;
      this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
    });
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
