import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { TableListService } from '../table-list/table-list.service';
import { archonEnums } from '../enum.config';
import { archonConfig } from '../config';
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
    if (this.tableListService.getServiceActionType() === archonEnums.read) {
      this.router.navigateByUrl(archonConfig.Urls.metalyzerReadRoute);
    } else if (this.tableListService.getServiceActionType() === archonEnums.write) {
      this.router.navigateByUrl(archonConfig.Urls.metalyzerWriteRoute);
    } else if (this.tableListService.getServiceActionType() === archonEnums.all) {
      this.router.navigateByUrl(archonConfig.Urls.metalyzerAllRoute);
    }
  }
}
