import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { TableListService } from '../table-list/table-list.service';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
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
    if (this.serviceActionType === 'READ') {
      this.router.navigate(['/workspace/metalyzer/READ/analysis']);
    } else if (this.serviceActionType === 'WRITE' || this.serviceActionType === 'ALL') {
      this.tableListService.getTableList().subscribe(result => {
        this.tableList = result;
        if (this.tableList !== undefined) {
          this.metalyzerHeaderService.setPhase('Analysis');
          this.router.navigate(['/workspace/metalyzer/ALL/analysis']);
        } else {
          this.metalyzerHeaderService.setPhase('Configuration');
          this.router.navigate(['/workspace/metalyzer/ALL/configuration']);
        }
      });
    }
  }

}
