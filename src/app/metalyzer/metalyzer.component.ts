import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
import { archonEnums } from '../enum.config';
import { archonConfig } from '../config';
@Component({
  selector: 'app-metalyzer',
  templateUrl: './metalyzer.component.html',
  styleUrls: ['./metalyzer.component.css']
})
export class MetalyzerComponent implements OnInit {

  private serviceActionType: string;
  private tableList: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tableListService: TableListService,
    private metalyzerHeaderService: MetalyzerHeaderService
  ) { }

  ngOnInit() {
    this.serviceActionType = this.route.snapshot.paramMap.get('serviceActionType');
    if (this.serviceActionType === archonEnums.read) {
      this.router.navigateByUrl(archonConfig.Urls.metalyzerReadRoute);
    } else if (this.serviceActionType === archonEnums.read || this.serviceActionType === archonEnums.all) {
      this.tableListService.getTableList().subscribe(result => {
        this.tableList = result;
      });
      if (this.tableList === undefined) {
        this.metalyzerHeaderService.setPhase('Analysis');
        this.router.navigateByUrl(archonConfig.Urls.metalyzerReadRoute);
      } else {
        this.metalyzerHeaderService.setPhase('Configuration');
        this.router.navigateByUrl(archonConfig.Urls.metalyzerWriteRoute);
      }
    }
  }

}
