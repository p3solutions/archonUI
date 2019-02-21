import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ErtService } from '../ert-landing-page/ert.service';
import { UserinfoService } from '../userinfo.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';

@Component({
  selector: 'app-ert-table-column-config',
  templateUrl: './ert-table-column-config.component.html',
  styleUrls: ['./ert-table-column-config.component.css']
})
export class ErtTableColumnConfigComponent implements OnInit {
  ertJobId = '';
  constructor(public router: Router, private workspaceHeaderService: WorkspaceHeaderService,
    private ertService: ErtService, private activatedRoute: ActivatedRoute, private userinfoService: UserinfoService) { }

  ngOnInit() {
  }
  gotoExtractData() {
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      this.router.navigate(['workspace/ert/ert-extract-ingest', this.ertJobId]);
    } else {
      this.router.navigate(['workspace/ert/ert-extract-ingest']);
    }
  }

  saveERTJob(ertJobStatus: string) {
    this.activatedRoute.params.subscribe((requestParam) => {
      this.ertJobId = requestParam.ertJobId;
    });
    let param: any = {
      'userId': this.userinfoService.getUserId(),
      'workspaceId': this.workspaceHeaderService.getSelectedWorkspaceId(),
      'ertJobStatus': ertJobStatus,
      'schemaResultsTableCount': this.ertService.schemaResultsTableCount.toString(),
      'databaseConfig': {
        'databaseId': this.workspaceHeaderService.getDatabaseID()
      },
      'ertJobParams': this.ertService.ertJobParams,
      'tableDetailsList': this.ertService.selectedList.filter(a => a.isSelected === true),
      'ingestionDataConfig': this.ertService.ingestionDataConfig,
      'extractDataConfigInfo': this.ertService.extractDataConfigInfo
    };

    param = this.modifiedParamForEdit(param);
    console.log(param);
    // this.ertService.saveErtJob(param).subscribe(result => {
    //   if (result.httpStatus !== 200) {
    //     alert('Job has not saved successfully');
    //   }
    //   this.router.navigate(['workspace/ert/ert-jobs']);
    // });
  }

  modifiedParamForEdit(param: any): any {
    if (this.ertJobId !== '' && this.ertJobId !== undefined) {
      param.ertJobId = this.ertJobId;
    }
    return param;
  }
}
