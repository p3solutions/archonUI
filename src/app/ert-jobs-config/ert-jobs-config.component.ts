import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErtJobParams, IngestionDataConfig } from '../ert-landing-page/ert';
import { ErtService } from '../ert-landing-page/ert.service';
import { isNgTemplate } from '@angular/compiler';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

@Component({
  selector: 'app-ert-jobs-config',
  templateUrl: './ert-jobs-config.component.html',
  styleUrls: ['./ert-jobs-config.component.css']
})
export class ErtJobsConfigComponent implements OnInit {
  ertJobParams: ErtJobParams = new ErtJobParams();
  workspaceName = '';
  mmrVersion = '';
  ertJobTypes = [{
    'ertJobType': 'Table', 'description': 'Choose option for table Extraction',
    'ertJobImage': 'table.png', 'enableJobSelection': true
  },
  {
    'ertJobType': 'Data Record', 'description': 'Choose option for Data Record Extraction',
    'ertJobImage': 'record.png', 'enableJobSelection': true
  },
  {
    'ertJobType': 'SIP', 'description': 'Choose option for SIP Extraction',
    'ertJobImage': 'sip.png', 'enableJobSelection': true
  }];
  constructor(public route: Router, public ertService: ErtService, private workspaceHeaderService: WorkspaceHeaderService) { }
  ngOnInit() {
    this.ertService.ertJobParams = new ErtJobParams();
    this.ertService.selectedList = [];
    this.ertService.schemaResultsTableCount = 0;
    this.ertService.ingestionDataConfig = new IngestionDataConfig();
    this.ertService.joinListMap.clear();
    this.ertService.data = undefined;
    this.ertService.selectedPrimaryTable = '';
    this.ertService.selectedValues = [];
    this.mmrVersion = this.ertService.mmrVersion;
    this.workspaceName = this.workspaceHeaderService.getSelectedWorkspaceName();
    this.ertService.updateJobName('');
    this.ertService.updatejobType('');
  }

  goToExtraction(event, ertJobMode) {
    this.ertJobParams.ertJobMode = ertJobMode;
    this.ertService.updateJobName(this.ertJobParams.ertJobTitle);
    this.ertService.updatejobType(this.ertJobParams.ertJobMode);
    this.ertService.setErtJobParams(this.ertJobParams);
    if (ertJobMode.trim() === 'Data Record') {
      this.route.navigate(['/workspace/ert/ert-datarecord-config']);
    } else if (ertJobMode === 'SIP') {
      this.route.navigate(['/workspace/ert/ert-sip-config']);
    } else {
      this.route.navigate(['/workspace/ert/ert-table'], { queryParams: { from: 'TABLE' } });
    }
  }

  enableJobSelection() {
    if (this.ertJobParams.ertJobTitle.trim().length >= 3) {
      for (let i = 0; i < this.ertJobTypes.length; i++) {
        if (this.ertService.mmrVersion === '') {
          if (i === 0) {
            this.ertJobTypes[i].enableJobSelection = false;
          }
        } else {
          this.ertJobTypes[i].enableJobSelection = false;
        }
      }
    } else {
      for (let i = 0; i < this.ertJobTypes.length; i++) {
        this.ertJobTypes[i].enableJobSelection = true;
      }
    }
  }

  goToJobs() {
    this.route.navigate(['/workspace/ert/ert-jobs']);
  }
}
