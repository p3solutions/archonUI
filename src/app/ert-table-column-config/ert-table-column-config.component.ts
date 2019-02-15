import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

@Component({
  selector: 'app-ert-table-column-config',
  templateUrl: './ert-table-column-config.component.html',
  styleUrls: ['./ert-table-column-config.component.css']
})
export class ErtTableColumnConfigComponent implements OnInit {
  constructor(public router: Router, private workspaceHeaderService: WorkspaceHeaderService,
    private ertService: ErtService, private userinfoService: UserinfoService) { }

  ngOnInit() {
  }
  gotoExtractData() {
    this.router.navigate(['workspace/ert/ert-extract-ingest']);
  }

  saveERTJob(ertJobStatus: string) {
    const param: any = {
      'userId': this.userinfoService.getUserId(),
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'ertJobStatus': ertJobStatus,
      'schemaResultsTableCount': '100',
      'databaseConfig': {
        'databaseId': this.workspaceHeaderService.getDatabaseID()
      },
      'ertJobParams': this.ertService.ertJobParams,
      'tableDetailsList': this.ertService.selectedList.filter(a => a.isSelected === true),
      'ingestionDataConfig': this.ertService.ingestionDataConfig,
      'extractDataConfigInfo': {
        'xmlFileSplitSize': this.ertService.xmlSplitSize
      }
    };

    console.log(param);
    this.ertService.saveErtJob(param).subscribe(result => {
      console.log(result);
      this.router.navigate(['workspace/ert/ert-jobs']);
    });
  }
}
