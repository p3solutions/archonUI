import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-metalyzer-header',
  templateUrl: './metalyzer-header.component.html',
  styleUrls: ['./metalyzer-header.component.css']
})
export class MetalyzerHeaderComponent implements OnInit {

  private wsName: string;
  private config_type = 'Configuration';
  private isConfig = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.wsName = this.route.snapshot.paramMap.get('wsname');
    console.log(this.wsName, 'cccccccccccccccccccccccccc');
  }
  updateHeader() {
    this.config_type = 'Analysis';
    this.isConfig = true;
  }
}
