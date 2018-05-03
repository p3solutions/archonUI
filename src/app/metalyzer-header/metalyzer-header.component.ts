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

  private wsName: string;
  private config_type: string;
  private isConfig_Mode: boolean;
  constructor(
    private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService
  ) {
  }

  ngOnInit() {
    this.isConfig_Mode = this.metalyzerHeaderService.getIsConfigMode();
    this.config_type = this.metalyzerHeaderService.getConfigType();
    console.log('ccccJJJJJJJJJJJJJJJJJJJJJj', this.isConfig_Mode, this.config_type);
    this.wsName = this.workspaceHeaderService.getSeletectedWorkspace();
  }
}
