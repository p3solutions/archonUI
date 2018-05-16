import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
@Component({
  selector: 'app-metalyzer-configuration',
  templateUrl: './metalyzer-configuration.component.html',
  styleUrls: ['./metalyzer-configuration.component.css']
})
export class MetalyzerConfigurationComponent implements OnInit {

  constructor(
    private router: Router,
    private metalyzerHeaderService: MetalyzerHeaderService,
    private tableListService: TableListService
  ) { }

  ngOnInit() {
    this.metalyzerHeaderService.setPhase('Configuration');
  }
  gotoAnalysis() {
    this.metalyzerHeaderService.setPhase('Analysis');
    if (this.tableListService.getServiceActionType() === 'READ') {
      this.router.navigate(['workspace/metalyzer/READ/analysis']);
    } else if (this.tableListService.getServiceActionType() === 'WRITE') {
      this.router.navigate(['workspace/metalyzer/WRITE/analysis']);
    } else if (this.tableListService.getServiceActionType() === 'ALL') {
      this.router.navigate(['workspace/metalyzer/ALL/analysis']);
    }
  }
}
