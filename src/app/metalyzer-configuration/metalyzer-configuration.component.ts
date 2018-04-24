import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-metalyzer-configuration',
  templateUrl: './metalyzer-configuration.component.html',
  styleUrls: ['./metalyzer-configuration.component.css']
})
export class MetalyzerConfigurationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  gotoAnalysis() {
    this.router.navigate(['workspace/metalyzer/analysis']);
  }
}
