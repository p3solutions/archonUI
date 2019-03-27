import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
@Component({
  selector: 'app-metalyzer',
  templateUrl: './metalyzer.component.html',
  styleUrls: ['./metalyzer.component.css']
})
export class MetalyzerComponent implements OnInit {

  private serviceActionType: string;
  private tableList: any;
  workspaceID: any;
  startIndex = 1;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableListService: TableListService,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private workspaceHeaderService: WorkspaceHeaderService,
  ) { }

  ngOnInit() {
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.serviceActionType = this.route.snapshot.paramMap.get('serviceActionType');
    if (this.serviceActionType === 'READ') {
      this.router.navigate(['/workspace/metalyzer/READ/analysis']);
    } else if (this.serviceActionType === 'WRITE' || this.serviceActionType === 'ALL') {
      this.tableListService.getTableList(this.workspaceID, this.startIndex).subscribe(result => {
        this.tableList = result;
      });
      if (this.tableList === undefined) {
        this.metalyzerHeaderService.setPhase('Analysis');
        this.router.navigate(['/workspace/metalyzer/READ/analysis']);
      } else {
        this.metalyzerHeaderService.setPhase('Configuration');
        this.router.navigate(['/workspace/metalyzer/WRITE/configuration']);
      }
    }
  }

}
