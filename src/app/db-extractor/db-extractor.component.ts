import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbExtractorService } from './db-extractor.service';
import { ProgressBarObj } from '../db-extractor';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { ConfiguredDB } from '../workspace-objects';

@Component({
  selector: 'app-db-extractor',
  templateUrl: './db-extractor.component.html',
  styleUrls: ['./db-extractor.component.css']
})
export class DbExtractorComponent implements OnInit {
  progressBarObj: ProgressBarObj;
  zone: any;
  ExtractData = false;
  text: any;
  workspaceName = '';
  configuredDB = new ConfiguredDB();
  constructor(public router: Router, private dbExtractorService: DbExtractorService,
    private workspaceHeaderService: WorkspaceHeaderService) {
    this.dbExtractorService.setProcessDetailsObj(null);
    this.dbExtractorService.setProgressBarObj({ stepTwoProgBarValue: 0, stepThreeProgBarValue: 0 });
  }
  ngOnInit() {
    this.dbExtractorService.updatedProgressBarObj.subscribe((progressBarObj) => {
      this.progressBarObj = progressBarObj;
      // this.router.navigate(['/workspace/db-extractor/db-extractor-process']);
    });
    this.workspaceName = this.workspaceHeaderService.getSelectedWorkspaceName();
    this.dbExtractorService.getDBInfoByID(this.workspaceHeaderService.getDatabaseID()).subscribe(
      (result) => {
        this.configuredDB = result;
      }
    );
  }

  processChange (type) {
    if (type === 'Data') {
      this.ExtractData = false;
    } else {
      this.ExtractData = true;
    }
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
