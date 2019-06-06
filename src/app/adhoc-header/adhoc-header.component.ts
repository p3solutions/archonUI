import { Component, OnInit } from '@angular/core';
import { AdhocService } from '../adhoc-landing-page/adhoc.service';
import { AdhocHeaderInfo } from '../adhoc-landing-page/adhoc';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-adhoc-header',
  templateUrl: './adhoc-header.component.html',
  styleUrls: ['./adhoc-header.component.css']
})
export class AdhocHeaderComponent implements OnInit {
  adhocHeaderInfo = new AdhocHeaderInfo();
  constructor(private adhocService: AdhocService, public router: Router) { }

  ngOnInit() {
    this.adhocService.updatedAdhocHeaderInfo.subscribe(result => {
      if (result === null) {
        // this.router.navigate(['workspace/workspace-dashboard/workspace-services']);
      } else {
        this.adhocHeaderInfo = result;
      }
    });
  }

  gotoDashboard() {
    this.router.navigate(['/workspace/workspace-dashboard']);
  }

}
