import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { WorkspaceHeaderService } from '../workspace-header/workspace-header.service';
import { MetalyzerHeaderService } from './metalyzer-header.service';
@Component({
  selector: 'app-metalyzer-header',
  templateUrl: './metalyzer-header.component.html',
  styleUrls: ['./metalyzer-header.component.css']
})
export class MetalyzerHeaderComponent implements OnInit {

  wsName: string;
  phase: string;
  workspaceID: any;
  xml: any;
  databaseID: any;
  exportxmlview: any;
  constructor(
    private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService
  ) {
  }

  ngOnInit() {
    this.metalyzerHeaderService.cast
      .subscribe(data => {
        this.phase = data;
      });
    this.metalyzerHeaderService.getWorkspaceName().subscribe(result => {
      this.wsName = result;
    });
  }
  exportxml() {
    this.xml = 'xml';
    this.workspaceID = this.workspaceHeaderService.getSelectedWorkspaceId();
    this.databaseID = this.workspaceHeaderService.getDatabaseID();
    this.metalyzerHeaderService.getExportxml(this.workspaceID, this.databaseID, this.xml)
      .subscribe(result => {
        this.exportxmlview = result;
        console.log(this.exportxmlview);
      });
  }
}
