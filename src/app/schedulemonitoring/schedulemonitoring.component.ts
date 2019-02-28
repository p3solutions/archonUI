import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedulemonitoring',
  templateUrl: './schedulemonitoring.component.html',
  styleUrls: ['./schedulemonitoring.component.css']
})
export class SchedulemonitoringComponent implements OnInit {

  loadStatus = true;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoDashboard() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }

}
