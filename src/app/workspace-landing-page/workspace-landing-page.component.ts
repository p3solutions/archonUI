import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workspace-landing-page',
  templateUrl: './workspace-landing-page.component.html',
  styleUrls: ['./workspace-landing-page.component.css']
})
export class WorkspaceLandingPageComponent implements OnInit {
  constructor(
    public router: Router
  ) { }
  ngOnInit() {
    this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
  }
}
