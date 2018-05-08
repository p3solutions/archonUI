import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MetalyzerHeaderService } from '../metalyzer-header/metalyzer-header.service';
@Component({
  selector: 'app-metalyzer-configuration',
  templateUrl: './metalyzer-configuration.component.html',
  styleUrls: ['./metalyzer-configuration.component.css']
})
export class MetalyzerConfigurationComponent implements OnInit {

  constructor(
    private router: Router,
    private metalyzerHeaderService: MetalyzerHeaderService
  ) { }

  ngOnInit() {
    this.metalyzerHeaderService.setPhase('Configuration');
  }
  gotoAnalysis() {
    this.metalyzerHeaderService.setPhase('Analysis');
    this.router.navigate(['workspace/metalyzer/READ/analysis']);
  }
}
