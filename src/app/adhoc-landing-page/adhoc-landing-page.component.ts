import { Component, OnInit } from '@angular/core';
import { AdhocService } from './adhoc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adhoc-landing-page',
  templateUrl: './adhoc-landing-page.component.html',
  styleUrls: ['./adhoc-landing-page.component.css']
})
export class AdhocLandingPageComponent implements OnInit {

  constructor(private adhocService: AdhocService, private router: Router) { }

  ngOnInit() {
    // this.adhocService.updatedAdhocHeaderInfo.subscribe(result => {
    //   if (result === null) {
    //     this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
    //   }
    // });
  }
}
