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
  constructor(
    private router: Router,
    private workspaceHeaderService: WorkspaceHeaderService,
    private metalyzerHeaderService: MetalyzerHeaderService
  ) {
  }

  ngOnInit() {
    this.metalyzerHeaderService.cast
      .subscribe(data => {
        console.log('phase in header component', data);
        this.phase = data;
      });
    this.metalyzerHeaderService.getWorkspaceName().subscribe(result => {
      console.log('wsname in header component', result);
      this.wsName = result;
    });
  }
}
